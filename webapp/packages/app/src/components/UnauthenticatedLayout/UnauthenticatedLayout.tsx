import React from "react";
import styles from "./UnauthenticatedLayout.module.css";
interface UnauthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function UnauthenticatedLayout(
  props: UnauthenticatedLayoutProps
) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Logo />
        {props.children}
      </div>
    </div>
  );
}

function Logo() {
  return (
    <svg
      width="300"
      viewBox="0 0 300 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Loginapp logo"
      style={{ display: "block", margin: "0 auto 24px" }}
    >
      <text
        x="0"
        y="20"
        fontFamily="Arial, Helvetica, sans-serif"
        fontSize="70px"
        fontWeight="800"
        fill="#222"
        letterSpacing="2"
        textLength="300"
        lengthAdjust="spacingAndGlyphs"
      >
        Loginapp
      </text>
    </svg>
  );
}
