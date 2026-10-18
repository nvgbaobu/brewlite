import Link from "next/link";
import { ApiError, getProduct } from "@/lib/api";
import { formatVnd } from "@/lib/format";
import { AddToCartButton } from "@/components/AddToCartButton";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return (
      <article>
        <Link href="/">← Quay lại menu</Link>
        <h1 style={{ fontSize: "1.6rem", margin: "12px 0 8px" }}>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">{formatVnd(product.basePrice)}</p>
        {/* TODO Sprint 2: chọn size, topping trước khi thêm vào giỏ */}
        <AddToCartButton product={product} />
      </article>
    );
  } catch (error) {
    const notFound = error instanceof ApiError && error.status === 404;
    return (
      <div className="state" role="alert">
        <h2>{notFound ? "Không tìm thấy sản phẩm" : "Không tải được sản phẩm"}</h2>
        {!notFound && <p>Kiểm tra kết nối rồi thử lại.</p>}
        <Link href="/">Về trang menu</Link>
      </div>
    );
  }
}
