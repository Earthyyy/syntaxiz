import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  ReactFlowInstance,
  XYPosition,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";

import "reactflow/dist/style.css";
import SimpleTreeNode from "./simple-tree-node";
import InputTreeNode from "./input-tree-node";

const nodeTypes = {
  simpleTreeNode: SimpleTreeNode,
  inputTreeNode: InputTreeNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "simpleTreeNode",
    data: { label: "body", type: "root" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    type: "inputTreeNode",
    data: { label: "id", type: "node" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const Canva = () => {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) as XYPosition;
      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div className="flex-1 border-l">
      <ReactFlow
        nodes={nodes}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        edges={edges}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
      >
        {/* @ts-ignore */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Canva;
