import React, { PropsWithChildren } from "react";
import styles from "./ScreenLayout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import Theme from "../Theme/Theme";

interface ScreenLayoutProps {}

export default function ScreenLayout(
  props: PropsWithChildren<ScreenLayoutProps>
) {
  return (
    <Theme>
      <div className={styles.screenWrapper}>
        <div className={styles.sidebarWrapper}>
          <Sidebar />
        </div>
        <div className={styles.screenMain}>
          <div className={styles.userMenuBar}>
            <Topbar />
          </div>
          <div className={styles.screenContent}>{props.children}</div>
        </div>
      </div>
    </Theme>
  );
}
