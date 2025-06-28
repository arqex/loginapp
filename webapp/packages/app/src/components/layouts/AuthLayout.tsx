import { type ReactNode, Component } from "react";
import styles from "./AuthLayout.module.css";
import SecondaryPanel from "./SecondaryPanel";
import { isMobileLayout } from "../../application/layout/layout.service";
import classNames from "classnames";
import Topbar from "../Topbar/Topbar";
import { Modal, Box } from "@loginapp/ui";

interface AuthLayoutProps {
  children: ReactNode;
  appMenu: ReactNode;
  secondaryPanel?: ReactNode;
  onCloseSecondary?: () => void;
  contentWidth?: "default" | "full";
}

interface AuthLayoutState {
  isMenuCollapsed: boolean;
  userMenuCollapsed: boolean;
  isMenuModalOpen: boolean;
  isSecondaryCollapsed: boolean;
  secondaryWidth: number;
  animatingMenu: boolean;
}

class AuthLayout extends Component<AuthLayoutProps, AuthLayoutState> {
  state: AuthLayoutState = {
    isMenuCollapsed: false,
    userMenuCollapsed: false,
    isMenuModalOpen: false,
    isSecondaryCollapsed: true,
    secondaryWidth: 400,
    animatingMenu: false,
  };

  animatingMenuTimer?: any;
  _toggleMenu = () => {
    const { isMenuCollapsed, isMenuModalOpen } = this.state;
    if (isMobileLayout()) {
      this.setState({
        isMenuModalOpen: !isMenuModalOpen,
        animatingMenu: true,
      });
    } else {
      this.setState({
        isMenuCollapsed: !isMenuCollapsed,
        userMenuCollapsed: !isMenuCollapsed,
        animatingMenu: true,
      });
    }

    clearTimeout(this.animatingMenuTimer);
    this.animatingMenuTimer = setTimeout(() => {
      this.setState({
        animatingMenu: false,
      });
    }, 400);
  };

  _toggleSecondaryPanel = () => {
    const { secondaryPanel } = this.props;
    const { userMenuCollapsed } = this.state;
    this.setState({
      isMenuCollapsed: secondaryPanel ? true : userMenuCollapsed,
      animatingMenu: true,
    });

    clearTimeout(this.animatingMenuTimer);
    this.animatingMenuTimer = setTimeout(() => {
      this.setState({
        animatingMenu: false,
      });
    }, 300);
  };

  render() {
    const { isMenuCollapsed, secondaryWidth, isMenuModalOpen, animatingMenu } =
      this.state;
    const {
      children,
      secondaryPanel,
      appMenu,
      onCloseSecondary,
      contentWidth = "default",
    } = this.props;
    const isMobile = isMobileLayout();

    const menuClasses = classNames(
      styles.appMenuBar,
      isMenuCollapsed && styles.collapsed,
      animatingMenu && styles.animating
    );

    const contentClasses = classNames(
      styles.screenContent,
      styles[`width_${contentWidth}`]
    );

    return (
      <>
        <div className={styles.desktopLayout}>
          {!isMobile && (
            <div className={menuClasses}>
              <div className={styles.appMenuBarContent}>{appMenu}</div>
            </div>
          )}

          <div className={styles.centerColumn} id="centerColumn">
            <div className={styles.userMenuBar}>
              <Topbar
                showAppMenuToggle={isMenuCollapsed}
                onAppShowMenu={this._toggleMenu}
              />
            </div>
            <div className={contentClasses}>{children}</div>
          </div>
          {!isMobile && (
            <SecondaryPanel
              width={secondaryPanel ? secondaryWidth : 0}
              onResize={this._onSecondaryResize}
              onCloseRequest={this.props.onCloseSecondary}
            >
              {secondaryPanel}
            </SecondaryPanel>
          )}
        </div>
        {isMobile && (
          <Modal open={isMenuModalOpen} onClose={this._toggleMenu}>
            {appMenu}
          </Modal>
        )}
        {isMobile && (
          <Modal open={!!secondaryPanel} onClose={onCloseSecondary}>
            <Box className="secondaryMobile">{secondaryPanel}</Box>
          </Modal>
        )}
      </>
    );
  }

  _onSecondaryResize = (width: number) => {
    if (width < 200) {
      this.props.onCloseSecondary?.();
      return;
    } else if (width < 400) {
      width = 400;
    } else if (width > window.innerWidth / 2) {
      width = window.innerWidth / 2;
    }
    console.log("Setting width", width);
    this.setState({ secondaryWidth: width });
  };

  refreshTimer?: number;
  _refresh = () => {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
    }
    this.refreshTimer = window.setTimeout(() => {
      this.forceUpdate();
    }, 100);
  };

  componentDidMount(): void {
    window.addEventListener("resize", this._refresh);
  }

  componentDidUpdate({ secondaryPanel: prevPanel }: AuthLayoutProps) {
    const currentPanel = this.props.secondaryPanel;
    if ((!prevPanel && currentPanel) || (prevPanel && !currentPanel)) {
      this._toggleSecondaryPanel();
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this._refresh);
  }
}

export default AuthLayout;
