import type { Product } from "@/lib/types";

export const mockProducts: Product[] = [
  { id: "1", name: "Cà phê sữa đá", description: "Cà phê phin đậm vị, sữa đặc, đá.", basePrice: 29000, category: "Cà phê", isAvailable: true },
  { id: "2", name: "Bạc xỉu", description: "Nhiều sữa, ít cà phê, vị ngọt dịu.", basePrice: 32000, category: "Cà phê", isAvailable: true },
  { id: "3", name: "Trà đào cam sả", description: "Trà đen, đào miếng, cam và sả tươi.", basePrice: 45000, category: "Trà", isAvailable: true },
  { id: "4", name: "Trà sữa trân châu", description: "Trà sữa béo nhẹ, trân châu nấu mỗi ngày.", basePrice: 42000, category: "Trà sữa", isAvailable: false },
];
