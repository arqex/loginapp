import React from "react";
import { getAuthenticatedId } from "./application/auth/auth.selector";
import App from "./App";
import AuthApp from "./auth_app/AuthApp";
import "./base.css";
import { Router } from "./application/routing/router";
import { LS } from "./application/stores/localStorage";
import { AppStore } from "./application/stores/uiStore";
import { ApiClient } from "@loginapp/api-client";
import Toaster from "./components/Toaster/Toaster";
import { initI18n } from "./application/i18n/i18n.service";
import { I18next, i18nLoader } from "@loginapp/i18n";
import { Spinner } from "@chakra-ui/react";
import SpinnerScreen from "./components/SpinnerScreen/SpinnerScreen";

interface RootProps {
  router: Router;
  authRouter: Router;
  uiStore: AppStore;
  apiClient: ApiClient;
  ls: LS;
  i18n: I18next;
}

export default class Root extends React.Component<RootProps> {
  render() {
    const { i18n, uiStore } = this.props;
    const { isLoading } = i18nLoader(i18n, () => uiStore.emitChange());
    if (isLoading) return <SpinnerScreen />;

    const authId = getAuthenticatedId();
    return (
      <>
        {authId ? <App /> : <AuthApp />}
        <Toaster />
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
    this.props.router.onChange(() => {
      console.log("router changed");
      this._rerender();
    });
    this.props.authRouter.onChange(() => {
      console.log("auth router changed");
      this._rerender();
    });
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
