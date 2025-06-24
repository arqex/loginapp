import React from "react";
import styles from "./LoginScreenLayout.module.css";
import { Theme, Toaster } from "@loginapp/ui";

interface LoginScreenLayoutProps {
  children: React.ReactNode;
}

export default function LoginScreenLayout(props: LoginScreenLayoutProps) {
  return (
    <Theme>
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
      </div>
      <Toaster />
    </Theme>
  );
}
