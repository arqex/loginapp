# MenuHeading

The MenuHeading component is designed for section headings in menus and sidebars. It provides consistent styling with uppercase text, smaller font size, and muted color.

## Usage

```tsx
import { MenuHeading } from "@loginapp/ui";

<MenuHeading>Your todo lists</MenuHeading>
<MenuHeading>Navigation</MenuHeading>
<MenuHeading color="action">Special Section</MenuHeading>
```

## Props

- `color`: Color variant - "inherit", "action", "light", or "lighter" (default: "lighter")
- Inherits all other Text props from Chakra UI except fontSize, fontWeight, textTransform, and letterSpacing which are preset

## Features

- Automatically styled with:
  - `fontSize="xs"` - Small text size
  - `fontWeight="600"` - Semi-bold weight
  - `textTransform="uppercase"` - All caps
  - `letterSpacing="wide"` - Increased letter spacing
  - `color="lighter"` - Muted text color (default)
