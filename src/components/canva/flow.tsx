import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Connection,
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnNodesDelete,
  ReactFlowInstance,
  XYPosition,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
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
];

const initialEdges: Edge[] = [];

let id = 0;
const getId = () => `dndnode_${id++}`;
const generateId = () => {
  const id = Math.random().toString(36).substr(2, 9);
  return id;
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const onDragOver: React.DragEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) => {
      const deletedIds = deleted.map((node) => node.id);
      const descendantIds: string[] = [];

      function findDescendants(nodeIds: string[]) {
        // TODO: remove the second filter when you force the tree structure
        let temp = edges
          .filter((edge) => nodeIds.includes(edge.source))
          .map((edge) => edge.target)
          .filter((nodeId) => !descendantIds.includes(nodeId));

        if (temp.length > 0) {
          descendantIds.push(...temp);
          findDescendants(temp);
        }
      }

      findDescendants(deletedIds);

      const allIds = [...deletedIds, ...descendantIds];

      const newNodes = nodes.filter((node) => !allIds.includes(node.id));

      const newEdges = edges.filter(
        (edge) => !allIds.includes(edge.source) && !allIds.includes(edge.target)
      );

      setNodes(newNodes);
      setEdges(newEdges);
    },
    [nodes, edges]
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow#type");
      const content = event.dataTransfer.getData(
        "application/reactflow#content"
      );

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance?.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      }) as XYPosition;

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { label: content },
      };

      setNodes((nds) => nds.concat(newNode));

      if (content === "While" || content === "If") {
        const testNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: position.x - 100, y: position.y + 100 },
          data: { label: "test" },
        };

        const bodyNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: position.x + 100, y: position.y + 100 },
          data: { label: "body" },
        };

        setNodes((nds) => nds.concat(testNode));
        setNodes((nds) => nds.concat(bodyNode));

        setEdges((eds) =>
          addEdge(
            {
              id: generateId(),
              source: newNode.id,
              target: testNode.id,
              animated: true,
            },
            eds
          )
        );
        setEdges((eds) =>
          addEdge(
            {
              id: generateId(),
              source: newNode.id,
              target: bodyNode.id,
              animated: true,
            },
            eds
          )
        );

        if (content === "If") {
          const orelseNode: Node = {
            id: getId(),
            type: "simpleTreeNode",
            position: { x: position.x + 300, y: position.y + 100 },
            data: { label: "orelse" },
          };

          setNodes((nds) => nds.concat(orelseNode));
          setEdges((eds) =>
            addEdge(
              {
                id: generateId(),
                source: newNode.id,
                target: orelseNode.id,
                animated: true,
              },
              eds
            )
          );
        }
      }
    },
    [reactFlowInstance, setEdges, setNodes]
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
        deleteKeyCode={"Delete"}
        onNodesDelete={onNodesDelete}
        proOptions={{
          hideAttribution: true,
        }}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Flow;
