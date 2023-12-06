"use client";
import {
  getOutgoers,
  useEdges,
  useNodes,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import { Button } from "../ui/button";
import { Play, ListTree, Leaf, Loader2 } from "lucide-react";
import { useCallback } from "react";
import { type Node } from "reactflow";
import { useMutation } from "react-query";
import axios from "axios";
import useDataStore from "@/hooks/use-data-store";
import { cn } from "@/lib/utils";

type NodeData = {
  label: string;
  value: string;
  children: Node[];
};

const Navbar = () => {
  const store = useReactFlow();
  const updateData = useDataStore((state) => state.updateData);
  const { getNodes, getEdges } = store;

  const { mutate: assemblify, isLoading } = useMutation({
    mutationKey: "assemblify",
    mutationFn: async () => {
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
          children: children
            .map((child) => generateTree(child))
            .filter(Boolean),
        };
      }

      const request = {
        payload: generateTree(getNodes()[0]),
      };

      const { data } = await axios.post("/api/assemblify", request);

      return data;
    },
    onSuccess: (data) => {
      updateData(data);
    },
  });

  return (
    <nav className="h-[3.75rem] w-full flex justify-center items-center py-3 px-6 border-b ">
      <div className="flex items-center justify-between w-full">
        <a href="#" className="flex items-center justify-center gap-1">
          <Leaf className="w-7 h-7 mr-1 text-[#306844]" />
          <span className="text-2xl font-normal">syntaxiz</span>
        </a>
        <Button className="" onClick={() => assemblify()} disabled={isLoading}>
          <Play
            className={cn("w-4 h-4 mr-2", isLoading ? "hidden" : "block")}
          />
          <Loader2
            className={cn(
              "w-4 h-4 mr-2 animate-spin",
              isLoading ? "block" : "hidden"
            )}
          />
          Generate Code
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
