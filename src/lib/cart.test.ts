import { describe, expect, it } from "vitest";
import {
  MAX_QUANTITY, addItem, cartCount, cartTotal, makeLineId, removeItem, setQuantity,
} from "./cart";
import { mockProducts } from "@/mocks/products";

const [coffee, bacXiu] = mockProducts;

describe("cart", () => {
  it("thêm sản phẩm mới", () => {
    const items = addItem([], coffee);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ productId: "1", quantity: 1, unitPrice: 29000 });
  });

  it("gộp dòng khi cùng sản phẩm và cùng tùy chọn", () => {
    const items = addItem(addItem([], coffee), coffee);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("tách dòng khi khác size hoặc topping", () => {
    let items = addItem([], coffee, { size: "M" });
    items = addItem(items, coffee, { size: "L" });
    items = addItem(items, coffee, { size: "L", toppings: ["pearl"] });
    expect(items).toHaveLength(3);
  });

  it("thứ tự topping không ảnh hưởng lineId", () => {
    expect(makeLineId("1", "M", ["a", "b"])).toBe(makeLineId("1", "M", ["b", "a"]));
  });

  it("giới hạn số lượng tối đa", () => {
    const items = addItem([], coffee, { quantity: 100 });
    expect(items[0].quantity).toBe(MAX_QUANTITY);
  });

  it("đổi số lượng, và số lượng 0 thì xóa dòng", () => {
    let items = addItem([], coffee);
    items = setQuantity(items, items[0].lineId, 3);
    expect(items[0].quantity).toBe(3);
    items = setQuantity(items, items[0].lineId, 0);
    expect(items).toHaveLength(0);
  });

  it("xóa dòng", () => {
    let items = addItem(addItem([], coffee), bacXiu);
    items = removeItem(items, items[0].lineId);
    expect(items.map((i) => i.productId)).toEqual(["2"]);
  });

  it("tính tổng số lượng và tổng tiền", () => {
    let items = addItem([], coffee, { quantity: 2 }); // 2 x 29.000
    items = addItem(items, bacXiu); // 1 x 32.000
    expect(cartCount(items)).toBe(3);
    expect(cartTotal(items)).toBe(90000);
  });

  it("không làm thay đổi mảng gốc", () => {
    const original = addItem([], coffee);
    addItem(original, coffee);
    expect(original[0].quantity).toBe(1);
  });
});
