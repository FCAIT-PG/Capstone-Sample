// Core domain types shared by the controllers and data-access code.
// The class diagram in section 14.1 (docs/14-UML-DIAGRAMS.md) is drawn from this file.
//
// Links between aggregates are held as ids (e.g. Product.sellerId); children that only
// exist inside their parent are held as arrays (Order.items, Cart.items).
// Field names are camelCase here; database columns and API JSON use snake_case
// (sections 15.3 and 10), and the data-access layer maps between the two.

export enum Role {
  Customer = 'customer',
  Seller = 'seller',
  Admin = 'admin',
}

export enum ApprovalStatus {
  Pending = 'pending',
  Approved = 'approved',
  Rejected = 'rejected',
}

export enum Category {
  Electronics = 'Electronics',
  Fashion = 'Fashion',
  HomeAndKitchen = 'Home & Kitchen',
  Books = 'Books',
  Beauty = 'Beauty',
  Sports = 'Sports',
  Toys = 'Toys',
  Grocery = 'Grocery',
}

export enum OrderStatus {
  PendingPayment = 'pending_payment',
  Confirmed = 'confirmed',
  Expired = 'expired',
  Completed = 'completed',
}

export enum FulfilmentStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
}

export enum PaymentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Failed = 'failed',
}

// The password hash is deliberately not part of User: it never leaves the auth data-access code.
export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  approvalStatus: ApprovalStatus;
  createdAt: Date;
}

export interface Product {
  id: string;
  sellerId: string;
  title: string;
  description?: string;
  category: Category;
  pricePaise: number;
  stock: number;
  attributes: Record<string, string>;
  isActive: boolean;
  createdAt: Date;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  addedAt: Date;
}

// Not a table: a customer's cart is assembled from their cart_items rows.
export interface Cart {
  customerId: string;
  items: CartItem[];
  subtotalPaise: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  priceAtPurchasePaise: number;
  fulfilmentStatus: FulfilmentStatus;
  shippedAt?: Date;
  deliveredAt?: Date;
}

export interface Order {
  id: string;
  customerId: string;
  status: OrderStatus;
  totalPaise: number;
  items: OrderItem[];
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  providerOrderId: string;
  providerPaymentId?: string;
  amountPaise: number;
  status: PaymentStatus;
  createdAt: Date;
  confirmedAt?: Date;
}

// Not stored: produced by the category model for each suggest-category request (section 10.10).
export interface CategorySuggestion {
  category: Category;
  confidence: number;
}

export interface SuggestionResult {
  lowConfidence: boolean;
  suggestions: CategorySuggestion[];
}
