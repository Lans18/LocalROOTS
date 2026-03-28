-- ===================================
-- LOCAL ROOTS MARKET - SEED DATA
-- ===================================
-- Sample data for development and testing

-- ===================================
-- CATEGORIES
-- ===================================
INSERT INTO categories (name, slug, description, icon_emoji, display_order) VALUES
('Fresh Produce', 'produce', 'Farm-fresh fruits and vegetables picked at peak ripeness', '🥬', 1),
('Dairy & Eggs', 'dairy', 'Locally sourced dairy products and free-range eggs', '🥛', 2),
('Baked Goods', 'baked', 'Artisan breads, pastries, and treats baked fresh daily', '🥖', 3),
('Handmade Crafts', 'crafts', 'Unique handcrafted items from local artisans', '🎨', 4),
('Organic Pantry', 'pantry', 'Organic grains, sauces, preserves, and more', '🌾', 5),
('Meat & Poultry', 'meat', 'Grass-fed beef, free-range chicken and pork', '🍖', 6),
('Honey & Preserves', 'honey', 'Local honey, jams, and preserves', '🍯', 7);

-- ===================================
-- ADMIN USER
-- ===================================
INSERT INTO users (email, password_hash, first_name, last_name, user_type, email_verified, is_active) VALUES
('admin@localroots.com', '$2b$10$PLACEHOLDER_HASH', 'Admin', 'User', 'admin', TRUE, TRUE);

-- ===================================
-- CUSTOMER USERS
-- ===================================
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type, email_verified, is_active) VALUES
('john.doe@email.com', '$2b$10$PLACEHOLDER_HASH', 'John', 'Doe', '555-0101', 'customer', TRUE, TRUE),
('jane.smith@email.com', '$2b$10$PLACEHOLDER_HASH', 'Jane', 'Smith', '555-0102', 'customer', TRUE, TRUE),
('michael.johnson@email.com', '$2b$10$PLACEHOLDER_HASH', 'Michael', 'Johnson', '555-0103', 'customer', TRUE, TRUE),
('sarah.williams@email.com', '$2b$10$PLACEHOLDER_HASH', 'Sarah', 'Williams', '555-0104', 'customer', TRUE, TRUE),
('emily.brown@email.com', '$2b$10$PLACEHOLDER_HASH', 'Emily', 'Brown', '555-0105', 'customer', TRUE, TRUE);

-- ===================================
-- VENDOR USERS
-- ===================================
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type, email_verified, is_active) VALUES
('owner@greenacres.com', '$2b$10$PLACEHOLDER_HASH', 'Tom', 'Mitchell', '555-1001', 'vendor', TRUE, TRUE),
('contact@artisanbakery.com', '$2b$10$PLACEHOLDER_HASH', 'Lisa', 'Garcia', '555-1002', 'vendor', TRUE, TRUE),
('info@valleyview.com', '$2b$10$PLACEHOLDER_HASH', 'Robert', 'Chen', '555-1003', 'vendor', TRUE, TRUE),
('hello@crafted.com', '$2b$10$PLACEHOLDER_HASH', 'Maria', 'Rodriguez', '555-1004', 'vendor', TRUE, TRUE),
('team@sunrise.com', '$2b$10$PLACEHOLDER_HASH', 'David', 'Anderson', '555-1005', 'vendor', TRUE, TRUE);

-- ===================================
-- VENDOR DETAILS
-- ===================================
INSERT INTO vendors (user_id, business_name, business_type, description, verified, verification_date, rating, total_products, response_time_hours) VALUES
(3, 'Green Acres Farm', 'Farm', 'Family-owned organic farm specializing in seasonal produce', TRUE, NOW(), 4.8, 15, 24),
(4, 'Artisan Bakery Co.', 'Bakery', 'Handcrafted breads and pastries baked fresh daily', TRUE, NOW(), 5.0, 12, 12),
(5, 'Valley View Dairy', 'Dairy', 'Organic dairy products and free-range eggs', TRUE, NOW(), 4.9, 8, 18),
(6, 'Crafted by Hand', 'Craft', 'Handmade soaps, textiles, and home goods', TRUE, NOW(), 4.7, 20, 36),
(7, 'Sunrise Organics', 'Farm/Pantry', 'Organic pantry items including honey and preserves', TRUE, NOW(), 4.9, 18, 24);

