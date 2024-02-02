import {
  Component,
  JSX,
  createSignal,
  createEffect,
  onCleanup,
  Show,
} from 'solid-js';

const Modal: Component<{ children: JSX.Element, isOpen: () => boolean, setIsOpen: (value: boolean) => void }> = (props) => {

  const focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

  let modal: HTMLElement;

  createEffect(() => {
    if (props.isOpen()) {
      const originalFocusedElement = document.activeElement as HTMLElement;
      const modalFocusableElements = modal.querySelectorAll(focusableElements);
      const firstFocusableElement = modalFocusableElements?.[0] as HTMLElement;
      const lastFocusableElement = modalFocusableElements?.[
        modalFocusableElements.length - 1
      ] as HTMLElement;
      const focusTrap = function (e: KeyboardEvent) {
        const { key, code, shiftKey } = e;
        const isTabPressed = (key || code) === 'Tab';
        const isEscapePressed = (key || code) === 'Escape';
        if (!isTabPressed && !isEscapePressed) return;
        if (isEscapePressed) return props.setIsOpen(false);
        if (shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement?.focus(); // add focus for the last focusable element
            e.preventDefault();
          }
          // if tab key is pressed
        } else if (document.activeElement === lastFocusableElement) {
          // if focused has reached to last focusable element then focus first focusable element after pressing tab
          firstFocusableElement?.focus(); // add focus for the first focusable element
          e.preventDefault();
        }
      };
      firstFocusableElement?.focus();
      document.addEventListener('keydown', focusTrap);
      onCleanup(() => {
        document.removeEventListener('keydown', focusTrap);
        originalFocusedElement?.focus();
      });
    }
  });

  return (
    <>
      <Show when={props.isOpen()}>
        <div
          role='presentation'
          class='modal__backdrop'
          onClick={() => props.setIsOpen(false)}
          onKeyPress={(e) =>
            (e.key || e.code) === 'Escape' ? props.setIsOpen(false) : null
          }
        />
        <section role='dialog' class='w-screen min-h-screen z-2 position-absolute bgcw' ref={modal}>
          {/* <header>
            <button
              aria-label='Close Dialog'
              class='modal__close'
              onClick={() => props.setIsOpen(false)}
            >
              &times;
            </button>
          </header> */}
          <div class='modal__body'>{props.children}</div>
        </section>
      </Show>
    </>
  );
};

export default Modal;
