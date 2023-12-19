import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { ParamListBase } from "@react-navigation/native";
import { getApiCacher } from "../application/stores/apiCacher";
import { getUIStore } from "../application/stores/uiStore";

export function StoreConnected<SCREEN_NAME extends string>(
  Component: React.ComponentType<any>
) {
  type StoreConnectedProps = StackScreenProps<ParamListBase, SCREEN_NAME>;
  return class extends React.Component<StoreConnectedProps> {
    name = "Connected" + Component.name;
    render() {
      return <Component {...this.props} />;
    }

    rerendering = false;

    _rerender = () => {
      if (!this.rerendering && this.props.navigation?.isFocused()) {
        this.rerendering = true;
        console.log("Rerendering screen", this.name);
        setTimeout(
          () =>
            this.forceUpdate(() => {
              this.rerendering = false;
            }),
          10
        );
      } else {
        console.log("Skip renrendering screen, no focus", this.name);
      }
    };

    listenToStores() {
      getUIStore().addChangeListener(this._rerender);
      getApiCacher().addChangeListener(this._rerender);
    }

    componentDidMount() {
      this.listenToStores();
    }

    componentWillUnmount(): void {
      getUIStore().removeChangeListener(this._rerender);
      getApiCacher().removeChangeListener(this._rerender);
    }
  };
}
