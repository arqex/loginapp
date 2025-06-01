import React from "react";
import {
  Checkbox as CCheckbox,
  CheckboxProps as CCheckboxProps,
} from "../../chakra-snippets/checkbox";
import styles from "./forms.module.css";

interface CheckboxProps extends CCheckboxProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default class Checkbox extends React.Component<CheckboxProps> {
  render() {
    return <CCheckbox {...this.props} className={styles.checkbox} />;
  }
}
