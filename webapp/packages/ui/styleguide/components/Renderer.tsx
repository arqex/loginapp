import React from "react";
import DefaultStyleGuideRenderer from "react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer";
import { Theme } from "../../src/theme/Theme";

declare global {
  interface Window {
    catalogaTheme: any;
  }
}

interface RendererProps {
  title: string;
  version?: string;
  homepageUrl: string;
  children: React.ReactNode;
  toc?: React.ReactNode;
  hasSidebar?: boolean;
}

export default function Renderer(props: RendererProps) {
  return (
    <Theme>
      <DefaultStyleGuideRenderer {...props} />
    </Theme>
  );
}
