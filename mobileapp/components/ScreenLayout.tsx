import React, { Children } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

interface ScreenLayoutProps {
  align?: "center" | "flex-start" | "flex-end";
  children: React.ReactNode;
}

export default function ScreenLayout({
  children,
  align = "center",
}: ScreenLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: align,
        rowGap: 10,
      }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
