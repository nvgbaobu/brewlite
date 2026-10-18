import { MenuView } from "@/components/MenuView";

export default function HomePage() {
  return (
    <>
      <h1 style={{ fontSize: "1.5rem", marginBottom: 16 }}>Hôm nay bạn uống gì?</h1>
      <MenuView />
    </>
  );
}
