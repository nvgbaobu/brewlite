import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { MenuView } from "./MenuView";
import * as api from "@/lib/api";
import { mockProducts } from "@/mocks/products";

vi.mock("@/lib/api");

describe("MenuView", () => {
  beforeEach(() => vi.resetAllMocks());

  it("hiển thị danh sách sản phẩm", async () => {
    vi.mocked(api.getProducts).mockResolvedValue(mockProducts);
    render(<MenuView />);
    expect(await screen.findByText("Cà phê sữa đá")).toBeInTheDocument();
    expect(screen.getByText("Tạm hết hàng")).toBeInTheDocument();
  });

  it("hiển thị trạng thái trống", async () => {
    vi.mocked(api.getProducts).mockResolvedValue([]);
    render(<MenuView />);
    expect(await screen.findByText("Menu đang trống")).toBeInTheDocument();
  });

  it("hiển thị lỗi và cho phép tải lại", async () => {
    vi.mocked(api.getProducts).mockRejectedValueOnce(new Error("x"));
    render(<MenuView />);
    expect(await screen.findByRole("alert")).toBeInTheDocument();

    vi.mocked(api.getProducts).mockResolvedValue(mockProducts);
    await userEvent.click(screen.getByRole("button", { name: "Tải lại menu" }));
    await waitFor(() => expect(screen.getByText("Cà phê sữa đá")).toBeInTheDocument());
  });
});
