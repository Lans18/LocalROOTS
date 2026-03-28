// ===================================
// DATABASE REPOSITORY - PRODUCTS
// ===================================
// File: server/repositories/ProductRepository.js

const { pool } = require('../config/database');

class ProductRepository {
    // Get all active products with pagination
    static async getAll(page = 1, limit = 20, filters = {}) {
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT p.*, 
                   v.business_name as vendor_name, 
                   v.rating as vendor_rating,
                   c.name as category_name
            FROM products p
            JOIN vendors v ON p.vendor_id = v.id
            JOIN categories c ON p.category_id = c.id
            WHERE p.is_active = TRUE AND v.is_active = TRUE
        `;
        
        const params = [];

        // Apply filters
        if (filters.category_id) {
            query += ' AND p.category_id = ?';
            params.push(filters.category_id);
        }

        if (filters.vendor_id) {
            query += ' AND p.vendor_id = ?';
            params.push(filters.vendor_id);
        }

        if (filters.min_price) {
            query += ' AND p.price >= ?';
            params.push(filters.min_price);
        }

        if (filters.max_price) {
            query += ' AND p.price <= ?';
            params.push(filters.max_price);
        }

        if (filters.organic === true) {
            query += ' AND p.is_organic = TRUE';
        }

        if (filters.search) {
            query += ' AND MATCH(p.name, p.description) AGAINST(? IN BOOLEAN MODE)';
            params.push(filters.search);
        }

        // Add sorting
        const validSortFields = ['price', 'rating', 'name', 'created_at'];
        const sortField = validSortFields.includes(filters.sort) ? filters.sort : 'created_at';
        const sortOrder = filters.sortOrder === 'asc' ? 'ASC' : 'DESC';
        query += ` ORDER BY p.${sortField} ${sortOrder}`;

        // Add pagination
        query += ' LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const [products] = await pool.query(query, params);
        
        // Get total count
        let countQuery = `SELECT COUNT(*) as total FROM products p 
                         JOIN vendors v ON p.vendor_id = v.id
                         WHERE p.is_active = TRUE AND v.is_active = TRUE`;
        
        const countParams = [];
        
        if (filters.category_id) {
            countQuery += ' AND p.category_id = ?';
            countParams.push(filters.category_id);
        }
        if (filters.vendor_id) {
            countQuery += ' AND p.vendor_id = ?';
            countParams.push(filters.vendor_id);
        }
        if (filters.min_price) {
            countQuery += ' AND p.price >= ?';
            countParams.push(filters.min_price);
        }
        if (filters.max_price) {
            countQuery += ' AND p.price <= ?';
            countParams.push(filters.max_price);
        }

        const [countResult] = await pool.query(countQuery, countParams);
        
        return {
            data: products,
            total: countResult[0].total,
            page,
            limit,
            pages: Math.ceil(countResult[0].total / limit)
        };
    }

    // Get single product by ID
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT p.*, 
                   v.business_name as vendor_name, 
                   v.rating as vendor_rating,
                   c.name as category_name
            FROM products p
            JOIN vendors v ON p.vendor_id = v.id
            JOIN categories c ON p.category_id = c.id
            WHERE p.id = ? AND p.is_active = TRUE
        `, [id]);

        if (rows.length === 0) return null;

        const product = rows[0];

        // Get reviews
        const [reviews] = await pool.query(`
            SELECT * FROM product_reviews 
            WHERE product_id = ? AND is_approved = TRUE
            ORDER BY created_at DESC
            LIMIT 10
        `, [id]);

        product.reviews = reviews;
        return product;
    }

    // Search products by keyword
    static async search(keyword, limit = 20) {
        const [products] = await pool.query(`
            SELECT p.*, v.business_name as vendor_name
            FROM products p
            JOIN vendors v ON p.vendor_id = v.id
            WHERE MATCH(p.name, p.description) AGAINST(? IN BOOLEAN MODE)
            AND p.is_active = TRUE
            LIMIT ?
        `, [keyword, limit]);

        return products;
    }

    // Get featured products
    static async getFeatured(limit = 8) {
        const [products] = await pool.query(`
            SELECT p.*, v.business_name as vendor_name
            FROM products p
            JOIN vendors v ON p.vendor_id = v.id
            WHERE p.is_featured = TRUE AND p.is_active = TRUE
            ORDER BY p.rating DESC
            LIMIT ?
        `, [limit]);

        return products;
    }

    // Create new product
    static async create(productData) {
        const [result] = await pool.query(`
            INSERT INTO products 
            (vendor_id, category_id, name, slug, description, sku, price, stock_quantity, is_organic, image_urls)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            productData.vendor_id,
            productData.category_id,
            productData.name,
            productData.slug,
            productData.description,
            productData.sku,
            productData.price,
            productData.stock_quantity,
            productData.is_organic,
            JSON.stringify(productData.image_urls || [])
        ]);

        return result.insertId;
    }

    // Update product
    static async update(id, productData) {
        const [result] = await pool.query(`
            UPDATE products 
            SET ? 
            WHERE id = ?
        `, [productData, id]);

        return result.affectedRows > 0;
    }

    // Delete product (soft delete)
    static async delete(id) {
        const [result] = await pool.query(`
            UPDATE products 
            SET is_active = FALSE 
            WHERE id = ?
        `, [id]);

        return result.affectedRows > 0;
    }

    // Get products by category
    static async getByCategory(categoryId, limit = 20) {
        const [products] = await pool.query(`
            SELECT p.*, v.business_name as vendor_name
            FROM products p
            JOIN vendors v ON p.vendor_id = v.id
            WHERE p.category_id = ? AND p.is_active = TRUE
            ORDER BY p.rating DESC
            LIMIT ?
        `, [categoryId, limit]);

        return products;
    }

    // Get products by vendor
    static async getByVendor(vendorId, limit = 50) {
        const [products] = await pool.query(`
            SELECT * FROM products 
            WHERE vendor_id = ? AND is_active = TRUE
            ORDER BY created_at DESC
            LIMIT ?
        `, [vendorId, limit]);

        return products;
    }

    // Update product stock
    static async updateStock(productId, quantityChange) {
        const [result] = await pool.query(`
            UPDATE products 
            SET stock_quantity = stock_quantity + ? 
            WHERE id = ?
        `, [quantityChange, productId]);

        return result.affectedRows > 0;
    }

    // Get low stock products
    static async getLowStock(vendorId, threshold = 10) {
        const [products] = await pool.query(`
            SELECT * FROM products 
            WHERE vendor_id = ? AND stock_quantity <= ? AND is_active = TRUE
            ORDER BY stock_quantity ASC
        `, [vendorId, threshold]);

        return products;
    }
}

module.exports = ProductRepository;
