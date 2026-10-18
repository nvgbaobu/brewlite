import type { Product } from "./types";
import { mockProducts } from "@/mocks/products";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new ApiError(res.status, `Request failed: ${res.status}`);
  return (await res.json()) as T;
}

export async function getProducts(): Promise<Product[]> {
  if (USE_MOCK) return mockProducts;
  return request<Product[]>("/products");
}

export async function getProduct(id: string): Promise<Product> {
  if (USE_MOCK) {
    const found = mockProducts.find((p) => p.id === id);
    if (!found) throw new ApiError(404, "Không tìm thấy sản phẩm");
    return found;
  }
  return request<Product>(`/products/${id}`);
}
