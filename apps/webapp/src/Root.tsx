import React from "react";
import { getAuthenticatedId } from "./application/auth/auth.selector";
import App from "./App";
import AuthApp from "./auth_app/AuthApp";
import "./base.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import { Router } from "./application/routing/router";
import { LS } from "./application/stores/localStorage";
import { AppStore } from "./application/stores/uiStore";
import { CToaster } from "@coreui/react";
import { getToast } from "./application/toaster/toaster.service";
import { ApiClient } from "@loginapp/api-client";

interface RootProps {
  router: Router;
  authRouter: Router;
  uiStore: AppStore;
  apiClient: ApiClient;
  ls: LS;
}

export default class Root extends React.Component<RootProps> {
  render() {
    const authId = getAuthenticatedId();
    return (
      <>
        {authId ? <App /> : <AuthApp />}
        <CToaster placement="top-end" push={getToast()} />
      </>
    );
  }

  rerenderTimeout: number | null = null;
  _rerender = () => {
    // wait a cycle to rerender so we can batch changes
    if (!this.rerenderTimeout) {
      this.rerenderTimeout = setTimeout(() => {
        this.rerenderTimeout = null;
        this.forceUpdate();
      }, 0);
    }
  };

  componentDidMount() {
    this.props.router.onChange(this._rerender);
    this.props.authRouter.onChange(this._rerender);
    this.props.apiClient.addLoadListener(this._rerender);
    this.props.uiStore.addChangeListener(this._rerender);
    this.props.ls.addChangeListener(this._rerender);
  }

  componentDidUpdate(prevProps: Readonly<RootProps>): void {
    if (prevProps.router !== this.props.router) {
      prevProps.router.offChange(this._rerender);
      this.props.router.onChange(this._rerender);
    }
    if (prevProps.authRouter !== this.props.authRouter) {
      prevProps.authRouter.offChange(this._rerender);
      this.props.authRouter.onChange(this._rerender);
    }
    if (prevProps.apiClient !== this.props.apiClient) {
      prevProps.apiClient.removeLoadListener(this._rerender);
      this.props.apiClient.addLoadListener(this._rerender);
    }
    if (prevProps.uiStore !== this.props.uiStore) {
      prevProps.uiStore.removeChangeListener(this._rerender);
      this.props.uiStore.addChangeListener(this._rerender);
    }
    if (prevProps.ls !== this.props.ls) {
      prevProps.ls.removeChangeListener(this._rerender);
      this.props.ls.addChangeListener(this._rerender);
    }
  }
}
