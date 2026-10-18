import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatVnd } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <li>
      <Link href={`/products/${product.id}`} className="card" aria-disabled={!product.isAvailable}>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <span className="price">{formatVnd(product.basePrice)}</span>
        {!product.isAvailable && <div className="soldout">Tạm hết hàng</div>}
      </Link>
    </li>
  );
}
