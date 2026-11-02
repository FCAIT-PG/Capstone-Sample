# 5. Introduction

## 5.1 Background

Online shopping has become a normal part of everyday life, but the infrastructure behind it is out of reach for many small and independent sellers. Building and maintaining a storefront, handling payments, and attracting customers all require time and money that a small seller often does not have. Existing marketplace platforms solve part of this problem, but they tend to charge high commissions or offer limited control over how products are presented.

## 5.2 Purpose of the Project

ShopSphere is a multi-vendor e-commerce platform that provides one shared marketplace in which many independent sellers can list and manage their own products, while customers browse, buy, and track orders from several sellers in a single checkout. The idea is similar to the seller model used by large marketplaces such as Etsy or Flipkart, scoped down to a feature set that can be designed, built, tested, and documented within a single semester.

## 5.3 Overview of the System

The system is a web application with three types of registered users: **customers**, **sellers**, and **administrators**. Visitors who are not logged in (guests) can browse and search the catalogue before registering (section 12.1).

- **Customers** browse and search the catalogue, add products from different sellers to one cart, pay once, and track each item of their order.
- **Sellers** register a store, list and maintain their own products, and update the fulfilment status of the items they have sold.
- **Administrators** approve new sellers, oversee all orders on the platform, and view management reports.
- **An AI-assisted feature** suggests a product category to the seller from the title and description of a new listing, saving time and keeping the catalogue consistently organised.

## 5.4 Intended Audience

This document is intended for the project guide and evaluators who assess the work, for future developers who may maintain or extend the system, and for any reader who wants to understand how the system was designed and why.

## 5.5 Organisation of This Document

| Section | Title | What it covers |
|---|---|---|
| 5 | Introduction | Background, purpose, and overview |
| 6 | Project Definition | Problem statement, objectives, scope, and deliverables |
| 7 | Project Profile | Key facts about the project at a glance |
| 8 | Tools and Technology | Technology stack with justification, tools, and deployment environment |
| 9 | Feasibility Study | Technical, economic, operational, schedule, and legal feasibility |
| 10 | Modules of the System | The functional modules, their API endpoints, and the machine learning module |
| 11 | Features of the System | What the system offers each user, including security features |
| 12 | Users of the System | User roles and their permissions |
| 13 | Architecture Diagram | System architecture and the key design decisions |
| 14 | UML Diagrams | Class, use case, sequence, and activity diagrams |
| 15 | Database Design | Entity-relationship diagram and data dictionary |
| 16 | GUI Design | Mock screens of the main user interfaces |
| 17 | MIS Reports Design | Design of the management reports |
| 18 | Conclusion and Future Scope | Summary, testing, limitations, and future scope |
