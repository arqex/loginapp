import React from "react";
import styles from "./LoginScreenLayout.module.css";
interface LoginScreenLayoutProps {
  children: React.ReactNode;
}

export default function LoginScreenLayout(props: LoginScreenLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
