"use client";
import {
  getOutgoers,
  useEdges,
  useNodes,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import { Button } from "../ui/button";
import { Play, ListTree, Leaf } from "lucide-react";
import { useCallback } from "react";
import { type Node } from "reactflow";

type NodeData = {
  label: string;
  value: string;
  children: Node[];
};

const Navbar = () => {
  const store = useReactFlow();
  const { getNodes, getEdges } = store;

  const onClick = useCallback(() => {
    const visited = new Set();

    function generateTree(root: Node<NodeData>): any {
      if (visited.has(root.id)) {
        return null;
      }

      visited.add(root.id);

      const children = getOutgoers(root, getNodes(), getEdges());
      return {
        node: root.data.label.toLowerCase(),
        value: root.data?.value,
        children: children.map((child) => generateTree(child)).filter(Boolean),
      };
    }

    console.log(generateTree(getNodes()[0]));
  }, [getEdges, getNodes]);

  return (
    <nav className="h-[3.75rem] w-full flex justify-center items-center py-3 px-6 border-b ">
      <div className="flex items-center justify-between w-full">
        <a href="#" className="flex items-center justify-center gap-1">
          <Leaf className="w-7 h-7 mr-1 text-[#306844]" />
          <span className="text-2xl font-normal">syntaxiz</span>
        </a>
        <Button className="" onClick={onClick}>
          <Play className="w-4 h-4 mr-2" />
          Generate Code
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
