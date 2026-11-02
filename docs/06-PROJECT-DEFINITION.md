# 6. Project Definition

## 6.1 Problem Statement

Small and independent sellers often lack the resources to build their own e-commerce storefronts. Existing marketplace platforms charge high commissions or limit customisation, and customers who want products from several small sellers must visit and pay on each seller's site separately.

ShopSphere addresses this by providing a shared marketplace where multiple sellers can list and manage their own products, while customers enjoy a single, unified checkout across all sellers.

## 6.2 Objectives

1. Provide secure registration and login for customers, sellers, and administrators, with access limited to what each role needs.
2. Allow approved sellers to create, update, and remove their own product listings.
3. Allow customers to browse, search, and filter products from all sellers.
4. Support a single cart and checkout that can contain items from several sellers, with payment through an online payment gateway.
5. Prevent overselling by reserving stock when an order is placed and releasing it if payment is not completed.
6. Let sellers update the fulfilment status of only their own items, and let customers track every item.
7. Give administrators control over seller approval and visibility of platform-wide orders and management (MIS) reports.
8. Reduce seller effort by suggesting a product category from the listing text using a machine learning model.

## 6.3 Scope

**In scope**

- Three user roles: Customer, Seller, Admin
- Product catalogue with category and keyword search
- Cart, checkout, and orders that span multiple sellers
- Payment processing using a test-mode payment gateway
- Seller-side order fulfilment and inventory management
- Admin-side seller approval and order oversight
- Management (MIS) reports for administrators and sellers
- Category suggestion for sellers using a machine learning model

**Out of scope**

- Product reviews and ratings
- Coupon and discount engine
- Shipping charges and tax calculation (shipping is free and prices include all taxes)
- Product recommendation system
- Live courier or logistics integration (sellers update fulfilment status manually)
- Native mobile application (the system is a web application)

## 6.4 Assumptions and Constraints

- Users have an internet connection and a modern web browser.
- Payments run in the payment gateway's test mode; no real money is processed.
- The platform supports a single currency (Indian Rupees) and the English language.
- The system is developed by a small team within one semester, which is why the scope above is deliberately limited.

## 6.5 Deliverables

- The working application: web frontend, backend API, and database
- The trained category-suggestion model and its training code
- A GitHub repository containing all source code and this documentation
- A deployed demonstration version of the application
