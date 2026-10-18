"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "./CartProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.isAvailable) {
    return <p className="soldout">Tạm hết hàng</p>;
  }

  return (
    <div>
      <button
        className="btn"
        onClick={() => {
          add(product);
          setAdded(true);
        }}
      >
        Thêm vào giỏ
      </button>
      <p className="muted" role="status" aria-live="polite">
        {added ? "Đã thêm vào giỏ" : ""}
      </p>
    </div>
  );
}
