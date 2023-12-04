import { CSpinner, CButton } from "@coreui/react";
import { CButtonProps } from "@coreui/react/dist/components/button/CButton";
import classNames from "classnames";
import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends CButtonProps {
  loading?: boolean;
}
interface ButtonState {}

export default class Button extends React.Component<ButtonProps, ButtonState> {
  state: ButtonState = {};
  render() {
    const { loading, ...rest } = this.props;
    const disabled = rest.disabled || loading;
    return (
      <CButton {...rest} disabled={disabled}>
        {this.renderContent(loading)}
      </CButton>
    );
  }

  renderContent(loading: boolean | undefined) {
    const cn = classNames(styles.buttonContent, loading && styles.withSpinner);
    return (
      <span className={cn}>
        {loading && (
          <span className={styles.spinner}>
            <CSpinner size="sm" />
          </span>
        )}
        <span className={styles.text}>{this.props.children}</span>
      </span>
    );
  }
}
