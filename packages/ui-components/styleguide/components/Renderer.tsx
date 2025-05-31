import Theme from "../../src/Theme/Theme";
import React from "react";
import DefaultStyleGuideRenderer from "react-styleguidist/lib/client/rsg-components/StyleGuide/StyleGuideRenderer";
import { getClientColorScheme } from "../../src/Theme/theme.service";

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
  const colorScheme = getClientColorScheme();
  console.log("Rendering renderer", colorScheme);
  return (
    <Theme colorScheme={colorScheme}>
      <DefaultStyleGuideRenderer {...props} />
    </Theme>
  );
}
