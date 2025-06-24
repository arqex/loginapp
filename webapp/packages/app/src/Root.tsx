import React from "react";
import App from "./App";
import "./base.css";
import { LS } from "./application/stores/localStorage";
import { type AppStore } from "./application/stores/uiStore";
import { ApiClient } from "@loginapp/api-client";
import SpinnerScreen from "./components/SpinnerScreen/SpinnerScreen";
import type { Router } from "./application/routing/router";
import type { I18next } from "./application/i18n/i18n.types";
import { i18nLoader } from "./application/i18n/i18n";
import { Theme, Toaster } from "@loginapp/ui";

interface RootProps {
  router: Router;
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

    const Screen = this.props.router.location?.matches[0];

    return (
      <>
        <Theme>
          {Screen ? <Screen /> : <div>404</div>}
          <Toaster />
        </Theme>
      </>
    );
  }

  rerenderTimeout: NodeJS.Timeout | null = null;
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
    this.props.apiClient.addLoadListener(this._rerender);
    this.props.uiStore.addChangeListener(this._rerender);
    this.props.ls.addChangeListener(this._rerender);
  }

  componentDidUpdate(prevProps: Readonly<RootProps>): void {
    if (prevProps.router !== this.props.router) {
      prevProps.router.offChange(this._rerender);
      this.props.router.onChange(this._rerender);
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
