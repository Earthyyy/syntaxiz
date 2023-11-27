import React from "react";
import ReactFlow, { Background } from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 200, y: 200 }, data: { label: "body" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const Canva = () => {
  return (
    <div className="flex-1 border-l">
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Canva;
