import { cn } from "@/lib/utils";
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
          "flex flex-col  border border-solid border-gray-200 rounded-2xl shadow-sm w-[148px]",
          selected && "border-black border-2"
        )}
      >
        <div className="font-mono font-bold p-1 border-b border-solid bg-[#FAFAFE] text-center rounded-t-2xl">
          {data?.label}
        </div>
        <input
          defaultValue={defaultValues[data?.label] ?? ""}
          type="text"
          name="value"
          id="value"
          onChange={onChange}
          className="relative items-center justify-center bg-white p-2 flex rounded-b-2xl text-xs text-center focus:outline-none"
        />
      </div>
    </>
  );
}
