import React, { PropsWithChildren } from "react";
import { Heading as H, HeadingProps as HProps } from "@chakra-ui/react";

interface HeadingProps extends Omit<HProps, "size"> {
  size?: "xs" | "sm" | "md" | "lg";
  color?: "";
}

const sizes = {
  xs: "md",
  sm: "2xl",
  md: "4xl",
  lg: "5xl",
};

export default function Heading({
  children,
  size = "md",
  ...other
}: PropsWithChildren<HeadingProps>) {
  return (
    <H {...other} fontWeight="700" size={sizes[size]}>
      {children}
    </H>
  );
}
