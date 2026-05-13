/**
 * Global type definitions for the Spesa app.
 */

/**
 * Represents a single product in a receipt/expense.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity?: number;
  category?: string;
  confidence?: number; // OCR confidence (0-1)
}

/**
 * Represents a single expense (receipt).
 */
export interface Expense {
  id: string;
  date: Date;
  products: Product[];
  total: number;
  notes?: string;
  imageUri?: string; // URI of the receipt photo
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a shopping list.
 */
export interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingListItem[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a single item in a shopping list.
 */
export interface ShoppingListItem {
  id: string;
  productId?: string;
  name: string;
  quantity?: number;
  unit?: string;
  isChecked: boolean;
}

/**
 * API response for OCR processing.
 */
export interface OCRResult {
  products: Product[];
  total: number;
  confidence: number;
  rawText: string;
}

/**
 * Voice input result.
 */
export interface VoiceInputResult {
  text: string;
  confidence: number;
}
