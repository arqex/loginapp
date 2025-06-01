import React from "react";

interface NotFoundScreenProps {}
interface NotFoundScreenState {}

export default class NotFoundScreen extends React.Component<
  NotFoundScreenProps,
  NotFoundScreenState
> {
  state: NotFoundScreenState = {};
  render() {
    return "Not Found";
  }
}
