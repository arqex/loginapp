import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";

interface SidebarNavigationGroupProps {
  isOpen: boolean;
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function SidebarNavigationGroup(
  props: SidebarNavigationGroupProps
) {
  return (
    <Accordion index={props.isOpen ? 0 : undefined}>
      <AccordionItem>
        <AccordionButton>
          {props.header}
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>{props.children}</AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
