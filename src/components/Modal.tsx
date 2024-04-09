import { Component, JSX, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { useAppContext } from "../contexts/AppContext";

const Modal: Component<{
  children: JSX.Element;
  correspondingGallery: string;
}> = (props) => {
  const { state } = useAppContext();

  return (
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
      <Show when={state.currentModal == props.correspondingGallery}>
        <section class="z-2 position-absolute bgcw top-0 h-full min-h-screen w-screen">
          {props.children}
        </section>
      </Show>
    </Transition>
  );
};

export default Modal;
