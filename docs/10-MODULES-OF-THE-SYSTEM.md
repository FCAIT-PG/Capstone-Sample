# 10. Modules of the System

## 10.1 Module Overview

ShopSphere is divided into eight modules. Each module groups related functions, API endpoints, and database tables.

| # | Module | Main users | Main tables |
|---|---|---|---|
| 10.3 | Authentication and Authorization | All | `users` |
| 10.4 | Seller Management | Seller, Admin | `sellers` |
| 10.5 | Product Management | Guest, Customer, Seller | `products` |
| 10.6 | Cart | Customer | `cart_items` |
| 10.7 | Order Management | Customer, Seller, Admin | `orders`, `order_items` |
| 10.8 | Payment | Customer, system | `payments` |
| 10.9 | Reporting (MIS) | Admin, Seller | Reads from several tables |
| 10.10 | Category Suggestion (machine learning) | Seller | None (model file) |

## 10.2 API Conventions

- **Base URL:** `http://localhost:5000/api/v1`
- **Authentication:** `Authorization: Bearer <access_token>` on every endpoint except those marked *Public*.
- **Machine-readable specification:** [`openapi.yaml`](openapi.yaml) (OpenAPI 3.0).
- **Errors** use the same structure on every endpoint:

```json
{ "error": { "code": "INSUFFICIENT_STOCK", "message": "Only 2 units of this item are in stock" } }
```

## 10.3 Authentication and Authorization Module

**Purpose:** register users, verify their identity, and make sure each user can only reach what their role allows.

**Users:** All roles

**Tables used:** `users`

**Key functions**

- Register as a customer or as a seller
- Log in and receive a short-lived access token plus a refresh token
- Refresh an expired access token without logging in again
- Enforce role-based access on every protected endpoint

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Register as customer or seller | Public |
| POST | `/auth/login` | Returns access and refresh tokens | Public |
| POST | `/auth/refresh` | Exchange a refresh token for a new access token | Public |

## 10.4 Seller Management Module

**Purpose:** control which sellers may list products on the platform.

**Users:** Seller, Admin

**Tables used:** `sellers`, `users`

**Key functions**

- A seller registers a store and starts in the *pending* state
- The administrator lists pending sellers
- The administrator approves or rejects each seller; only approved sellers can list products

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/sellers/pending` | List sellers awaiting approval | Admin |
| PATCH | `/admin/sellers/:id/approve` | Approve or reject a seller | Admin |

## 10.5 Product Management Module

**Purpose:** maintain the product catalogue and let customers find products.

**Users:** Guest, Customer (read); Seller (manage)

**Tables used:** `products`, `sellers`

**Key functions**

- List products with category filter, keyword search, and pagination
- Show product details
- Create, update, and delete products (a seller can only change their own products)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/products` | List products; supports `?category=`, `?search=`, `?page=` | Public |
| GET | `/products/:id` | Product detail | Public |
| POST | `/products` | Create a product | Seller |
| PUT | `/products/:id` | Update a product | Seller (owner only) |
| DELETE | `/products/:id` | Delete a product | Seller (owner only) |

## 10.6 Cart Module

**Purpose:** hold the items a customer intends to buy, from any number of sellers, before checkout.

**Users:** Customer

**Tables used:** `cart_items`, `products`

**Key functions**

- View the cart
- Add an item or change its quantity
- Remove an item

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/cart` | Get the current user's cart | Customer |
| POST | `/cart/items` | Add an item to the cart | Customer |
| DELETE | `/cart/items/:id` | Remove an item from the cart | Customer |

## 10.7 Order Management Module

**Purpose:** turn a cart into an order, protect stock, and track fulfilment per item.

**Users:** Customer, Seller, Admin

**Tables used:** `orders`, `order_items`, `products`, `cart_items`

**Key functions**

- Place an order from the cart: check stock, reserve it, and create the order in one database transaction
- Store the price paid with each order item
- Let sellers update the fulfilment status of only their own items
- Expire unpaid orders after 15 minutes and return their stock

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/orders` | Place an order from the cart and start payment | Customer |
| GET | `/orders` | List the current user's orders | Customer |
| GET | `/orders/:id` | Order detail | Customer (owner), Seller (own items), Admin |
| PATCH | `/orders/:id/items/:itemId` | Update fulfilment status of one item | Seller (owner only) |

### Example: placing an order (Order Management module)

**Request**

```http
POST /api/v1/orders
Authorization: Bearer <token>
```

**Response `201`**

```json
{
  "id": "a3f1...e92",
  "status": "pending_payment",
  "total_cents": 249900,
  "payment_intent": {
    "provider": "razorpay",
    "order_id": "order_XXXXXX"
  }
}
```

## 10.8 Payment Module

**Purpose:** collect payment through the payment gateway and confirm orders only on verified payment.

**Users:** Customer (indirectly), system

**Tables used:** `payments`, `orders`

**Key functions**

