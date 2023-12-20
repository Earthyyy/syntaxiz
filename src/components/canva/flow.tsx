import React, { useCallback, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  ControlButton,
  Controls,
  Edge,
  IsValidConnection,
  Node,
  OnConnect,
  OnNodesDelete,
  Position,
  ReactFlowInstance,
  XYPosition,
  addEdge,
  getOutgoers,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "reactflow";

import "reactflow/dist/style.css";
import SimpleTreeNode from "./simple-tree-node";
import InputTreeNode from "./input-tree-node";
import { Network, RotateCcw } from "lucide-react";
import useDataStore from "@/hooks/use-data-store";
import { restrictChildren } from "@/utils/client";
import dagre from "@dagrejs/dagre";

const nodeTypes = {
  simpleTreeNode: SimpleTreeNode,
  inputTreeNode: InputTreeNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "simpleTreeNode",
    data: { label: "body", type: "root", value: null },
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

// Dagre Layout

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 148;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: node.width!, height: node.height! });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);

    // @ts-expect-error
    node.targetPosition = "top";
    // @ts-expect-error
    node.sourcePosition = "bottom";

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const { getNodes, getEdges } = useReactFlow();
  const resetData = useDataStore((state) => state.resetData);

  const onLayout = useCallback(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, [nodes, edges]);

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
        data: { label: content, value: null },
      };

      setNodes((nds) => nds.concat(newNode));

      if (content === "While" || content === "If") {
        const testNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: position.x - 100, y: position.y + 100 },
          data: { label: "test", value: null },
        };

        const bodyNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: position.x + 100, y: position.y + 100 },
          data: { label: "body", value: null },
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
            data: { label: "orelse", value: null },
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

      if (content === "For") {
        // Create two children , first called iter and second body, iter will have three children id , start , end
        const iterNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: position.x - 100, y: position.y + 100 },
          data: { label: "iter", value: null },
        };

        const bodyNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: position.x + 100, y: position.y + 100 },
          data: { label: "body", value: null },
        };

        const { position: iterPosition } = iterNode;

        const idNode: Node = {
          id: getId(),
          type: "inputTreeNode",
          position: { x: iterPosition.x - 100, y: iterPosition.y + 100 },
          data: { label: "Id", value: null },
        };

        const startNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: iterPosition.x + 100, y: iterPosition.y + 100 },
          data: { label: "start", value: null },
        };

        const endNode: Node = {
          id: getId(),
          type: "simpleTreeNode",
          position: { x: iterPosition.x + 300, y: iterPosition.y + 100 },
          data: { label: "end", value: null },
        };

        setNodes((nds) => nds.concat(iterNode));
        setNodes((nds) => nds.concat(startNode));
        setNodes((nds) => nds.concat(endNode));
        setNodes((nds) => nds.concat(bodyNode));
        setNodes((nds) => nds.concat(idNode));

        setEdges((eds) =>
          addEdge(
            {
              id: generateId(),
              source: newNode.id,
              target: iterNode.id,
              animated: true,
            },
            eds
          )
        );

        setEdges((eds) =>
          addEdge(
            {
              id: generateId(),
              source: iterNode.id,
              target: idNode.id,
              animated: true,
            },
            eds
          )
        );

        setEdges((eds) =>
          addEdge(
            {
              id: generateId(),
              source: iterNode.id,
              target: startNode.id,
              animated: true,
            },
            eds
          )
        );

        setEdges((eds) =>
          addEdge(
            {
              id: generateId(),
              source: iterNode.id,
              target: endNode.id,
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
      }
    },
    [reactFlowInstance, setEdges, setNodes]
  );

  const isValidConnection: IsValidConnection = useCallback(
    (connection) => {
      const nodes = getNodes();
      const edges = getEdges();

      const target = nodes.find((node) => node.id === connection.target);
      const source = nodes.find((node) => node.id === connection.source)!;
      const hasParent = edges.some((edge) => edge.target === target?.id);

      return (
        !hasParent &&
        restrictChildren(
          {
            getOutgoers,
            nodes,
            edges,
          },
          source
        )
      );
    },
    [getNodes, getEdges]
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
        isValidConnection={isValidConnection}
        onNodesDelete={onNodesDelete}
        proOptions={{
          hideAttribution: true,
        }}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        <Controls
          className="bg-gray-700 text-white"
          style={{
            background: "#1f1f1f",
          }}
        >
          <ControlButton
            onClick={() => {
              onLayout();
            }}
          >
            <Network className="dark:text-white text-black w-8 h-8 font-bold" />
          </ControlButton>
          <ControlButton
            onClick={() => {
              setNodes(initialNodes);
              setEdges(initialEdges);
              resetData();
            }}
          >
            <RotateCcw className="text-red-600 w-8 h-8 font-bold" />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default Flow;
