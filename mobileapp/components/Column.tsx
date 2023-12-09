import React, { Children } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import memoizeOne from "memoize-one";

interface ColumnProps {
  gap?: number;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export default function Column({ gap = 0, style, children }: ColumnProps) {
  const mergedStyles = generateStyles(gap, style);
  return <View style={mergedStyles}>{children}</View>;
}

const generateStyles = memoizeOne((gap: number, style?: any) => {
  return {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    rowGap: gap,
    ...(style || {}),
  };
});
