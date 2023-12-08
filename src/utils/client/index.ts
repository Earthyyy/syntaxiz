import { Edge, Node } from "reactflow";
import { COMPONENTS } from "../constants";

interface NodeData {
  label: string;
}

export const restrictChildren = (
  context: {
    getOutgoers: (
      node: Node<NodeData>,
      nodes: Node<NodeData>[],
      edges: Edge[]
    ) => Node<NodeData>[];
    nodes: Node<NodeData>[];
    edges: Edge[];
  },
  node: Node
) => {
  const { getOutgoers, nodes, edges } = context;

  switch (node.data.label) {
    case COMPONENTS.ASSIGN:
      return getOutgoers(node, nodes, edges).length < 2;
    case COMPONENTS.BIN_OP:
      return getOutgoers(node, nodes, edges).length < 3;
    case COMPONENTS.IF:
      return getOutgoers(node, nodes, edges).length < 3;
    case COMPONENTS.WHILE:
      return getOutgoers(node, nodes, edges).length < 3;
    case COMPONENTS.COMPARE:
      return getOutgoers(node, nodes, edges).length < 3;
    case COMPONENTS.BOOL_OP:
      return getOutgoers(node, nodes, edges).length < 3;

    default:
      return true;
  }
};