- Create a payment order with the gateway when an order is placed
- Receive the gateway's signed webhook
- Verify the signature, then mark the payment and order as confirmed

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/payments/webhook` | Gateway webhook that confirms or fails a payment | Signature-verified (not user login) |

## 10.9 Reporting (MIS) Module

**Purpose:** give administrators and sellers summarised information for decision making; the report designs are in section 17.

**Users:** Admin, Seller

**Tables used:** `orders`, `order_items`, `products`, `sellers`, `payments`

**Key functions**

- Produce sales, seller performance, inventory, order status, and payment reconciliation reports
- Filter by date range, seller, and category
- Export results as CSV

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/reports/sales` | Sales summary | Admin |
| GET | `/admin/reports/seller-performance` | Seller performance | Admin |
| GET | `/admin/reports/inventory` | Inventory and low stock | Admin |
| GET | `/admin/reports/order-status` | Order status summary | Admin |
| GET | `/admin/reports/payments` | Payment reconciliation | Admin |
| GET | `/seller/reports/sales` | Sales of the seller's own store | Seller |
| GET | `/seller/reports/inventory` | Stock of the seller's own products | Seller |

## 10.10 Category Suggestion Module (Machine Learning)

**Purpose:** suggest the most likely categories for a new product from its title and description, so sellers can list products faster and the catalogue stays consistently organised.

**Users:** Seller

**Tables used:** none (the model runs on the text sent in the request and stores nothing)

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/products/suggest-category` | Returns the top 3 categories with confidence scores | Seller |

**Example request and response**

```http
POST /api/v1/products/suggest-category
Authorization: Bearer <token>
Content-Type: application/json

