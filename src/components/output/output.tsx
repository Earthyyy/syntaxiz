import { ScrollArea } from "@/components/ui/scroll-area";
import useDataStore from "@/hooks/use-data-store";
import ClipBoardButton from "@/components/ui/clipboard-button";
import RunButton from "./run-button";
import ClearButton from "./clear-button";

const Output = () => {
  const data = useDataStore((state) => state.data);
  return (
    <div className="w-1/3 dark:bg-[#09090b] border-l py-4 px-6 flex flex-col gap-2">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Output</h2>
        <div className="flex items-center justify-center gap-2">
          <RunButton />
          <ClearButton />
        </div>
      </header>
      <ScrollArea className="border rounded-lg flex-1 p-4 bg-zinc-50 dark:bg-zinc-950 overflow-auto">
        <ClipBoardButton output={data?.response} />
        <pre className="text-xs text-black dark:text-white p-2 max-h-96">
          {data?.response}
        </pre>
      </ScrollArea>
    </div>
  );
};

export default Output;
