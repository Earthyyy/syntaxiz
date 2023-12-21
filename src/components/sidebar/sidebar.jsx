"use client";
import ListItem from "@/components/sidebar/accordion/list-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const onDragStart = (event, nodeType, nodeContent) => {
    event.dataTransfer.setData("application/reactflow#type", nodeType);
    event.dataTransfer.setData("application/reactflow#content", nodeContent);
    event.dataTransfer.effectAllowed = "move";
  };
  return (
    <div
      style={{
        padding: "1rem",
        width: "248px",
      }}
    >
      <Accordion type="multiple" collapsible="true">
        <AccordionItem value="operations">
          <AccordionTrigger className="dark:hover:bg-[#212225] dark:hover:text-white dark:text-gray-400 mb-2 h-[33px] text-accordion hover:text-accordion-foreground">
            Operations
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <ListItem content="BinOp" handler={onDragStart} />
              <ListItem content="BoolOp" handler={onDragStart} />
              <ListItem content="Assign" handler={onDragStart} />
              <ListItem content="Compare" handler={onDragStart} />
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="flow-control">
          <AccordionTrigger className="dark:hover:bg-[#212225] dark:hover:text-white dark:text-gray-400 mb-2 h-[33px] text-accordion hover:text-accordion-foreground">
            Flow Control
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <ListItem content="If" handler={onDragStart} />
              <ListItem content="While" handler={onDragStart} />
              <ListItem content="For" handler={onDragStart} />
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="leaf-nodes">
          <AccordionTrigger className="dark:hover:bg-[#212225] dark:hover:text-white dark:text-gray-400 mb-2 h-[33px] text-accordion hover:text-accordion-foreground">
            Leaf Nodes
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <ListItem content="Id" leaf handler={onDragStart} />
              <ListItem content="Constant" leaf handler={onDragStart} />
              <ListItem content="Op" leaf handler={onDragStart} />
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