-- ===================================
-- CUSTOMER ADDRESSES
-- ===================================
INSERT INTO addresses (user_id, type, street_address, city, state, postal_code, country, is_default) VALUES
(1, 'both', '123 Main St', 'Portland', 'OR', '97201', 'United States', TRUE),
(1, 'shipping', '456 Oak Ave', 'Portland', 'OR', '97202', 'United States', FALSE),
(2, 'both', '789 Elm St', 'Seattle', 'WA', '98101', 'United States', TRUE),
(3, 'both', '321 Pine Rd', 'Eugene', 'OR', '97401', 'United States', TRUE),
(4, 'both', '654 Maple Dr', 'Portland', 'OR', '97203', 'United States', TRUE),
(5, 'both', '987 Cedar Ln', 'Beaverton', 'OR', '97005', 'United States', TRUE);

-- ===================================
-- PRODUCTS - FRESH PRODUCE
-- ===================================
INSERT INTO products (vendor_id, category_id, name, slug, description, sku, price, stock_quantity, is_organic, rating, image_urls, features, tags) VALUES
(1, 1, 'Organic Mixed Greens', 'organic-mixed-greens', 'Fresh, crisp mixed salad greens harvested this morning', 'PROD001', 8.99, 45, TRUE, 4.8, '["greens.jpg"]', '["organic", "local", "seasonal"]', '["salad", "fresh", "organic"]'),
(1, 1, 'Heritage Tomatoes (2 lbs)', 'heritage-tomatoes', 'Heirloom tomato varieties with complex flavors', 'PROD002', 9.50, 32, TRUE, 4.8, '["tomatoes.jpg"]', '["organic", "local", "seasonal"]', '["tomato", "heirloom", "fresh"]'),
(1, 1, 'Fresh Strawberries (1 lb)', 'fresh-strawberries', 'Sweet, juicy strawberries at peak ripeness', 'PROD003', 6.99, 28, TRUE, 5.0, '["strawberries.jpg"]', '["organic", "local", "seasonal"]', '["fruit", "fresh", "seasonal"]'),
(1, 1, 'Organic Carrots (2 lbs)', 'organic-carrots', 'Sweet, crunchy carrots perfect for any dish', 'PROD004', 4.99, 50, TRUE, 4.7, '["carrots.jpg"]', '["organic", "local"]', '["vegetable", "organic"]');

-- ===================================
-- PRODUCTS - DAIRY & EGGS
-- ===================================
INSERT INTO products (vendor_id, category_id, name, slug, description, sku, price, stock_quantity, is_organic, rating, image_urls, features, tags) VALUES
(3, 2, 'Farm Fresh Eggs (Dozen)', 'farm-fresh-eggs', 'Free-range eggs from happy hens', 'PROD005', 7.25, 40, TRUE, 4.9, '["eggs.jpg"]', '["organic", "local"]', '["dairy", "eggs"]'),
(3, 2, 'Organic Whole Milk (Half Gallon)', 'organic-whole-milk', 'Fresh, creamy organic whole milk', 'PROD006', 8.75, 25, TRUE, 4.7, '["milk.jpg"]', '["organic", "local"]', '["dairy", "milk"]'),
(3, 2, 'Artisan Cheese Block', 'artisan-cheese', 'Handmade cheddar cheese aged to perfection', 'PROD007', 14.99, 18, FALSE, 4.8, '["cheese.jpg"]', '["local", "handmade"]', '["dairy", "cheese"]');

-- ===================================
-- PRODUCTS - BAKED GOODS
-- ===================================
INSERT INTO products (vendor_id, category_id, name, slug, description, sku, price, stock_quantity, is_organic, rating, image_urls, features, tags) VALUES
(2, 3, 'Artisan Sourdough Bread', 'artisan-sourdough', 'Classic sourdough bread with tangy flavor', 'PROD008', 6.50, 35, FALSE, 5.0, '["bread.jpg"]', '["local", "handmade"]', '["bread", "sourdough"]'),
(2, 3, 'Cinnamon Rolls (6 pack)', 'cinnamon-rolls', 'Warm, fluffy cinnamon rolls with cream cheese frosting', 'PROD009', 11.00, 22, FALSE, 5.0, '["cinnamon.jpg"]', '["local", "handmade"]', '["pastry", "cinnamon"]'),
(2, 3, 'Blueberry Muffins (4 pack)', 'blueberry-muffins', 'Fresh blueberry muffins baked daily', 'PROD010', 8.50, 28, FALSE, 4.8, '["muffins.jpg"]', '["local", "handmade"]', '["muffins", "blueberry"]');

