"use client";

import Canva from "@/components/canva/Canva";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="flex relative flex-1">
      <Sidebar />
      <Canva />
    </main>
  );
}
