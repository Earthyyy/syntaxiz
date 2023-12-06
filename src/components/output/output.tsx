import { ScrollArea } from "@/components/ui/scroll-area";
import useDataStore from "@/hooks/use-data-store";

const Output = () => {
  const data = useDataStore((state) => state.data);
  return (
    <div className="w-1/3 bg-white border-l p-4 flex flex-col gap-2">
      <header>
        <h2 className="text-2xl font-semibold">Output</h2>
      </header>
      <ScrollArea className="rounded-sm flex-1 p-4 bg-zinc-950">
        <pre className="text-xs text-white p-2">{data?.response}</pre>
      </ScrollArea>
    </div>
  );
};

export default Output;