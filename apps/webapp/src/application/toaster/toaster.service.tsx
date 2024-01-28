import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";

const { ToastContainer, toast } = createStandaloneToast();

const defaultOptions: UseToastOptions = {
  position: "top",
  duration: 4000,
  isClosable: true,
  status: "info",
};

export function showToast(
  message: string,
  options?: UseToastOptions | undefined
) {
  return toast({
    ...defaultOptions,
    ...(options || {}),
    title: message,
  });
}

export { ToastContainer };
