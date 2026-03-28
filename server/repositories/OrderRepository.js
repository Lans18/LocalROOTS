// ===================================
// DATABASE REPOSITORY - ORDERS
// ===================================
// File: server/repositories/OrderRepository.js

const { pool } = require('../config/database');

class OrderRepository {
    // Get order by ID
    static async getById(id) {
        const [rows] = await pool.query(`
            SELECT o.*, 
                   sa.street_address as shipping_street,
                   sa.city as shipping_city,
                   sa.state as shipping_state,
                   sa.postal_code as shipping_postal,
                   ba.street_address as billing_street,
                   u.email, u.first_name, u.last_name
            FROM orders o
            LEFT JOIN addresses sa ON o.shipping_address_id = sa.id
            LEFT JOIN addresses ba ON o.billing_address_id = ba.id
            LEFT JOIN users u ON o.user_id = u.id
            WHERE o.id = ?
        `, [id]);

        if (rows.length === 0) return null;

        const order = rows[0];

        // Get order items
        const [items] = await pool.query(`
            SELECT oi.*, p.image_urls
            FROM order_items oi
            LEFT JOIN products p ON oi.product_id = p.id
            WHERE oi.order_id = ?
        `, [id]);

        order.items = items;
        return order;
    }

    // Get orders by user
    static async getByUser(userId, page = 1, limit = 20) {
        const offset = (page - 1) * limit;

        const [orders] = await pool.query(`
            SELECT o.*, COUNT(oi.id) as item_count
            FROM orders o
            LEFT JOIN order_items oi ON o.id = oi.order_id
            WHERE o.user_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
            LIMIT ? OFFSET ?
        `, [userId, limit, offset]);

        const [countResult] = await pool.query(`
            SELECT COUNT(*) as total FROM orders WHERE user_id = ?
        `, [userId]);

        return {
            data: orders,
            total: countResult[0].total,
            page,
            limit,
            pages: Math.ceil(countResult[0].total / limit)
        };
    }

    // Create new order
    static async create(orderData) {
        const [result] = await pool.query(`
            INSERT INTO orders 
            (user_id, order_number, status, subtotal, tax_amount, shipping_cost, 
             discount_amount, total_amount, payment_method, payment_status, 
             shipping_address_id, billing_address_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            orderData.user_id,
            orderData.order_number,
            orderData.status || 'pending',
            orderData.subtotal,
            orderData.tax_amount || 0,
            orderData.shipping_cost || 0,
            orderData.discount_amount || 0,
            orderData.total_amount,
            orderData.payment_method,
            orderData.payment_status || 'pending',
            orderData.shipping_address_id,
            orderData.billing_address_id
        ]);

        return result.insertId;
    }

    // Add items to order
    static async addItems(orderId, items) {
        const query = `
            INSERT INTO order_items 
            (order_id, product_id, vendor_id, product_name, quantity, unit_price, total_price)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        for (const item of items) {
            await pool.query(query, [
                orderId,
                item.product_id,
                item.vendor_id,
                item.product_name,
                item.quantity,
                item.unit_price,
                item.total_price
            ]);
        }

        return true;
    }

    // Update order status
    static async updateStatus(id, status) {
        const [result] = await pool.query(`
            UPDATE orders 
            SET status = ?
            WHERE id = ?
        `, [status, id]);

        return result.affectedRows > 0;
    }

    // Update payment status
    static async updatePaymentStatus(id, paymentStatus) {
        const [result] = await pool.query(`
            UPDATE orders 
            SET payment_status = ?
            WHERE id = ?
        `, [paymentStatus, id]);

        return result.affectedRows > 0;
    }

    // Get order by order number
    static async getByOrderNumber(orderNumber) {
        const [rows] = await pool.query(`
            SELECT * FROM orders WHERE order_number = ?
        `, [orderNumber]);

        return rows[0] || null;
    }

    // Get vendor orders
    static async getVendorOrders(vendorId, page = 1, limit = 20) {
        const offset = (page - 1) * limit;

        const [orders] = await pool.query(`
            SELECT DISTINCT o.*, COUNT(DISTINCT oi.id) as item_count
            FROM orders o
            JOIN order_items oi ON o.id = oi.order_id
            WHERE oi.vendor_id = ?
            GROUP BY o.id
            ORDER BY o.created_at DESC
            LIMIT ? OFFSET ?
        `, [vendorId, limit, offset]);

        return orders;
    }

    // Generate unique order number
    static async generateOrderNumber() {
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        return `ORD-${new Date().getFullYear()}-${timestamp}${random}`;
    }

    // Get order summary stats
    static async getSummaryStats(userId) {
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as total_orders,
                SUM(total_amount) as total_spent,
                AVG(total_amount) as avg_order_value,
                MAX(created_at) as last_order_date
            FROM orders 
            WHERE user_id = ?
        `, [userId]);

        return stats[0];
    }
}

module.exports = OrderRepository;