{ "title": "Non-Stick Frying Pan 28cm", "description": "Induction compatible pan" }
```

```json
{
  "low_confidence": false,
  "suggestions": [
    { "category": "Home & Kitchen", "confidence": 0.91 },
    { "category": "Grocery", "confidence": 0.04 },
    { "category": "Electronics", "confidence": 0.02 }
  ]
}
```

When the top confidence is below 0.5, `low_confidence` is `true` and the interface shows "No confident suggestion" instead of presenting a guess as fact. A missing title returns `400`.

> **Sample document note:** the dataset details and metric values in this module are **illustrative**, not results from a real training run. Students must report their own real numbers.

### 10.10.1 Overview

ShopSphere includes one ML feature: **automatic category suggestion for sellers**. When a seller types a product title and short description while creating a listing, the system suggests the three most likely categories with a confidence score. The seller confirms or changes the choice, so the model only ever *suggests*; it never assigns a category on its own.

**Why this feature:** a wrong or missing category makes a product hard to find through the category filter, and sellers often pick "Other" to save time. Suggestions reduce that friction without removing the seller's control.

| Item | Detail |
|---|---|
| Task | Multi-class text classification (8 categories) |
| Input | Product title and description (English text) |
| Output | Top 3 categories with confidence scores |
| Model | TF-IDF features + logistic regression |
| Training code | [`ml/src/`](../ml/src/) and [`ml/notebooks/`](../ml/notebooks/) |
| Trained model file | [`ml/models/category_model.json`](../ml/models/category_model.json) (about 1 MB, committed), copied to `backend/src/ml/` on export |
| Served by | The Express backend, endpoint `POST /products/suggest-category` (see the endpoint table above) |

The end-to-end pipeline is drawn in section 13.2 ([`13-ARCHITECTURE-DIAGRAM.md`](13-ARCHITECTURE-DIAGRAM.md)).

---

### 10.10.2 Dataset

| Item | Detail |
|---|---|
| Source | A public e-commerce product-listing dataset from Kaggle. The exact link and licence are recorded in `ml/data/README.md`. |
| Raw size | 12,000 listings |
| After cleaning | 9,600 listings |
| Features used | Product title and description, joined into one text field |
| Labels | 8 categories chosen to match ShopSphere's own: Electronics, Fashion, Home & Kitchen, Books, Beauty, Sports, Toys, Grocery |
| Personal data | None. The dataset contains only product text, so there are no privacy concerns for training. |

**Preprocessing**
1. Dropped listings with an empty title or an unmapped category.
2. Mapped the source dataset's many categories onto our 8.
3. **Removed duplicate titles before splitting**, so the same product cannot appear in both training and test data.
4. Lowercased the text and stripped HTML fragments. Stop words were kept, since TF-IDF down-weights them anyway.

**Class balance:** the classes are uneven. Electronics is the largest (about 24% of the data) and Grocery the smallest (about 6%). This is why the training setup uses class weighting and why evaluation reports macro-F1 and not accuracy alone.

Only a small sample (`ml/data/sample.csv`, a few dozen rows) is committed. The full dataset is not stored in the repository; `ml/data/download.py` fetches it.

---

### 10.10.3 Model Choice and Justification

**Chosen: TF-IDF (word 1 to 2-grams) + multinomial logistic regression.**

| Option | What happened | Reason |
|---|---|---|
| Majority-class baseline | Tried | Floor to beat |
| Multinomial Naive Bayes | Tried | Standard fast text baseline |
| Linear SVM | Tried | Strong text classifier, but no native probabilities, and we need confidence scores for the UI |
| **Logistic regression** | **Chosen** | Near the best accuracy, gives usable probabilities, trains in seconds, and the whole model reduces to a table of weights |
| Fine-tuned DistilBERT | Considered, not trained | Likely a few points more accurate, but a much larger model, slower inference, and extra infrastructure for a task where product titles are short and keyword-driven |
| Zero-shot LLM API | Considered, not used | Adds cost, latency, and an external dependency to every listing, and cannot be tested offline |

**The deciding factor was deployment.** The backend is a Node.js monolith (ADR-001 in section 13.3 ([`13-ARCHITECTURE-DIAGRAM.md`](13-ARCHITECTURE-DIAGRAM.md))). Because logistic regression is just a vocabulary, IDF values, and a weight matrix, we export those to a JSON file and compute predictions in plain JavaScript. This keeps the system a single deployable service, with no Python runtime or separate ML service in production.

**Trade-off accepted:** a TF-IDF model cannot understand word meaning or context, and it ignores product images. See section 18.4 ([`18-CONCLUSION.md`](18-CONCLUSION.md)).

---

### 10.10.4 Training Setup

| Item | Detail |
|---|---|
| Split | 70% train / 15% validation / 15% test, stratified by category |
| Random seed | 42 everywhere (split and model) |
| Vectorizer | `TfidfVectorizer`: word 1 to 2-grams, 20,000 features maximum, sublinear term frequency |
| Classifier | `LogisticRegression`: `C=5`, `class_weight="balanced"`, `max_iter=1000` |
| Tuning | `C` and the n-gram range chosen on the validation set only |
| Test set | Used **once**, after all choices were final |

**To retrain**
```bash
cd ml
pip install -r requirements.txt
python src/train.py          # trains and writes metrics to models/metrics.json
python src/export_model.py   # writes models/category_model.json and copies it to backend/src/ml/
```

---

### 10.10.5 Evaluation

All figures below are **illustrative sample values**.

#### Model comparison (validation set)

| Model | Accuracy | Macro-F1 |
|---|---|---|
| Majority class (baseline) | 0.24 | 0.05 |
| Naive Bayes | 0.84 | 0.81 |
| Linear SVM | 0.90 | 0.88 |
| **Logistic regression (chosen)** | **0.90** | **0.88** |

#### Final result (held-out test set)

| Metric | Value |
|---|---|
| Accuracy | 0.90 |
| Macro-F1 | 0.88 |
| **Top-3 accuracy** | **0.98** |

**Top-3 accuracy is the metric that matches the product.** The UI shows three suggestions, so what matters most is whether the correct category is among them.

**Metrics were chosen deliberately:** accuracy alone would flatter the model because of class imbalance, so macro-F1 (which weights every category equally) is reported alongside it.

#### Error analysis

- **Weakest categories:** Sports and Home & Kitchen (F1 around 0.82), the two with the most overlap with other classes.
- **Most common confusions:** Sports vs Fashion (for example running shoes) and Home & Kitchen vs Electronics (for example kitchen appliances). Many of these are genuinely ambiguous, which supports the decision to show three suggestions and let the seller choose.
- **Short titles:** accuracy falls to about 0.78 for titles of three words or fewer, because there is little text to work with.
- **Confidence check:** on validation data, predictions with confidence of 0.5 or more were correct about 94% of the time. Below 0.5 the API returns the suggestions flagged as low confidence, and the UI says "no confident suggestion" instead of presenting a guess as fact.

---

### 10.10.6 Reproducibility

- Python version and library versions are pinned in `ml/requirements.txt` (scikit-learn, pandas, numpy).
- All random seeds are fixed (42), so rerunning `train.py` reproduces the same metrics.
- `notebooks/01-exploration.ipynb` runs top to bottom without edits and shows the class distribution, text length statistics, and the confusion matrix.
- `models/metrics.json` stores the exact figures reported in this document.
- **Python and JavaScript parity test:** because training happens in Python but inference runs in Node, a backend Jest test checks that the JavaScript predictions match the Python model's top-1 prediction on 200 held-out listings. This guards against the two tokenizers drifting apart. See section 18.3 ([`18-CONCLUSION.md`](18-CONCLUSION.md)).

---

### 10.10.7 Integration and Notes

- The export step copies the model into `backend/src/ml/`, so the backend deploys on its own without the `ml/` folder. The backend loads `category_model.json` **once at startup**; a prediction takes a few milliseconds.
- Input is validated before it reaches the model: title required, text capped at 1,000 characters (see section 11.5 ([`11-FEATURES-OF-THE-SYSTEM.md`](11-FEATURES-OF-THE-SYSTEM.md))).
- Seller choices are **not** logged for retraining in this version. Using them as feedback to improve the model is listed as future work in section 18.4 ([`18-CONCLUSION.md`](18-CONCLUSION.md)).
