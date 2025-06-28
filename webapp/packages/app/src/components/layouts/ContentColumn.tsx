import React, { PropsWithChildren } from "react";

interface ContentColumnProps {}
interface ContentColumnState {}

export default class ContentColumn extends React.Component<
  PropsWithChildren<ContentColumnProps>,
  ContentColumnState
> {
  state: ContentColumnState = {};
  render() {
    return null;
  }
}
