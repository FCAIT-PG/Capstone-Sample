# 8. Tools and Technology

## 8.1 Technology Stack and Justification

| Choice | Justification |
|---|---|
| **React (frontend)** | Component reuse across customer, seller, and admin views, which share a lot of UI (tables, forms, product cards); team's prior familiarity reduced ramp-up time. |
| **Node.js + Express (backend)** | Single language (JavaScript/TypeScript) across frontend and backend simplified context-switching for a two-person team; Express's minimalism suited a REST API of this size without the overhead of a heavier framework. |
| **PostgreSQL** | The domain is inherently relational — orders, order items, products, and sellers have well-defined foreign-key relationships and need transactional guarantees (e.g. stock decrement on order placement). A document store was considered for the product catalog (variable attributes per category) but rejected to avoid split-brain across two databases for a project this size; product attributes are instead handled with a flexible `JSONB` column (see section 15, [15-DATABASE-DESIGN.md](15-DATABASE-DESIGN.md)). |
| **JWT-based auth** | Stateless auth avoids server-side session storage, which simplified horizontal scaling considerations even though the deployed version runs a single instance; access + refresh token pair balances security (short-lived access token) with UX (no forced re-login every 15 minutes). |
| **Razorpay (test mode)** | Chosen over Stripe for INR-native support and easier test-mode setup for an India-based project; webhook-based payment confirmation avoids trusting client-side payment success callbacks. |
| **scikit-learn (offline training only)** | The category-suggestion model is a TF-IDF + logistic regression classifier, which scikit-learn trains in seconds. Training stays offline in Python; the trained weights are exported to JSON and run inside the Node backend, so there is no Python in production. Full reasoning in section 10.10 ([10-MODULES-OF-THE-SYSTEM.md](10-MODULES-OF-THE-SYSTEM.md)). |

## 8.2 Development Tools

| Purpose | Tool |
|---|---|
| Code editor | Visual Studio Code |
| Version control and collaboration | Git and GitHub |
| API testing | Postman |
| Automated testing | Jest and Supertest |
| Continuous integration | GitHub Actions |
| Diagrams | A diagramming tool, with every diagram exported as a PNG image and stored in `docs/diagrams/` |
| Wireframes | Hand-built mock screens exported as PNG images |
| Machine learning experiments | Python, scikit-learn, Jupyter notebooks |

## 8.3 Hardware and Software Requirements

**Development machine**

- Any modern laptop or desktop with at least 8 GB of RAM
- Node.js (LTS version), Python 3.11, PostgreSQL, and Git installed

**End users**

- A device with a modern web browser (Chrome, Firefox, Edge, or Safari) and an internet connection
- No installation is required; the application is used entirely through the browser

## 8.4 Deployment Environment

| Component | Platform | Notes |
|---|---|---|
| Frontend | Vercel | Auto-deploys from `main` branch |
| Backend API | Render | Web service, auto-deploys from `main` branch |
| Database | Render (managed PostgreSQL) | Daily automated backups |

**Live demo:** `https://shopsphere-demo.vercel.app` *(placeholder — replace with actual deployed link)*
**API base:** `https://shopsphere-api.onrender.com/api/v1` *(placeholder)*

### Environment variables

Backend requires (see `.env.example`):
```
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
CLIENT_ORIGIN=
```

Frontend requires:
```
VITE_API_BASE_URL=
VITE_RAZORPAY_KEY_ID=
```

### Deployment steps (first-time setup)

1. Provision PostgreSQL instance on Render; copy connection string to `DATABASE_URL`.
2. Deploy backend as a Render web service, pointing to `backend/` with build command `npm install` and start command `npm start`.
3. Run migrations against the deployed database: `npm run migrate` (via Render's one-off job, or locally against the remote `DATABASE_URL`).
4. Deploy the web frontend (`frontend/web/`) to Vercel, pointing `VITE_API_BASE_URL` to the deployed backend URL.
5. Register the deployed backend URL as the Razorpay webhook endpoint (`/api/v1/payments/webhook`) in the Razorpay dashboard, in test mode.

### Model file

The category-suggestion model is a small JSON file (about 1 MB) committed at `backend/src/ml/category_model.json`. The backend loads it at startup, so no extra step is needed when deploying. To update the model, retrain in `ml/` and run the export script, which refreshes this file (see section 10.10.4 in [10-MODULES-OF-THE-SYSTEM.md](10-MODULES-OF-THE-SYSTEM.md)).

For local setup instructions, see the root [`README.md`](../README.md).
