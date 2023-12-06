import React from "react";
import styles from "./AuthScreenLayout.module.css";

interface AuthScreenLayoutProps {
  children: React.ReactNode;
}

export default function AuthScreenLayout(props: AuthScreenLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}
