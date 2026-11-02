# 9. Feasibility Study

A feasibility study checks whether the project can realistically be completed and whether it is worth building. ShopSphere was assessed on five dimensions.

## 9.1 Technical Feasibility

The system uses mainstream, well-documented technologies (React, Node.js, Express, PostgreSQL), all of which the team already knew or could learn from freely available material. TypeScript is used on both the frontend and the backend, which reduces the learning load for a small team. Payment processing is delegated to an established payment gateway rather than built from scratch, and the machine learning component uses a lightweight model (TF-IDF with logistic regression) that trains in seconds on an ordinary laptop. No specialised hardware is needed.

**Conclusion:** technically feasible.

## 9.2 Economic Feasibility

| Item | Cost during development |
|---|---|
| Development tools (editor, Git, Node.js, Python, PostgreSQL) | Free and open source |
| Hosting (frontend, backend, database) | Free or low-cost tiers are sufficient for a demonstration |
| Payment gateway | No charge in test mode |
| Dataset for the machine learning model | Public dataset, no cost |
| Domain name | Optional; the hosting platforms provide free sub-domains |

The development cost is essentially the team's time. For a real deployment, costs would include paid hosting for higher traffic and transaction fees charged by the payment gateway in live mode; these would be recovered through a small commission or subscription charged to sellers.

**Conclusion:** economically feasible for a capstone project, and commercially plausible if taken to production.

## 9.3 Operational Feasibility

- The interfaces follow familiar e-commerce conventions, so customers need no training.
- Sellers manage their own listings and orders through simple forms and tables.
- Administrator work is kept light: approving sellers and reviewing reports.
- The category suggestion feature reduces seller effort and does not remove their control, so it fits naturally into the listing workflow.

**Conclusion:** operationally feasible; users can adopt the system with minimal effort.

## 9.4 Schedule Feasibility

| Weeks | Phase | Main activities |
|---|---|---|
| 1 to 2 | Requirements and planning | Problem definition, scope, feasibility, team roles |
| 3 to 4 | Design | Architecture, database design, UML diagrams, mock screens |
| 5 to 9 | Core development | Authentication, products, cart and orders, payment integration, frontend screens |
| 10 to 11 | Machine learning component | Dataset preparation, model training and evaluation, integration into the backend |
| 12 | Testing | Unit, integration, and manual testing; fixing defects |
| 13 | Deployment and documentation | Deploy the application, finalise documentation |
| 14 | Buffer and submission | Reserve time for delays, final review, presentation |

**Conclusion:** the scope fits within the available time, with one buffer week for slippage.

## 9.5 Legal and Ethical Feasibility

- The application never stores card details; payments are handled entirely by the payment gateway.
- The dataset used to train the model contains only public product text and no personal data. Its licence permits this use.
- User passwords are stored only as salted hashes, and personal data collected (name, email) is limited to what the system needs.

**Conclusion:** no legal or ethical obstacles were identified.

## 9.6 Risks and Mitigation

| Risk | Likelihood | Mitigation |
|---|---|---|
| Payment integration takes longer than planned | Medium | Use the gateway's test mode and webhooks early in development |
| Two customers buy the last unit of a product | Medium | Reserve stock inside a database transaction when the order is placed |
| Model accuracy is too low to be useful | Low | Show three suggestions with confidence scores and let the seller decide |
| Team member unavailable | Medium | Keep documentation current and use small, regular commits so work can be picked up by others |
| Free hosting limits are exceeded | Low | The demonstration load is small; the architecture can move to paid tiers without code changes |

## 9.7 Overall Conclusion

The project is technically, economically, operationally, and legally feasible, and can be completed in the planned schedule.
