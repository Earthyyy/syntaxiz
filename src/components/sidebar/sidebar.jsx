"use client";
import ListItem from "@/components/sidebar/accordion/list-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
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
          <AccordionTrigger className="mb-2 h-[33px] text-accordion hover:text-accordion-foreground">
            Operations
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <ListItem content="BinOp" handler={onDragStart} />
              <ListItem content="BoolOp" handler={onDragStart} />
              <ListItem content="UnaryOp" handler={onDragStart} />
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="flow-control">
          <AccordionTrigger className="mb-2 h-[33px] text-accordion hover:text-accordion-foreground">
            Flow Control
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <ListItem content="If" />
              <ListItem content="While" />
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="terminal-units">
          <AccordionTrigger className="mb-2 h-[33px] text-accordion hover:text-accordion-foreground">
            Terminal Units
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <ListItem content="Id" />
              <ListItem content="Constant" />
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Sidebar;
