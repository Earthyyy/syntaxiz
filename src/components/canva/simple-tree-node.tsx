import { cn } from "@/lib/utils";
import { Handle, NodeProps, Position } from "reactflow";

type NodeData = {
  label: string;
  type: "root" | "node" | "leaf";
};

export default function SimpleTreeNode({
  data,
  selected,
}: NodeProps<NodeData>) {
  return (
    <>
      {data?.type !== "root" && (
        <Handle type="target" position={Position.Top} />
      )}
      <div
        className={cn(
          "flex flex-col  items-center justify-center font-mono font-bold border border-solid border-gray-200 rounded-2xl bg-[#FAFAFE]  shadow-sm w-[148px] min-h-[2.25rem]",
          selected && "border-black border-2"
        )}
      >
        {data?.label}
      </div>
      {data?.type !== "leaf" && (
        <Handle type="source" position={Position.Bottom} id="a" />
      )}
    </>
  );
}
