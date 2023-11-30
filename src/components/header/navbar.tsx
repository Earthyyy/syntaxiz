"use client";
import { getOutgoers, useEdges, useNodes, useStoreApi } from "reactflow";
import { Button } from "../ui/button";
import { Play, ListTree, Leaf } from "lucide-react";
import { useCallback } from "react";

const Navbar = () => {
  const store = useStoreApi();

  const onClick = useCallback(() => {
    const { getNodes, edges } = store.getState();
    console.log(getNodes());
    console.log(edges);
  }, [store]);

  return (
    <nav className="h-[3.75rem] w-full flex justify-center items-center py-3 px-6 border-b ">
      <div className="flex items-center justify-between w-full">
        <a href="#" className="flex items-center justify-center gap-1">
          <Leaf className="w-7 h-7 mr-1 text-[#306844]" />
          <span className="text-2xl font-normal">syntaxiz</span>
        </a>
        <Button className="" onClick={onClick}>
          <Play className="w-4 h-4 mr-2" />
          Generate Code
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
