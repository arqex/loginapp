import React from "react";
import { HStack } from "@chakra-ui/react";
import Crumb from "./Crumb";
import styles from "./Breadcrumb.module.css";
import { Home } from "../../icons/svg";
import Icon from "../../icons/Icon.guide";

interface BreadcrumbProps {
  withHome?: boolean;
  children: React.ReactNode;
}
interface BreadcrumbState {}

export default class Breadcrumb extends React.Component<
  BreadcrumbProps,
  BreadcrumbState
> {
  state: BreadcrumbState = {};
  render() {
    const children = React.Children.toArray(this.props.children);
    const { withHome = true } = this.props;
    return (
      <nav>
        <HStack onClick={this._checkNavigation} className={styles.breadcrumb}>
          {withHome && (
            <Crumb href="/" className={styles.homeIcon}>
              <Icon size="md">
                <Home />
              </Icon>
            </Crumb>
          )}
          {children.map((child, index) => (
            <React.Fragment key={index}>
              {index > 0 || withHome ? " > " : null}
              {child}
            </React.Fragment>
          ))}
        </HStack>
      </nav>
    );
  }

  _checkNavigation = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = e.target as HTMLAnchorElement;
    const href = a.getAttribute("href");
    console.log(href);
  };
}
