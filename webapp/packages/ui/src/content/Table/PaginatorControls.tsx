import React from "react";
import IconButton from "../../buttons/IconButton.guide";
import HStack from "../../layout/HStack.guide";
import { Chevron } from "../../icons/svg";

export interface PaginatorControlsProps {
  onNext: () => void;
  onPrev: () => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  currentPage: number;
  allItemsCount: number;
}
interface PaginatorControlsState {}

export default class PaginatorControls extends React.Component<
  PaginatorControlsProps,
  PaginatorControlsState
> {
  state: PaginatorControlsState = {};
  render() {
    const { currentPage, allItemsCount, pageSize, onPrev, onNext } = this.props;
    const first = (currentPage - 1) * pageSize + 1;
    const last = Math.min(first + pageSize - 1, allItemsCount);
    const lastPage = Math.ceil(allItemsCount / pageSize);
    return (
      <HStack alignItems="center">
        <span style={{ fontSize: 14 }}>
          {first} - {last} of {allItemsCount}
        </span>
        <IconButton
          onClick={onPrev}
          disabled={currentPage <= 1}
          size="sm"
          direction="back"
        >
          <Chevron />
        </IconButton>
        <IconButton
          onClick={onNext}
          disabled={currentPage >= lastPage}
          size="sm"
          direction="forward"
        >
          <Chevron />
        </IconButton>
      </HStack>
    );
  }
}
