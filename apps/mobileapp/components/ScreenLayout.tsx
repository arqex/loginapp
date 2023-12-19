import React, { Children } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { getApiCacher } from "../application/stores/apiCacher";
import { getUIStore } from "../application/stores/uiStore";
import { StackNavigationProp } from "@react-navigation/stack";

interface ScreenLayoutProps {
  align?: "center" | "flex-start" | "flex-end";
  children: React.ReactNode;
}

export default class ScreenLayout extends React.Component<
  ScreenLayoutProps,
  {}
> {
  render() {
    const { children, align = "center" } = this.props;
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
}
