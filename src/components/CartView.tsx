"use client";

import Link from "next/link";
import { formatVnd } from "@/lib/format";
import { lineTotal } from "@/lib/cart";
import { useCart } from "./CartProvider";

export function CartView() {
  const { items, hydrated, total, updateQuantity, remove } = useCart();

  if (!hydrated) {
    return (
      <ul className="grid" aria-busy="true" aria-label="Đang tải giỏ hàng">
        <li className="skeleton" />
        <li className="skeleton" />
      </ul>
    );
  }

  if (items.length === 0) {
    return (
      <div className="state">
        <h2>Giỏ hàng đang trống</h2>
        <p>Chọn một món từ menu để bắt đầu.</p>
        <Link href="/" className="btn btn-link">Xem menu</Link>
      </div>
    );
  }

  return (
    <div>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.lineId} className="cart-row">
            <div className="cart-info">
              <h3>{item.name}</h3>
              {(item.size || item.toppings?.length) && (
                <p className="muted">
                  {[item.size, ...(item.toppings ?? [])].filter(Boolean).join(", ")}
                </p>
              )}
              <p className="muted">{formatVnd(item.unitPrice)}</p>
            </div>

            <div className="cart-qty">
              <button
                className="qty-btn"
                aria-label={`Giảm số lượng ${item.name}`}
                onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
              >
                −
              </button>
              <span aria-live="polite">{item.quantity}</span>
              <button
                className="qty-btn"
                aria-label={`Tăng số lượng ${item.name}`}
                onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="cart-line">
              <span className="price">{formatVnd(lineTotal(item))}</span>
              <button
                className="link-btn"
                aria-label={`Xóa ${item.name} khỏi giỏ`}
                onClick={() => remove(item.lineId)}
              >
                Xóa
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Tạm tính</span>
        <strong>{formatVnd(total)}</strong>
      </div>
      <p className="muted">Giá cuối cùng sẽ được hệ thống xác nhận khi đặt đơn.</p>

      {/* TODO: nối sang /checkout khi làm bước đặt đơn */}
      <button className="btn" disabled>Đặt hàng (sắp có)</button>
    </div>
  );
}
