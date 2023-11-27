"use client";
import { FC } from "react";
interface ListItemProps {
  content: string;
  handler: (event: any, nodeType: any, nodeContent: string) => void;
  leaf: boolean;
}

const ListItem: FC<ListItemProps> = ({ content, handler, leaf }) => {
  return (
    <li
      className="h-[33px] hover:bg-accordion-hover rounded px-2 py-2 cursor-grab text-accordion hover:text-accordion-foreground"
      draggable
      onDragStart={(event) =>
        handler(event, leaf ? "inputTreeNode" : "simpleTreeNode", content)
      }
    >
      {content}
    </li>
  );
};

export default ListItem;
