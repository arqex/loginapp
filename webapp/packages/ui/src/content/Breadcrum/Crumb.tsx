import React from "react";
import { Link } from "../../texts";

interface CrumbProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
interface CrumbState {}

export default class Crumb extends React.Component<CrumbProps, CrumbState> {
  state: CrumbState = {};
  render() {
    const { href, children, className } = this.props;
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
}
