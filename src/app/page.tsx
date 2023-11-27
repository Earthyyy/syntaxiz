import { Button } from "@/components/ui/button";
import { Play, Loader2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Button>
        <Play className="w-4 h-4 mr-2" />
        Generate Code
      </Button>
    </main>
  );
}
