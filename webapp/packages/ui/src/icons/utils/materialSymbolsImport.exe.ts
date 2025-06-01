import { writeFileSync, existsSync } from "fs";
import { join } from "path";

const targetFolder = join(__dirname, "../svg");

function getUrl(name: string, size: number = 20): string {
  return `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/${name.toLowerCase()}/default/${size}px.svg`;
}

const icons = [
  "Add",
  "Add_Box",
  "Add_Circle",
  "Alarm",
  "Apps",
  "Arrow_Forward",
  "Attach_File",
  "Bar_Chart",
  "Bookmark",
  "Block",
  "Bolt",
  "Cached",
  "Cancel",
  "Category",
  "Call",
  "Check",
  "Check_Circle",
  "Chevron_Right",
  "Close",
  "Close_Fullscreen",
  "Content_Copy",
  "Contrast",
  "Crop",
  "Dark_Mode",
  "Delete",
  "Dashboard",
  "Drag_Indicator",
  "Download",
  "Edit",
  "Edit_Note",
  "Error",
  "Favorite",
  "Filter_Alt",
  "Filter_Alt_Off",
  "Globe",
  "Grid_On",
  "Groups",
  "Help",
  "Home",
  "Info",
  "Key",
  "Language",
  "Lightbulb",
  "Link",
  "Light_Mode",
  "Location_On",
  "Logout",
  "Mail",
  "Manage_Search",
  "Map",
  "Menu",
  "Minimize",
  "More_Vert",
  "Notifications",
  "Open_In_New",
  "Open_In_Full",
  "Password",
  "Person",
  "Photo",
  "Photo_Camera",
  "Photo_Library",
  "Priority_High",
  "Public",
  "Publish",
  "Question_Mark",
  "Qr_Code",
  "Refresh",
  "Remove",
  "Remove_Circle",
  "Reply",
  "Schedule",
  "Search",
  "Search_Off",
  "Self_Improvement",
  "Send",
  "Settings",
  "Share",
  "Smartphone",
  "Sort",
  "Sync",
  "Star",
  "Upload",
  "Undo",
  "View_Column",
  "Visibility",
  "Visibility_Off",
  "Zoom_In",
  "Zoom_Out",
];

const transformNames = {
  Arrow_Forward: "Arrow",
  Chevron_Right: "Chevron",
  Content_Copy: "Copy",
  Filter_Alt: "Filter",
  Filter_Alt_Off: "FilterOff",
  Grid_On: "Grid",
  Location_On: "Location",
  More_Vert: "More",
  Priority_High: "Exclamation",
  Question_Mark: "Question",
  Self_Improvement: "Yoga",
  View_Column: "Columns",
};

async function importIcons() {
  for (const icon of icons) {
    const componentName = transformNames[icon] || icon.replace(/_/g, "");
    const targetFilePath = join(targetFolder, `${componentName}.tsx`);
    if (existsSync(targetFilePath)) {
      console.log(`Skipping ${componentName}.tsx. Already exists`);
      continue;
    }

    console.log(`Fetching ${componentName}`);
    const url = getUrl(icon);
    const response = await fetch(url);
    const svg = (await response.text())
      .replace(/xmlns=".*?"\s?/, "")
      .replace(/width=".*?"\s?/, "")
      .replace(/height=".*?"\s?/, "")
      .replace(/fill=".*?"\s/, "")
      .replace(/<svg/, `<svg fill="currentColor" fillRule="evenodd"`)
      .replace(/>/g, ">\n");

    const componentContent = `
import React from 'react';

export default function ${componentName}() {
  return (
    ${svg}
  );
}
`;

    writeFileSync(targetFilePath, componentContent);
    console.log(`Wrote ${componentName}.tsx`);
  }
}

function rebuildIndex() {
  const indexFilePath = join(targetFolder, "index.ts");
  const indexContent = icons
    .map((icon) => {
      const componentName = transformNames[icon] || icon.replace(/_/g, "");
      return `export { default as ${componentName} } from './${componentName}';`;
    })
    .join("\n");

  writeFileSync(indexFilePath, indexContent);
  console.log(`Wrote index.ts`);
}

async function run() {
  await importIcons();
  await rebuildIndex();
}

run();