-- ===================================
-- PRODUCTS - HANDMADE CRAFTS
-- ===================================
INSERT INTO products (vendor_id, category_id, name, slug, description, sku, price, stock_quantity, is_organic, rating, image_urls, features, tags) VALUES
(4, 4, 'Handmade Lavender Soap', 'lavender-soap', 'Natural soap with essential oils and botanical ingredients', 'PROD011', 12.00, 60, TRUE, 4.7, '["soap.jpg"]', '["organic", "handmade", "local"]', '["soap", "lavender"]'),
(4, 4, 'Handwoven Basket', 'handwoven-basket', 'Beautiful basket woven by hand with sustainable materials', 'PROD012', 45.00, 12, FALSE, 4.9, '["basket.jpg"]', '["handmade", "local"]', '["basket", "craft"]');

-- ===================================
-- PRODUCTS - ORGANIC PANTRY
-- ===================================
INSERT INTO products (vendor_id, category_id, name, slug, description, sku, price, stock_quantity, is_organic, rating, image_urls, features, tags) VALUES
(5, 5, 'Raw Honey (16 oz)', 'raw-honey', 'Pure, unfiltered local honey directly from our hives', 'PROD013', 14.99, 40, TRUE, 4.9, '["honey.jpg"]', '["organic", "local"]', '["honey", "raw"]'),
(5, 5, 'Organic Quinoa (2 lbs)', 'organic-quinoa', 'Nutritious organic quinoa, perfect for healthy meals', 'PROD014', 16.50, 25, TRUE, 4.6, '["quinoa.jpg"]', '["organic"]', '["grain", "organic"]'),
(5, 5, 'Homemade Strawberry Jam', 'strawberry-jam', 'Fresh strawberry jam with no added preservatives', 'PROD015', 9.99, 35, TRUE, 4.8, '["jam.jpg"]', '["organic", "local", "handmade"]', '["jam", "preserve"]');

-- ===================================
-- SHOPPING CARTS
-- ===================================
INSERT INTO shopping_carts (user_id) VALUES
(1), (2), (3), (4), (5);

-- ===================================
-- CART ITEMS
-- ===================================
INSERT INTO cart_items (cart_id, product_id, quantity) VALUES
(1, 1, 2),
(1, 5, 1),
(2, 8, 1),
(2, 13, 2),
(3, 3, 3);

-- ===================================
-- SAMPLE ORDERS
-- ===================================
INSERT INTO orders (user_id, order_number, status, subtotal, tax_amount, shipping_cost, total_amount, payment_method, payment_status, shipping_address_id, billing_address_id) VALUES
(1, 'ORD-2026-001', 'delivered', 35.99, 2.88, 5.00, 43.87, 'credit_card', 'completed', 1, 1),
(2, 'ORD-2026-002', 'shipped', 29.50, 2.36, 5.00, 36.86, 'credit_card', 'completed', 3, 3),
(3, 'ORD-2026-003', 'confirmed', 45.00, 3.60, 7.00, 55.60, 'paypal', 'completed', 4, 4),
(1, 'ORD-2026-004', 'pending', 22.98, 1.84, 0.00, 24.82, 'credit_card', 'pending', 1, 1),
(4, 'ORD-2026-005', 'processing', 58.49, 4.68, 5.00, 68.17, 'credit_card', 'completed', 5, 5);

-- ===================================
-- ORDER ITEMS
-- ===================================
INSERT INTO order_items (order_id, product_id, vendor_id, product_name, quantity, unit_price, total_price) VALUES
(1, 1, 1, 'Organic Mixed Greens', 1, 8.99, 8.99),
(1, 5, 3, 'Farm Fresh Eggs (Dozen)', 3, 7.25, 21.75),
(1, 8, 2, 'Artisan Sourdough Bread', 1, 6.50, 6.50),
(2, 3, 1, 'Fresh Strawberries (1 lb)', 2, 6.99, 13.98),
(2, 13, 5, 'Raw Honey (16 oz)', 1, 14.99, 14.99),
(3, 12, 4, 'Handwoven Basket', 1, 45.00, 45.00),
(4, 15, 5, 'Homemade Strawberry Jam', 2, 9.99, 19.98),
(5, 9, 2, 'Cinnamon Rolls (6 pack)', 1, 11.00, 11.00),
(5, 6, 3, 'Organic Whole Milk (Half Gallon)', 2, 8.75, 17.50),
(5, 11, 4, 'Handmade Lavender Soap', 3, 12.00, 36.00);

