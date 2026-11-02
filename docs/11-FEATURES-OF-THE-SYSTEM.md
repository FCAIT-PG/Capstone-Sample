# 11. Features of the System

## 11.1 Customer Features

| Feature | Description |
|---|---|
| Registration and login | Create an account and log in securely; sessions stay active through automatic token refresh |
| Browse and search | View products from all sellers, filter by category, and search by keyword |
| Product details | See price, stock availability, seller name, and product attributes |
| Shopping cart | Add products from different sellers, change quantities, and remove items |
| Unified checkout | Place one order and make one payment for items from multiple sellers |
| Online payment | Pay through the payment gateway; the order is confirmed automatically once payment is verified |
| Stock-aware ordering | Clear message when the requested quantity is not available |
| Order tracking | See every order and the fulfilment status of each individual item |

## 11.2 Seller Features

| Feature | Description |
|---|---|
| Seller registration | Register a store; the store becomes active once an administrator approves it |
| Product management | Add, edit, and remove only their own products, including stock and price |
| Category suggestion | Get the top three suggested categories, with confidence, while creating a listing |
| Flexible product attributes | Record category-specific details such as size or colour without changing the database structure |
| Order fulfilment | See only the items sold from their own products and mark them shipped or delivered |
| Seller reports | View sales and inventory reports for their own store |

## 11.3 Administrator Features

| Feature | Description |
|---|---|
| Seller approval | Review pending sellers and approve or reject them |
| Platform-wide order view | View all orders across all sellers and customers |
| Dashboard | See orders, revenue, pending approvals, and low-stock products at a glance |
| MIS reports | Generate sales, seller performance, inventory, order status, and payment reconciliation reports (section 17) |

## 11.4 Platform Features

| Feature | Description |
|---|---|
| Multi-seller orders | One checkout can contain items from several sellers; each seller updates only their own items |
| Overselling prevention | Stock is reserved inside a database transaction when an order is placed |
| Automatic stock release | Orders not paid within 15 minutes expire and their stock is returned |
| Price protection | The price paid is stored with the order item, so later price changes do not alter past orders |
| Role-based access | Every screen and API endpoint is limited to the roles allowed to use it |
| Consistent error handling | Every API error uses the same structure with a code and a readable message |
| Responsive interface | The web interface adapts to desktop and mobile screen sizes |

## 11.5 Security Features

### 11.5.1 Authentication & Authorization

- Passwords hashed with `bcrypt` (cost factor 12), never stored or logged in plaintext.
- JWT access tokens expire in 15 minutes; refresh tokens (7 days) are stored httpOnly + `Secure` cookies rather than `localStorage`, to reduce XSS exposure.
- Role-based access control enforced at the middleware level (`customer` / `seller` / `admin`), and resource-ownership checks (e.g. a seller can only edit their own products) are enforced in the controller layer, not assumed from the role alone.

### 11.5.2 Input Validation

- All request bodies validated with `zod` schemas before reaching controller logic; invalid input returns `400` with a field-level error, never a raw stack trace.
- Product `attributes` (the flexible `JSONB` field) is validated against a size limit and key whitelist per category to prevent arbitrary payload injection through that field.

### 11.5.3 Data Protection

- All database queries use parameterized statements (placeholders such as `$1` in the `pg` driver) — no raw string-concatenated SQL, so standard SQL injection vectors are closed.
- User-submitted text fields are sanitized before storage and escaped on render to prevent stored XSS.

### 11.5.4 Secrets Handling

- `.env` file (database URL, JWT signing secret, Razorpay keys) is git-ignored; `.env.example` in the repo lists required variable names without values.
- Razorpay webhook requests are verified against the webhook signature header before being trusted — payment status is never updated from an unverified request or a client-side callback.

### 11.5.5 AI/ML Component

- The category-suggestion endpoint is seller-only and validates input (title required, text capped at 1,000 characters) before it reaches the model.
- The training data contains only public product text, with no personal or sensitive data, and seller input is not stored for retraining.
- No external AI API or API key is involved; the model runs in-process from a committed JSON file, so there is no prompt-injection surface and no third-party data sharing.

### 11.5.6 Known security gaps

- No rate limiting is currently implemented on auth endpoints (login/register), which would be a priority addition before any real deployment — see section 18.4 ([18-CONCLUSION-AND-FUTURE-SCOPE.md](18-CONCLUSION-AND-FUTURE-SCOPE.md)).
- CSRF protection is not separately implemented; mitigated partially by the API being token-based (not cookie-session-based) for state-changing requests, aside from the refresh-token cookie.
