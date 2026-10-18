"use client";

import { useCallback, useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type State =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; products: Product[] };

export function MenuView() {
  const [state, setState] = useState<State>({ status: "loading" });

  const load = useCallback(async () => {
    setState({ status: "loading" });
    try {
      setState({ status: "ready", products: await getProducts() });
    } catch {
      setState({ status: "error" });
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (state.status === "loading") {
    return (
      <ul className="grid" aria-busy="true" aria-label="Đang tải menu">
        {[0, 1, 2, 3].map((i) => (
          <li key={i} className="skeleton" />
        ))}
      </ul>
    );
  }

  if (state.status === "error") {
    return (
      <div className="state" role="alert">
        <h2>Không tải được menu</h2>
        <p>Kiểm tra kết nối mạng rồi thử lại.</p>
        <button className="btn" onClick={load}>Tải lại menu</button>
      </div>
    );
  }

  if (state.products.length === 0) {
    return (
      <div className="state">
        <h2>Menu đang trống</h2>
        <p>Cửa hàng chưa có món nào. Vui lòng quay lại sau.</p>
      </div>
    );
  }

  return (
    <ul className="grid">
      {state.products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ul>
  );
}
