// ===================================
// DATABASE REPOSITORY - USERS
// ===================================
// File: server/repositories/UserRepository.js

const { pool } = require('../config/database');

class UserRepository {
    // Get user by ID
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT id, email, first_name, last_name, phone, profile_image_url, 
                   bio, user_type, is_active, email_verified, created_at
            FROM users 
            WHERE id = ?
        `, [id]);

        return rows[0] || null;
    }

    // Get user by email
    static async getByEmail(email) {
        const [rows] = await pool.query(`
            SELECT * FROM users 
            WHERE email = ?
        `, [email]);

        return rows[0] || null;
    }

    // Create new user
    static async create(userData) {
        const [result] = await pool.query(`
            INSERT INTO users 
            (email, password_hash, first_name, last_name, user_type, email_verified)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [
            userData.email,
            userData.password_hash,
            userData.first_name,
            userData.last_name,
            userData.user_type || 'customer',
            userData.email_verified || false
        ]);

        return result.insertId;
    }

    // Update user
    static async update(id, userData) {
        const [result] = await pool.query(`
            UPDATE users 
            SET ? 
            WHERE id = ?
        `, [userData, id]);

        return result.affectedRows > 0;
    }

    // Delete user (soft delete)
    static async delete(id) {
        const [result] = await pool.query(`
            UPDATE users 
            SET is_active = FALSE 
            WHERE id = ?
        `, [id]);

        return result.affectedRows > 0;
    }

    // Get user with addresses
    static async getUserWithAddresses(id) {
        const user = await this.getById(id);
        if (!user) return null;

        const [addresses] = await pool.query(`
            SELECT * FROM addresses 
            WHERE user_id = ? 
            ORDER BY is_default DESC
        `, [id]);

        user.addresses = addresses;
        return user;
    }

    // Verify email
    static async verifyEmail(userId) {
        const [result] = await pool.query(`
            UPDATE users 
            SET email_verified = TRUE 
            WHERE id = ?
        `, [userId]);

        return result.affectedRows > 0;
    }

    // Check if email exists
    static async emailExists(email) {
        const [rows] = await pool.query(`
            SELECT id FROM users WHERE email = ?
        `, [email]);

        return rows.length > 0;
    }

    // Get all customers
    static async getCustomers(page = 1, limit = 20) {
        const offset = (page - 1) * limit;

        const [users] = await pool.query(`
            SELECT id, email, first_name, last_name, created_at, is_active
            FROM users 
            WHERE user_type = 'customer'
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        const [countResult] = await pool.query(`
            SELECT COUNT(*) as total FROM users WHERE user_type = 'customer'
        `);

        return {
            data: users,
            total: countResult[0].total,
            page,
            limit,
            pages: Math.ceil(countResult[0].total / limit)
        };
    }

    // Get user order history
    static async getOrderHistory(userId, limit = 20) {
        const [orders] = await pool.query(`
            SELECT o.*, COUNT(oi.id) as item_count
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
            LIMIT ?
        `, [userId, limit]);

        return orders;
    }

    // Get user reviews
    static async getUserReviews(userId) {
        const [reviews] = await pool.query(`
            SELECT pr.*, p.name as product_name, p.id as product_id
            FROM product_reviews pr
            JOIN products p ON pr.product_id = p.id
            WHERE pr.user_id = ?
            ORDER BY pr.created_at DESC
        `, [userId]);

        return reviews;
    }
}

module.exports = UserRepository;
