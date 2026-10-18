import type { Product } from "./types";

export interface CartItem {
  /** Khóa của dòng giỏ: cùng sản phẩm + cùng size + cùng topping thì gộp một dòng. */
  lineId: string;
  productId: string;
  name: string;
  unitPrice: number; // VND, chỉ để hiển thị. Giá cuối cùng do backend tính.
  quantity: number;
  size?: string;
  toppings?: string[];
}

export interface AddOptions {
  quantity?: number;
  size?: string;
  toppings?: string[];
  unitPrice?: number;
}

export const MAX_QUANTITY = 20;

export function makeLineId(productId: string, size?: string, toppings: string[] = []): string {
  return [productId, size ?? "", [...toppings].sort().join(",")].join("|");
}

function clamp(quantity: number): number {
  return Math.min(Math.max(Math.floor(quantity), 0), MAX_QUANTITY);
}

export function addItem(items: CartItem[], product: Product, opts: AddOptions = {}): CartItem[] {
  const lineId = makeLineId(product.id, opts.size, opts.toppings);
  const addQty = clamp(opts.quantity ?? 1);
  if (addQty === 0) return items;

  const existing = items.find((i) => i.lineId === lineId);
  if (existing) {
    return items.map((i) =>
      i.lineId === lineId ? { ...i, quantity: clamp(i.quantity + addQty) } : i,
    );
  }
  return [
    ...items,
    {
      lineId,
      productId: product.id,
      name: product.name,
      unitPrice: opts.unitPrice ?? product.basePrice,
      quantity: addQty,
      size: opts.size,
      toppings: opts.toppings,
    },
  ];
}

export function setQuantity(items: CartItem[], lineId: string, quantity: number): CartItem[] {
  const q = clamp(quantity);
  if (q === 0) return removeItem(items, lineId);
  return items.map((i) => (i.lineId === lineId ? { ...i, quantity: q } : i));
}

export function removeItem(items: CartItem[], lineId: string): CartItem[] {
  return items.filter((i) => i.lineId !== lineId);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function lineTotal(item: CartItem): number {
  return item.unitPrice * item.quantity;
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + lineTotal(i), 0);
}
