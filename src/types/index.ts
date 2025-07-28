export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'cakes' | 'cookies' | 'breads' | 'custom';
  ingredients: string[];
  availability: boolean;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customizations?: string[];
}

export interface Order {
  id: string;
  customerId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  orderType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: 'customer' | 'admin' | 'employee';
  address?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  lowStockThreshold: number;
  lastUpdated: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  hireDate: string;
  status: 'active' | 'inactive';
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiryDate: string;
  isActive: boolean;
  minOrderAmount?: number;
}