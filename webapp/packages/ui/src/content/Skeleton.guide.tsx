import React from "react";
import { Skeleton as S, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

interface SkeletonProps {
  lines?: number;
  size?: string;
  height?: string;
}

export default class Skeleton extends React.Component<SkeletonProps> {
  render() {
    const { lines, size, height } = this.props;

    if (lines) {
      return <SkeletonText noOfLines={lines} />;
    }
    if (size) {
      return <SkeletonCircle size={size} />;
    }
    return <S height={height} />;
  }
}
