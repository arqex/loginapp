import React from "react";
import { Avatar as A, AvatarRootProps as AProps } from "@chakra-ui/react";

interface AvatarProps extends AProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  color?: string;
}

export default class Avatar extends React.Component<AvatarProps> {
  render() {
    const { name, src, color: avatarColor } = this.props;
    const background = avatarColor || stringToHslColor(name || src || "");
    const color = getTextColor(background);
    return (
      <A.Root {...this.props} style={{ background, color }}>
        {name && <A.Fallback name={name} />}
        {src && <A.Image src={src} />}
      </A.Root>
    );
  }
}

function stringToHslColor(str: string) {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });

  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
}

function getTextColor(hexcolor: string) {
  if (hexcolor.length === 4) {
    hexcolor =
      "#" +
      hexcolor[1] +
      hexcolor[1] +
      hexcolor[2] +
      hexcolor[2] +
      hexcolor[3] +
      hexcolor[3];
  }
  const r = parseInt(hexcolor.substring(1, 3), 16);
  const g = parseInt(hexcolor.substring(3, 5), 16);
  const b = parseInt(hexcolor.substring(5, 7), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000cc" : "#ffffffbb";
}
