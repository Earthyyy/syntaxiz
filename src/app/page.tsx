"use client";

import Canva from "@/components/canva/canva";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <main className="flex relative flex-1">
      <ReactFlowProvider>
        <Sidebar />
        <Canva />
      </ReactFlowProvider>
    </main>
  );
}
