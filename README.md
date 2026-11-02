# ShopSphere — Multi-Vendor E-Commerce Platform

ShopSphere is a web-based e-commerce platform that allows multiple independent sellers to list products under one storefront, while customers browse, purchase, and track orders across sellers in a single checkout flow. Sellers also get AI-assisted category suggestions when creating a listing.

This repository is a **sample capstone submission** demonstrating the required documentation format and repository structure. It is not a fully implemented system — code files are stubbed to illustrate project layout, not functionality.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend (web) | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | PostgreSQL |
| Auth | JWT (access + refresh tokens) |
| Payments | Razorpay (test mode) |
| ML (offline training) | Python, scikit-learn |
| Deployment | Render (backend + DB), Vercel (web frontend) |

See [`docs/08-TOOLS-AND-TECHNOLOGY.md`](docs/08-TOOLS-AND-TECHNOLOGY.md) for the full stack justification.

## Repository Structure

```
shopsphere/
├── README.md
├── docs/
│   ├── 05-INTRODUCTION.md
│   ├── 06-PROJECT-DEFINITION.md
│   ├── 07-PROJECT-PROFILE.md
│   ├── 08-TOOLS-AND-TECHNOLOGY.md
│   ├── 09-FEASIBILITY-STUDY.md
│   ├── 10-MODULES-OF-THE-SYSTEM.md
│   ├── 11-FEATURES-OF-THE-SYSTEM.md
│   ├── 12-USERS-OF-THE-SYSTEM.md
│   ├── 13-ARCHITECTURE-DIAGRAM.md
│   ├── 14-UML-DIAGRAMS.md
│   ├── 15-DATABASE-DESIGN.md
│   ├── 16-GUI-DESIGN.md
│   ├── 17-MIS-REPORTS-DESIGN.md
│   ├── 18-CONCLUSION.md
│   ├── openapi.yaml
│   ├── diagrams/
│   │   └── (diagram images)
│   ├── screens/
│   │   └── (mock screen images)
│   └── Certificate.pdf
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── ml/
│   └── package.json
├── ml/
│   ├── notebooks/
│   ├── src/
│   ├── data/
│   ├── models/
│   └── requirements.txt
└── frontend/
    └── web/
        ├── src/
        │   ├── components/
        │   ├── pages/
        │   └── api/
        └── package.json
```

This project has a web client only, so there is no `frontend/mobile/` folder.

The documents in `docs/` are numbered by their section in the final project report. Sections 1 to 4 (title page, college certificate, acknowledgement, and index) are generated separately and are not part of the repository.

## Getting Started

```bash
# Backend
cd backend
npm install
cp .env.example .env   # fill in the values listed in .env.example
npm run migrate
npm run dev

# Web frontend
cd frontend/web
npm install
npm run dev
```

The backend runs on `http://localhost:5000`, the web frontend on `http://localhost:5173`.

**Retraining the category-suggestion model** (optional, the trained model is already included):

```bash
cd ml
pip install -r requirements.txt
python src/train.py
python src/export_model.py
```

See section 10.10 of [`docs/10-MODULES-OF-THE-SYSTEM.md`](docs/10-MODULES-OF-THE-SYSTEM.md) for details.

## Documentation Index

| Section | Document | Covers |
|---|---|---|
| 5 | [Introduction](docs/05-INTRODUCTION.md) | Background, purpose, overview |
| 6 | [Project Definition](docs/06-PROJECT-DEFINITION.md) | Problem statement, objectives, scope |
| 7 | [Project Profile](docs/07-PROJECT-PROFILE.md) | Key project facts at a glance |
| 8 | [Tools and Technology](docs/08-TOOLS-AND-TECHNOLOGY.md) | Stack with justification, tools, deployment |
| 9 | [Feasibility Study](docs/09-FEASIBILITY-STUDY.md) | Technical, economic, operational, schedule, legal |
| 10 | [Modules of the System](docs/10-MODULES-OF-THE-SYSTEM.md) | Modules, API endpoints, ML module |
| 11 | [Features of the System](docs/11-FEATURES-OF-THE-SYSTEM.md) | Features by role, security features |
| 12 | [Users of the System](docs/12-USERS-OF-THE-SYSTEM.md) | Roles and permissions |
| 13 | [Architecture Diagram](docs/13-ARCHITECTURE-DIAGRAM.md) | Architecture, ML pipeline, design decisions |
| 14 | [UML Diagrams](docs/14-UML-DIAGRAMS.md) | Class, use case, sequence, activity |
| 15 | [Database Design](docs/15-DATABASE-DESIGN.md) | ER diagram and data dictionary |
| 16 | [GUI Design](docs/16-GUI-DESIGN.md) | Mock screens |
| 17 | [MIS Reports Design](docs/17-MIS-REPORTS-DESIGN.md) | Management report designs |
| 18 | [Conclusion](docs/18-CONCLUSION.md) | Summary, testing, limitations, future scope |

The API specification is in [`docs/openapi.yaml`](docs/openapi.yaml).
