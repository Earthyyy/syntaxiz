import React from "react";
import { Button } from "../ui/button";
import { Loader2, Play } from "lucide-react";
import { Node, getOutgoers, useReactFlow } from "reactflow";
import axios from "axios";
import useDataStore from "@/hooks/use-data-store";
import { useMutation } from "react-query";
import { cn } from "@/lib/utils";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

type NodeData = {
  label: string;
  value: string;
  children: Node[];
};

const RunButton = () => {
  const store = useReactFlow();
  const { toast } = useToast();
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
    onError: () => {
      toast({
        title: "Something went wrong!",
        description:
          "Make sure that the AST is valid.\nIf the problem persists, please open an issue on GitHub.",
        variant: "destructive",
        duration: 3000,
      });
    },
  });
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() => assemblify()}
      disabled={isLoading}
    >
      <Play className={cn("h-4 w-4", isLoading ? "hidden" : "block")} />
      <Loader2
        className={cn(
          "w-4 h-4 mr-2 animate-spin",
          isLoading ? "block" : "hidden"
        )}
      />
    </Button>
  );
};

export default RunButton;
