import { CToast, CToastBody, CToastClose } from "@coreui/react";
import { getUIStore } from "../stores/uiStore";

export interface ToastOptions {
  content: any;
  autohide?: boolean;
  duration?: number;
}

export function showToast(toast: ToastOptions) {
  const uiStore = getUIStore();
  const props = {
    color: "primary",
    autohide: toast.autohide,
    delay: toast.duration || 5000,
    className: `d-flex flex-1 align-items-center text-white`,
  };
  console.log("Toast props", props);
  uiStore.data.toast = (
    <CToast {...props} visible>
      <CToastBody>{toast.content}</CToastBody>
      <CToastClose className="me-2 m-auto" white />
    </CToast>
  );
  uiStore.emitChange();
}

export function getToast() {
  return getUIStore().data.toast;
}
