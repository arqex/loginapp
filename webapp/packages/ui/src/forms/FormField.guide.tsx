import React, { PropsWithChildren } from "react";
import { Field, FieldRootProps } from "@chakra-ui/react";
import HelpTip from "../popovers/HelpTip.guide";
import styles from "./forms.module.css";

interface FormFieldProps extends FieldRootProps {
  children: React.ReactNode;
  label: string;
  helptip?: React.ReactNode;
  caption?: React.ReactNode;
  error?: React.ReactNode;
}

export default class FormField extends React.Component<
  PropsWithChildren<FormFieldProps>
> {
  render() {
    const { helptip, label, children, caption, error, ...other } = this.props;
    return (
      <Field.Root gap="1" invalid={!!error} {...other}>
        <Field.Label fontSize="md">
          {label}
          <Field.RequiredIndicator />
          {helptip && (
            <span className={styles.helptipWrapper}>
              <HelpTip>{helptip}</HelpTip>
            </span>
          )}
        </Field.Label>
        {children}
        {!error && caption && (
          <Field.HelperText mt="2px">{caption}</Field.HelperText>
        )}
        {error && <Field.ErrorText mt="2px">{error}</Field.ErrorText>}
      </Field.Root>
    );
  }
}
