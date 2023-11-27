"use client";

import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="flex relative flex-1">
      <Sidebar />
      <div className="flex-1 border-l"></div>
    </main>
  );
}
