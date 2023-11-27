import { Handle, NodeProps, Position } from "reactflow";

type NodeData = {
  label: string;
  type: "root" | "node" | "leaf";
};

export default function InputTreeNode({ data }: NodeProps<NodeData>) {
  return (
    <>
      {data?.type !== "root" && (
        <Handle type="target" position={Position.Top} />
      )}
      <div className="flex flex-col  border border-solid border-gray-200 rounded-2xl shadow-sm w-[148px]">
        <div className="font-mono font-bold p-1 border-b border-solid bg-[#FAFAFE] text-center rounded-t-2xl">
          {data?.label}
        </div>
        <input
          defaultValue={"50"}
          type="text"
          name="value"
          id="value"
          className="relative items-center justify-center bg-white p-2 flex rounded-b-2xl text-xs text-center focus:outline-none"
        />
      </div>
      {data?.type !== "leaf" && (
        <Handle type="source" position={Position.Bottom} id="a" />
      )}
    </>
  );
}
