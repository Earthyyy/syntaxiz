import { cn } from "@/lib/utils";
import { useEffect } from "react";
import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  useStoreApi,
} from "reactflow";

type NodeData = {
  label: "Id" | "Constant" | "Op";
  type: "root" | "node" | "leaf";
};

const defaultValues = {
  Id: "x",
  Constant: 50,
  Op: "+",
};

export default function InputTreeNode({
  data,
  selected,
  id,
}: NodeProps<NodeData>) {
  const reactFlow = useReactFlow();
  const { setNodes } = reactFlow;

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              value: defaultValues[data?.label] ?? "",
            },
          };
        }
        return node;
      })
    );
  }, []);

  const onChange = (event: any) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              value: event.target.value,
            },
          };
        }
        return node;
      })
    );
  };

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div
        className={cn(
          "flex flex-col border border-solid border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm w-[148px]",
          selected && "border-black dark:border-gray-200 border-2"
        )}
      >
        <div className="font-mono font-bold p-1 border-b border-solid bg-[#FAFAFE] dark:bg-[#09090b]  text-center rounded-t-2xl">
          {data?.label}
        </div>
        <input
          defaultValue={defaultValues[data?.label] ?? ""}
          type="text"
          name="value"
          id="value"
          onChange={onChange}
          className="relative items-center justify-center bg-white p-2 flex rounded-b-2xl text-xs text-center focus:outline-none dark:bg-black"
        />
      </div>
    </>
  );
}
