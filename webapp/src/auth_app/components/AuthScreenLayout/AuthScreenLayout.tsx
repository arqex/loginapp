import React from "react";
import styles from "./AuthScreenLayout.module.css";
import Theme from "../../../components/Theme/Theme";

interface AuthScreenLayoutProps {
  children: React.ReactNode;
}

export default function AuthScreenLayout(props: AuthScreenLayoutProps) {
  return (
    <Theme>
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
      </div>
    </Theme>
  );
}
