import {
  Component,
  JSX,
  createSignal,
  createEffect,
  onCleanup,
  Show,
} from "solid-js";
import { useAppContext } from "../contexts/AppContext";

const Modal: Component<{
  children: JSX.Element;
  correspondingGallery: string;
}> = (props) => {
  const { state, closeModal } = useAppContext();

  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  // let modal: HTMLElement;

  createEffect(() => {
    if (state.modalOpen) {
      const originalFocusedElement = document.activeElement as HTMLElement;
      // const modalFocusableElements = modal.querySelectorAll(focusableElements);
      // const firstFocusableElement = modalFocusableElements?.[0] as HTMLElement;
      // const lastFocusableElement = modalFocusableElements?.[
      // modalFocusableElements.length - 1
      // ] as HTMLElement;
      const focusTrap = function (e: KeyboardEvent) {
        const { key, code, shiftKey } = e;
        // const isTabPressed = (key || code) === 'Tab';
        const isEscapePressed = (key || code) === "Escape";
        // if (!isTabPressed && !isEscapePressed) return;
        if (isEscapePressed) {
          closeModal();
        }
        // if (shiftKey) {
        //   // if shift key pressed for shift + tab combination
        //   if (document.activeElement === firstFocusableElement) {
        //     lastFocusableElement?.focus(); // add focus for the last focusable element
        //     e.preventDefault();
        //   }
        //   // if tab key is pressed
        // } else if (document.activeElement === lastFocusableElement) {
        //   // if focused has reached to last focusable element then focus first focusable element after pressing tab
        //   firstFocusableElement?.focus(); // add focus for the first focusable element
        //   e.preventDefault();
        // }
      };
      // firstFocusableElement?.focus();
      document.addEventListener("keydown", focusTrap);
      onCleanup(() => {
        document.removeEventListener("keydown", focusTrap);
        originalFocusedElement?.focus();
      });
    }
  });

  return (
    <>
      <Show when={state.currentModal == props.correspondingGallery}>
        {/* <div
          role='presentation'
          class='modal__backdrop'
          onClick={() => closeModal()}
          onKeyPress={(e) =>
            (e.key || e.code) === 'Escape' ? closeModal() : null
          }
        /> */}
        <section class="z-2 position-absolute bgcw top-0 h-full min-h-screen w-screen">
          {props.children}
        </section>
      </Show>
    </>
  );
};

export default Modal;
