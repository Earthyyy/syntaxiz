"use client";

import { cn } from "@/lib/utils";
import { Check, CopyIcon } from "lucide-react";
import { FC, useState } from "react";

interface ClipBoardButtonProps {
  output: any;
}

const ClipBoardButton: FC<ClipBoardButtonProps> = ({ output }) => {
  const [isCopying, setIsCopying] = useState(false);

  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-[.25rem] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-6 w-6  absolute right-4 top-4 dark:hover:bg-zinc-700 hover:bg-zinc-200"
      onClick={() => {
        setIsCopying(true);
        navigator.clipboard.writeText(output);
        setTimeout(() => {
          setIsCopying(false);
        }, 1000);
      }}
    >
      <span className="sr-only">Copy</span>
      <CopyIcon
        className={cn(
          "h-3 w-3 transition-all",
          isCopying ? "hidden opacity-0" : "block opacity-100"
        )}
      />

      <Check
        className={`h-3 w-3 transition-all ${
          isCopying ? "block opacity-100" : "hidden opacity-0"
        }`}
      />
    </button>
  );
};

export default ClipBoardButton;
