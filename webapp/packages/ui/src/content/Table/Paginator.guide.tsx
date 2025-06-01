import memoizeOne from "memoize-one";
import React from "react";
import { PaginatorControlsProps } from "./PaginatorControls";

interface PaginatorProps<T> {
  allItems: T[];
  children: (
    pageItems: T[],
    controlsProps: PaginatorControlsProps
  ) => React.ReactNode;
  pageSize?: number;
}
interface PaginatorState {
  currentPage: number;
}

const DEFAULT_PAGE_SIZE = 50;
export default class Paginator<T> extends React.Component<
  PaginatorProps<T>,
  PaginatorState
> {
  state: PaginatorState = {
    currentPage: 1,
  };
  render() {
    const { allItems, children, pageSize = DEFAULT_PAGE_SIZE } = this.props;
    const { currentPage } = this.state;
    const pageItems = this._getPage(allItems, currentPage, pageSize);
    return children(pageItems, {
      onNext: () => this._onNext(),
      onPrev: () => this._onPrev(),
      onPageChange: (page: number) => this._onPageChange(page),
      pageSize,
      currentPage,
      allItemsCount: allItems.length,
    });
  }

  _getPage = memoizeOne((items: T[], page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  });

  _onNext = () => {
    const { currentPage } = this.state;
    if (currentPage < this.getLastPage()) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  _onPrev = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  _onPageChange = (page: number) => {
    if (page < this.getLastPage() && page > 0) {
      this.setState({ currentPage: page });
    }
  };

  getLastPage() {
    const { allItems, pageSize = DEFAULT_PAGE_SIZE } = this.props;
    return Math.ceil(allItems.length / pageSize);
  }
}
