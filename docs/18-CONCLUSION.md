# 18. Conclusion

## 18.1 Summary

ShopSphere demonstrates how a small team can build a working multi-vendor marketplace in one semester. Customers can shop from several sellers in a single checkout, sellers can manage their own products and orders, and administrators can approve sellers and monitor the platform through management reports. A small machine learning feature suggests product categories to sellers, showing how a simple model can be trained offline and embedded in an ordinary web application without adding operational complexity.

The design decisions in section 13.3, in particular the single backend, stock reservation inside a database transaction, and in-process model inference, were all made to keep the system correct, simple to run, and appropriate to the project's size.

## 18.2 Objectives Achieved

| Objective (section 6.2) | Outcome | Where it is described |
|---|---|---|
| 1. Secure registration and login with role-based access | Achieved | Sections 10.3, 11.5, 12 |
| 2. Sellers manage their own product listings | Achieved | Section 10.5 |
| 3. Customers browse, search, and filter products | Achieved | Section 10.5 |
| 4. Single cart and unified multi-seller checkout with online payment | Achieved | Sections 10.6 to 10.8 |
| 5. Prevent overselling through stock reservation | Achieved | ADR-003 in section 13.3 |
| 6. Per-item fulfilment tracking by sellers and customers | Achieved | Section 10.7 |
| 7. Seller approval, order oversight, and MIS reports for administrators | Achieved | Sections 10.4, 10.9, 17 |
| 8. Category suggestion using machine learning | Achieved | Section 10.10 |

## 18.3 Testing and Quality Assurance

### 18.3.1 Testing Approach

Testing is split between the backend (where the business logic lives) and light frontend testing of critical flows. Given the project timeline, effort was concentrated on the backend and on the parts of the system where a bug has real consequences — payment, stock, and order flows — rather than spread evenly across every route.

### 18.3.2 Backend Testing

| Type | Tool | Coverage focus |
|---|---|---|
| Unit tests | Jest | Order total calculation, stock decrement logic, JWT issuing/verification, input validators |
| Integration tests | Jest + Supertest | Auth flow (register → login → refresh), order placement (cart → order → stock check), seller-scoped access control (a seller cannot update another seller's product) |
| Model parity test | Jest | The JavaScript category classifier gives the same top-1 prediction as the Python model on 200 held-out listings (guards against tokenizer drift between training and serving) |

Example test scenarios covered:
- Placing an order with insufficient stock returns `409 INSUFFICIENT_STOCK` and does not create the order.
- A seller attempting to `PATCH` another seller's product returns `403`.
- An expired access token returns `401`, and the refresh flow correctly issues a new one.
- The Razorpay webhook handler rejects payloads with an invalid signature.
- `POST /products/suggest-category` returns `400` when the title is missing and flags `low_confidence` when the top confidence is below 0.5.

### 18.3.3 Model Evaluation

Software tests (above) check that the code works. How *good* the category predictions are is a separate question, covered by model evaluation (accuracy, macro-F1, top-3 accuracy, baseline comparison, error analysis) in section 10.10.5.

### 18.3.4 Frontend Testing

Manual test pass on the three core flows (customer checkout, seller product management, admin seller approval) before each milestone submission, using a fixed checklist rather than automated E2E tests — automated E2E (e.g. Playwright) was considered but scoped out given the project timeline (see section 18.4).

### 18.3.5 Running Tests

```bash
cd backend
npm test              # unit + integration
npm run test:coverage # generates coverage report
```

### 18.3.6 Coverage Snapshot

| Module | Coverage |
|---|---|
| `controllers/orderController.js` | 87% |
| `controllers/productController.js` | 76% |
| `middleware/auth.js` | 92% |
| `utils/validators.js` | 95% |
| Overall | ~81% |

CI runs the backend test suite on every push via GitHub Actions (`.github/workflows/test.yml`); a passing badge is shown in the root `README.md` once configured.

## 18.4 Limitations

- **No rate limiting** on auth endpoints — vulnerable to brute-force login attempts in a real deployment.
- **No automated end-to-end tests** for the frontend; testing relies on a manual checklist (see section 18.3).
- **Single payment provider** (Razorpay) — no fallback if the provider is unavailable.
- **No search relevance ranking** — product search is a simple `ILIKE` match on title/category, not a ranked full-text or fuzzy search.
- **Category suggestion model is limited:** it is a keyword-based text classifier trained on 8 categories in English only. It ignores product images, cannot suggest a category it was not trained on, and is weaker on very short titles (see section 10.10.5).
- **No coupon/discount engine** — pricing is fixed per product with no promotional pricing support.
- **Review/rating system is out of scope** for this version — product pages do not currently support customer reviews.
- **Single-instance deployment** — the backend is not horizontally scaled, and the JWT-based auth design (stateless) was chosen partly in anticipation of that need rather than because it's exercised today.

## 18.5 Future Scope

- Add Redis-backed rate limiting on auth and checkout endpoints.
- Introduce Playwright-based E2E tests for the three core user flows.
- Add a review/rating system with seller response capability.
- Move product search to a dedicated search index (e.g. PostgreSQL full-text search or a lightweight external search service) as the catalog grows.
- Use seller corrections of the suggested category as feedback to retrain and improve the model.
- Add email notifications for order status changes (currently orders update silently in the UI only).

## 18.6 Key Learnings

- Writing down the reasoning behind each design decision made later changes easier, because the trade-offs were already recorded.
- Money, stock, and payment status are the parts of an e-commerce system where bugs cost the most, so they received the most careful design and testing.
- A simple, well-evaluated model that fits the deployment environment was more valuable than a more complex model that would have required extra infrastructure.
