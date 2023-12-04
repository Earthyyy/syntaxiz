"use client";

import Flow from "@/components/canva/flow";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="flex relative flex-1">
      <Sidebar />
      <Flow />
    </main>
  );
}
