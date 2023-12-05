"use client";

import Flow from "@/components/canva/flow";
import Output from "@/components/output/output";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <main className="flex relative flex-1">
      <Sidebar />
      <Flow />
      <Output />
    </main>
  );
}
