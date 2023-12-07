"use client";
import {
  getOutgoers,
  useEdges,
  useNodes,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import { Button, buttonVariants } from "../ui/button";
import { Play, ListTree, Leaf, Loader2, Github } from "lucide-react";
import { useCallback } from "react";
import { type Node } from "reactflow";
import { useMutation } from "react-query";
import axios from "axios";
import useDataStore from "@/hooks/use-data-store";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../ui/mode-toggle";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type NodeData = {
  label: string;
  value: string;
  children: Node[];
};

const Navbar = () => {
  return (
    <nav className="h-[3.75rem] w-full flex justify-center items-center py-3 px-6 border-b ">
      <div className="flex items-center justify-between w-full">
        <a href="#" className="flex items-center justify-center gap-2">
          <Leaf className="w-7 h-7 fill-none" />
          <span className="text-lg font-bold">Syntaxiz</span>
        </a>

        <div className="flex gap-2 items-center justify-center">
          <a
            href="https://github.com/Earthyyy/syntaxiz"
            target="_blank"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
              className: "w-8 h-8",
            })}
          >
            <GitHubLogoIcon className="w-4 h-4" />
          </a>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
