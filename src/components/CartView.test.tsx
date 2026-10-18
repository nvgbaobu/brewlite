import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CartProvider } from "./CartProvider";
import { CartView } from "./CartView";
import { formatVnd } from "@/lib/format";

const KEY = "brewlite.cart.v1";

function renderCart() {
  return render(
    <CartProvider>
      <CartView />
    </CartProvider>,
  );
}

describe("CartView", () => {
  beforeEach(() => window.localStorage.clear());

  it("hiển thị giỏ trống", async () => {
    renderCart();
    expect(await screen.findByText("Giỏ hàng đang trống")).toBeInTheDocument();
  });

  it("hiển thị món, tổng tiền và cập nhật khi tăng số lượng", async () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        { lineId: "1||", productId: "1", name: "Cà phê sữa đá", unitPrice: 29000, quantity: 2 },
      ]),
    );
    renderCart();

    expect(await screen.findByText("Cà phê sữa đá")).toBeInTheDocument();
    expect(screen.getAllByText(formatVnd(58000)).length).toBeGreaterThan(0);

    await userEvent.click(screen.getByRole("button", { name: "Tăng số lượng Cà phê sữa đá" }));
    expect(screen.getAllByText(formatVnd(87000)).length).toBeGreaterThan(0);
  });

  it("xóa món thì quay về giỏ trống", async () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify([
        { lineId: "1||", productId: "1", name: "Cà phê sữa đá", unitPrice: 29000, quantity: 1 },
      ]),
    );
    renderCart();
    await userEvent.click(await screen.findByRole("button", { name: "Xóa Cà phê sữa đá khỏi giỏ" }));
    expect(screen.getByText("Giỏ hàng đang trống")).toBeInTheDocument();
  });

  it("bỏ qua dữ liệu hỏng trong localStorage", async () => {
    window.localStorage.setItem(KEY, "{không phải json");
    renderCart();
    expect(await screen.findByText("Giỏ hàng đang trống")).toBeInTheDocument();
  });
});
