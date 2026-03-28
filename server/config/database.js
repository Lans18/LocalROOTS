// ===================================
// DATABASE CONNECTION CONFIGURATION
// ===================================
// File: server/config/database.js

const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection pool configuration
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'local_roots_market',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelayMs: 0,
    multipleStatements: false
});

// Test database connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('✅ Database connection successful');
        connection.release();
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
}

// Initialize database (create tables if not exists)
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        console.log('📊 Initializing database...');
        
        // Database is initialized via database.sql and seed-data.sql
        console.log('✅ Database initialization complete');
        
        connection.release();
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        throw error;
    }
}

module.exports = {
    pool,
    testConnection,
    initializeDatabase
};
