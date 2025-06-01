import { createToaster } from "@chakra-ui/react";

export const t = createToaster({
  placement: "bottom-end",
  pauseOnPageIdle: true,
  duration: 6000,
});

console.log("T", t);

export const toaster = {
  info: (message: string) => t.create({ title: message, type: "info" }),
  success: (message: string) => t.create({ title: message, type: "success" }),
  warning: (message: string) => t.create({ title: message, type: "warning" }),
  error: (message: string) => t.create({ title: message, type: "error" }),
};
