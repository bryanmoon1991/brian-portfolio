import { createSignal, createEffect, onCleanup } from "solid-js";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import { Transition } from "solid-transition-group";
import About from "./About";
import { useAppContext } from "../contexts/AppContext";

const Nav: Component = () => {
  const [isSmallScreen, setIsSmallScreen] = createSignal(false);
  const [isShortScreen, setIsShortScreen] = createSignal(false);
  const { state, openModal, closeModal } = useAppContext();

  const handleAboutClick = () => {
    if (state.modalOpen) {
      closeModal();
    } else {
      openModal("About");
    }
  };

  createEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    onCleanup(() => mediaQuery.removeEventListener("change", updateScreenSize));
  });

  createEffect(() => {
    const mediaQuery = window.matchMedia("(max-height: 480px)");
    const updateScreenSize = () => setIsShortScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    onCleanup(() => mediaQuery.removeEventListener("change", updateScreenSize));
  });

  return (
    <>
      <header class="z-3 fixed left-0 top-0 mt-4 flex w-full justify-between">
        <span class="lg:text-4 xs:text-3 m-0 pl-4 mix-blend-screen">
          {state.currentModal != "About" &&
            (isSmallScreen() || isShortScreen()
              ? "Brian You"
              : "Brian You, Art Direction and Design, NY")}
        </span>
        <a
          class="lg:text-4 xs:text-3 m-0 cursor-pointer pr-4 mix-blend-screen"
          onClick={handleAboutClick}
          id="untouchable"
        >
          {state.modalOpen ? (
            isSmallScreen() ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5rem"
                height="1.5rem"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12 12.708l-5.246 5.246q-.14.14-.344.15q-.204.01-.364-.15t-.16-.354q0-.194.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344q-.01-.204.15-.364t.354-.16q.194 0 .354.16L12 11.292l5.246-5.246q.14-.14.344-.15q.204-.01.364.15t.16.354q0 .194-.16.354L12.708 12l5.246 5.246q.14.14.15.344q.01.204-.15.364t-.354.16q-.194 0-.354-.16z"
                />
              </svg>
            ) : (
              "Close"
            )
          ) : (
            "About"
          )}
        </a>
      </header>
      <Transition
        onEnter={(el, done) => {
          const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 150,
          });
          a.finished.then(done);
        }}
        onExit={(el, done) => {
          const a = el.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 150,
          });
          a.finished.then(done);
        }}
      >
        <Show when={state.currentModal == "About"}>
          <About />
        </Show>
      </Transition>
    </>
  );
};

export default Nav;
