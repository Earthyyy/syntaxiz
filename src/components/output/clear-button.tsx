import React from "react";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";

import useDataStore from "@/hooks/use-data-store";

const ClearButton = () => {
  const updateData = useDataStore((state) => state.updateData);

  return (
    <Button variant={"ghost"} size={"icon"} onClick={() => updateData("")}>
      <Trash className="w-4 h-4 text-red-600" />
    </Button>
  );
};

export default ClearButton;
