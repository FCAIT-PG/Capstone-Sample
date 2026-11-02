# 17. MIS Reports Design

Management Information System (MIS) reports turn the data stored by the application into summaries that help administrators and sellers make decisions. This section describes the design of each report: its purpose, inputs, source data, layout, and output.

> **Sample document.** The figures shown in the sample layouts are illustrative.

## 17.1 Report Catalogue

| ID | Report | Main user | Purpose |
|---|---|---|---|
| R1 | Sales Summary | Admin (Seller: own store) | Track revenue and order volume over time |
| R2 | Seller Performance | Admin | Compare sellers on sales and fulfilment quality |
| R3 | Inventory and Low Stock | Admin (Seller: own products) | Find products that are out of stock or running low |
| R4 | Order Status | Admin | See how many orders are in each state and spot stuck orders |
| R5 | Payment Reconciliation | Admin | Check that payments and orders agree |

## 17.2 Common Design Standards

| Aspect | Standard |
|---|---|
| Access | Admin reports are available only to administrators. Seller versions of R1 and R3 are automatically limited to the seller's own products. |
| Filters | Every report has a date range (default: last 7 days). Other filters are listed per report. |
| Revenue rule | Revenue counts only orders in the `confirmed` or `completed` state. Expired and unpaid orders are excluded. |
| Amounts | Shown in rupees with thousands separators; stored in the database as integer paise. |
| Output | On-screen table with 25 rows per page, a totals row, and a CSV export. The browser's print option produces a PDF. |
| Generation | Produced on demand by a database query; no separate data warehouse is needed at this scale. |
| Footer | Each report shows the filters used and the date and time it was generated. |

## 17.3 R1: Sales Summary Report

| Item | Design |
|---|---|
| Purpose | Show revenue, order count, and average order value over a period |
| Users | Admin; Seller (own store only) |
| Input parameters | Date range, group by (day, week, or month), category (optional), seller (Admin only, optional) |
| Source tables | `orders`, `order_items`, `products` |
| Grouping | By the chosen period |
| Sorting | By date, oldest first |
| Endpoints | `GET /admin/reports/sales`, `GET /seller/reports/sales` |

**Sample layout**

| Date | Orders | Items Sold | Gross Revenue (Rs.) | Average Order Value (Rs.) |
|---|--:|--:|--:|--:|
| 01 Oct 2026 | 42 | 96 | 58,400 | 1,390 |
| 02 Oct 2026 | 38 | 81 | 49,740 | 1,309 |
| 03 Oct 2026 | 51 | 118 | 71,260 | 1,397 |
| 04 Oct 2026 | 47 | 104 | 64,880 | 1,380 |
| **Total** | **178** | **399** | **244,280** | **1,372** |

**Source query (simplified)**

```sql
SELECT date_trunc('day', o.created_at)::date          AS day,
       COUNT(DISTINCT o.id)                           AS orders,
       SUM(oi.quantity)                               AS items_sold,
       SUM(oi.quantity * oi.price_at_purchase_cents) / 100.0 AS revenue
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.status IN ('confirmed', 'completed')
  AND o.created_at >= $1 AND o.created_at < $2
GROUP BY day
ORDER BY day;
```

## 17.4 R2: Seller Performance Report

| Item | Design |
|---|---|
| Purpose | Compare sellers on revenue and on how reliably they fulfil orders |
| Users | Admin |
| Input parameters | Date range, minimum number of items sold (optional) |
| Source tables | `sellers`, `products`, `order_items`, `orders` |
| Grouping | By seller |
| Sorting | By revenue, highest first |
| Endpoint | `GET /admin/reports/seller-performance` |

**Sample layout**

| Store | Products Listed | Items Sold | Revenue (Rs.) | Fulfilment Rate | Average Days to Ship |
|---|--:|--:|--:|--:|--:|
| TechBazaar | 58 | 171 | 312,900 | 91% | 2.4 |
| HomeNest | 34 | 212 | 145,600 | 96% | 1.8 |
| GreenLeaf Organics | 27 | 305 | 88,450 | 98% | 1.2 |
| Urban Threads | 41 | 94 | 61,300 | 84% | 3.1 |

*Fulfilment rate = items delivered divided by items sold in the period.*

## 17.5 R3: Inventory and Low Stock Report

| Item | Design |
|---|---|
| Purpose | Identify products that are out of stock or below a stock threshold |
| Users | Admin; Seller (own products only) |
| Input parameters | Category (optional), seller (Admin only, optional), stock threshold (default 10), status (optional) |
| Source tables | `products`, `sellers` |
| Sorting | By stock, lowest first |
| Endpoints | `GET /admin/reports/inventory`, `GET /seller/reports/inventory` |

**Sample layout**

| Product | Seller | Category | Stock | Status |
|---|---|---|--:|---|
| Steel Water Bottle 1L | HomeNest | Home & Kitchen | 0 | Out of stock |
| Cast Iron Kadai 3L | KitchenKing | Home & Kitchen | 4 | Low |
| USB-C Fast Charger 65W | TechBazaar | Electronics | 7 | Low |
| Masala Tea 250g | GreenLeaf Organics | Grocery | 9 | Low |
| Non-Stick Frying Pan 28cm | HomeNest | Home & Kitchen | 40 | OK |

*Status is Out of stock at 0, Low at or below the threshold, and OK above it. The Low Stock card on the admin dashboard links to this report.*

## 17.6 R4: Order Status Report

| Item | Design |
|---|---|
| Purpose | Show how many orders are in each state and highlight orders stuck in `pending_payment` |
| Users | Admin |
| Input parameters | Date range |
| Source tables | `orders` |
| Grouping | By order status |
| Endpoint | `GET /admin/reports/order-status` |

**Sample layout**

| Order Status | Orders | Share of Orders | Total Value (Rs.) |
|---|--:|--:|--:|
| Completed | 117 | 60.6% | 160,680 |
| Confirmed | 61 | 31.6% | 83,600 |
| Pending payment | 6 | 3.1% | 8,120 |
| Expired | 9 | 4.7% | 11,430 |
| **Total** | **193** | **100.0%** | **263,830** |

*Completed and Confirmed together match the 178 orders and Rs. 244,280 shown in the Sales Summary sample (R1).*

## 17.7 R5: Payment Reconciliation Report

| Item | Design |
|---|---|
| Purpose | Detect orders and payments that disagree, such as a confirmed payment on an order that was never confirmed |
| Users | Admin |
| Input parameters | Date range, payment status (optional), mismatches only (yes or no) |
| Source tables | `payments`, `orders` |
| Sorting | Mismatches first, then newest first |
| Endpoint | `GET /admin/reports/payments` |

**Sample layout**

| Order | Gateway Payment ID | Order Amount (Rs.) | Paid Amount (Rs.) | Payment Status | Order Status | Flag |
|---|---|--:|--:|---|---|---|
| #D41E77 | pay_Nx90Lm | 1,899 | 1,899 | confirmed | pending_payment | **Check** |
| #A3F1E9 | pay_Nx81Kq | 4,496 | 4,496 | confirmed | confirmed | OK |
| #B7C204 | pay_Nx83Tz | 2,150 | 2,150 | confirmed | completed | OK |
| #9D02B1 | none | 3,499 | none | pending | expired | OK (unpaid, stock restored) |

*A row is flagged Check when the payment is confirmed but the order is not, or when the amounts differ.*
