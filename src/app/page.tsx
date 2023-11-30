"use client";

import Flow from "@/components/canva/flow";
import Sidebar from "@/components/sidebar/sidebar";
import { ReactFlowProvider } from "reactflow";

export default function Home() {
  return (
    <main className="flex relative flex-1">
      <ReactFlowProvider>
        <Sidebar />
        <Flow />
      </ReactFlowProvider>
    </main>
  );
}