-- ===================================
-- PRODUCT REVIEWS
-- ===================================
INSERT INTO product_reviews (product_id, user_id, rating, title, review_text, is_verified_purchase, is_approved) VALUES
(1, 2, 5, 'Fresh and Delicious!', 'The greens arrive so fresh and crisp. Perfect quality!', TRUE, TRUE),
(1, 3, 5, 'Best I\'ve Had', 'Better than any store-bought greens. Highly recommend!', TRUE, TRUE),
(5, 1, 5, 'Farm Fresh Quality', 'The eggs are so much better than store alternatives. Vibrant yolks!', TRUE, TRUE),
(8, 2, 5, 'Artisan Quality', 'This bread is absolutely delicious. Worth every penny.', TRUE, TRUE),
(13, 4, 5, 'Pure and Perfect', 'The best honey I\'ve ever tasted. Support local!', TRUE, TRUE),
(3, 5, 4, 'Great Strawberries', 'Very fresh and sweet. Arrived in perfect condition.', TRUE, TRUE),
(12, 3, 5, 'Beautiful Craftsmanship', 'Amazing handmade basket. Great quality and design.', TRUE, TRUE);

-- ===================================
-- NEWSLETTER SUBSCRIBERS
-- ===================================
INSERT INTO newsletter_subscribers (email, first_name, is_active) VALUES
('subscriber1@email.com', 'Alice', TRUE),
('subscriber2@email.com', 'Bob', TRUE),
('john.doe@email.com', 'John', TRUE),
('jane.smith@email.com', 'Jane', TRUE),
('newsletter@domain.com', 'News', TRUE);

-- ===================================
-- COUPONS
-- ===================================
INSERT INTO coupons (code, description, discount_type, discount_value, min_purchase_amount, max_redemptions, valid_from, valid_until, is_active) VALUES
('WELCOME10', 'Welcome discount for new customers', 'percentage', 10.00, 25.00, 100, NOW(), DATE_ADD(NOW(), INTERVAL 90 DAY), TRUE),
('SUMMER20', 'Summer promotion', 'percentage', 20.00, 50.00, 250, NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), TRUE),
('ORGANIC15', 'Organic products discount', 'percentage', 15.00, 35.00, 150, NOW(), DATE_ADD(NOW(), INTERVAL 60 DAY), TRUE),
('LOCALOVE5', 'Local love $5 off', 'fixed_amount', 5.00, 30.00, 500, NOW(), DATE_ADD(NOW(), INTERVAL 120 DAY), TRUE);

-- ===================================
-- WISHLIST
-- ===================================
INSERT INTO wishlists (user_id, product_id) VALUES
(1, 12),
(1, 13),
(2, 9),
(3, 14),
(4, 11),
(5, 8);

-- ===================================
-- VENDOR APPLICATIONS (samples)
-- ===================================
INSERT INTO vendor_applications (first_name, last_name, email, phone, business_name, business_type, description, experience_years, status) VALUES
('Thomas', 'Patterson', 'thomas@newvendor.com', '555-2001', 'Fresh Picked Berries', 'Farm', 'Organic berry farm specializing in sustainable practices', 8, 'under_review'),
('Jennifer', 'Martinez', 'jen@potterystudio.com', '555-2002', 'Potter\s Studio', 'Craft', 'Handmade ceramic and pottery goods', 12, 'under_review'),
('Kevin', 'Wilson', 'kevin@orchard.com', '555-2003', 'Old Town Orchard', 'Farm', 'Apple orchard with seasonal products', 15, 'under_review');

-- ===================================
-- CONTACT SUBMISSIONS (samples)
-- ===================================
INSERT INTO contact_submissions (name, email, subject, message, category, status) VALUES
('Robert Taylor', 'robert@email.com', 'Question about product availability', 'I\'m interested in bulk ordering organic produce. Can you provide details?', 'sales', 'new'),
('Patricia Lee', 'patricia@email.com', 'Vendor partnership inquiry', 'I\'d like to list my baked goods on your platform.', 'vendor', 'in_progress'),
('James Brown', 'james@email.com', 'Technical support - login issue', 'I can\'t log into my account. Please help!', 'support', 'new');

-- ===================================
-- ANALYTICS SAMPLE DATA
-- ===================================
INSERT INTO analytics (user_id, event_type, product_id, category_id, action_value, session_id) VALUES
(1, 'product_view', 1, 1, NULL, 'sess_001'),
(1, 'add_to_cart', 1, 1, 8.99, 'sess_001'),
(2, 'product_view', 5, 2, NULL, 'sess_002'),
(2, 'checkout_complete', NULL, NULL, 36.86, 'sess_002'),
(3, 'search', NULL, NULL, NULL, 'sess_003'),
(NULL, 'homepage_view', NULL, NULL, NULL, 'sess_004');

-- ===================================
-- COMMIT CHANGES
-- ===================================
COMMIT;
