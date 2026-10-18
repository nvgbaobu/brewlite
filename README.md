# BrewLite Web (`apps/web`)

Next.js (App Router) + TypeScript, mobile-first.

## Chạy local
```bash
cd apps/web
cp .env.example .env.local   # mặc định NEXT_PUBLIC_USE_MOCK=true (chưa cần API)
npm install
npm run dev                  # http://localhost:3000
```
Khi backend sẵn sàng: đặt `NEXT_PUBLIC_USE_MOCK=false` và `NEXT_PUBLIC_API_URL` trỏ tới NestJS API.

## Lưu ý phiên bản
Giữ **TypeScript 5.7.2** (đã ghim trong `package.json`). Bản TypeScript 7 làm hỏng build với Next.js 15.0.4.

## Lệnh
| Lệnh | Mục đích |
|---|---|
| `npm run lint` | ESLint |
| `npm test` | Vitest + Testing Library |
| `npm run build` | Build production |

## Cấu trúc
```
src/
  app/            # route: / (menu), /products/[id] (chi tiết), /cart (giỏ hàng)
  components/     # MenuView, ProductCard, giỏ hàng (CartProvider, CartView, AddToCartButton, CartLink)
  lib/            # api.ts (gọi API), types.ts, format.ts, cart.ts (logic giỏ hàng)
  mocks/          # dữ liệu mẫu khi chưa có API
```

## Docker
```bash
docker build -t brewlite-web --build-arg NEXT_PUBLIC_API_URL=http://localhost:4000 .
docker run -p 3000:3000 brewlite-web
```
