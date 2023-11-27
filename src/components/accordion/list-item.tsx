"use client";
import { FC } from "react";
interface ListItemProps {
  content: string;
}

const ListItem: FC<ListItemProps> = ({ content }) => {
  return (
    <li className="h-[33px] hover:bg-accordion-hover rounded px-2 py-2 cursor-grab text-accordion hover:text-accordion-foreground">
      {content}
    </li>
  );
};

export default ListItem;
