import React from "react";
import classNames from "classnames";
import styles from "./SecondaryPanel.module.css";
import { IconButton } from "@loginapp/ui";
import { Close } from "@loginapp/ui/src/icons/svg";

interface SecondaryPanelProps {
  children: React.ReactNode;
  width: number;
  onResize: (width: number) => void;
  onCloseRequest?: () => void;
}
interface SecondaryPanelState {
  isResizing: boolean;
  resizeStartX: number;
  resizeWidth: number;
}

export default class SecondaryPanel extends React.Component<
  SecondaryPanelProps,
  SecondaryPanelState
> {
  state: SecondaryPanelState = {
    isResizing: false,
    resizeStartX: 0,
    resizeWidth: 0,
  };
  render() {
    const { width, children } = this.props;
    const { isResizing, resizeWidth } = this.state;
    const cns = classNames(
      styles.wrapper,
      isResizing && styles.resizing,
      !children && styles.collapsed
    );

    const containerWidth = isResizing ? resizeWidth : width;
    return (
      <div className={cns} style={{ width: containerWidth }}>
        <div className={styles.closeButton}>
          <IconButton
            className={styles.closeButton}
            onClick={this.props.onCloseRequest}
            size="sm"
          >
            <Close />
          </IconButton>
        </div>
        <div className={styles.resizer} onMouseDown={this._startResizing} />
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    );
  }

  _dragHandler?: (e: MouseEvent) => void;

  _startResizing = (e: MouseEvent) => {
    this.setState({
      isResizing: true,
      resizeStartX: e.clientX,
      resizeWidth: this.props.width,
    });
    this._dragHandler = (e: MouseEvent) => {
      if (!this.state.isResizing) return;
      this.setResizingWidth(e.clientX);
    };
    window.addEventListener("mousemove", this._dragHandler);
    window.addEventListener("mouseup", this._stopResizing);
  };

  _stopResizing = (e: MouseEvent) => {
    window.removeEventListener("mousemove", this._dragHandler!);
    window.removeEventListener("mouseup", this._stopResizing);

    const { resizeStartX } = this.state;
    const { width } = this.props;
    if (!resizeStartX) return;
    const diff = e.clientX - resizeStartX;
    this.props.onResize(width - diff);

    setTimeout(() => {
      this.setState({ isResizing: false });
    });
  };

  lastWidth?: number = 0;
  animationFrame?: number;
  setResizingWidth = (clientX: number) => {
    const { resizeStartX } = this.state;
    const { width } = this.props;
    if (!resizeStartX) return;
    const diff = clientX - resizeStartX;

    this.lastWidth = width - diff;

    requestAnimationFrame(() => {
      this.setState({
        resizeWidth: Math.min(this.lastWidth!, window.innerWidth / 2),
      });
    });
  };
}
