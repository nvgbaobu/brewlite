// Đồng bộ với class diagram (Task 2.3) và API contract với backend.
export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number; // VND
  category: string;
  imageUrl?: string | null;
  isAvailable: boolean;
}
