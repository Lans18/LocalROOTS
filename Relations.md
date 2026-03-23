1. MAIN ENTITIES
1. USER

Stores customer accounts

Attributes:

user_id (PK)
name
email
password
role (customer/vendor/admin)
2. PRODUCT

Stores all products

Attributes:

product_id (PK)
name
price
category
description
image
vendor_id (FK)
3. VENDOR

Stores seller information

Attributes:

vendor_id (PK)
name
contact_info
address
4. ORDER

Stores customer orders

Attributes:

order_id (PK)
user_id (FK)
order_date
total_amount
status
5. ORDER_ITEM

Handles many-to-many relationship between orders and products

Attributes:

order_item_id (PK)
order_id (FK)
product_id (FK)
quantity
subtotal
6. CART (Optional but good for defense)

Attributes:

cart_id (PK)
user_id (FK)
7. CART_ITEM

Attributes:

cart_item_id (PK)
cart_id (FK)
product_id (FK)
quantity
2. RELATIONSHIPS
User → Order = One-to-Many
(One user can have many orders)
Order → Order_Item = One-to-Many
Product → Order_Item = One-to-Many
Vendor → Product = One-to-Many
User → Cart = One-to-One
Cart → Cart_Item = One-to-Many
Product → Cart_Item = One-to-Many
