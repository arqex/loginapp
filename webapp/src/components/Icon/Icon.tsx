export type IconType = "menu" | "moon" | "sun" | "close" | "star" | "home";
import {
  MenuRounded,
  Brightness3,
  Brightness7,
  Close,
  StarBorderRounded,
  CottageOutlined,
} from "@mui/icons-material";

interface IconProps {
  name: IconType;
}
export default function Icon({ name }: IconProps) {
  switch (name) {
    case "menu":
      return <MenuRounded />;
    case "moon":
      return <Brightness3 />;
    case "sun":
      return <Brightness7 />;
    case "close":
      return <Close />;
    case "star":
      return <StarBorderRounded />;
    case "home":
      return <CottageOutlined />;
  }
}
