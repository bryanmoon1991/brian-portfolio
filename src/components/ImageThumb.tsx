import type { Component } from "solid-js";
import { createSignal, createEffect, onCleanup, Show } from "solid-js";
import TextWithLinks from "./TextWithLinks";
import { useAppContext } from "../contexts/AppContext";
import styles from "./ImageThumb.module.css";

type ImageThumbProps = {
  src: string;
  alt: string;
  imageSet: string;
  style: string;
  blurb: string;
};

const ImageThumb: Component<ImageThumbProps> = (props) => {
  const { state, openModal, closeModal } = useAppContext();
  const [isVisible, setIsVisible] = createSignal(false);

  const handleImageClick = () => {
    if (state.modalOpen) {
      closeModal();
    } else {
      openModal(props.imageSet);
    }
  };

  createEffect(() => {
    const element = document.querySelector(`#img-${props.alt.slice(0, 5)}`); // Ensure each element has a unique ID
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            console.log(props.alt.slice(0, 5) + "visible");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    observer.observe(element);

    onCleanup(() => observer.disconnect());
  });

  return (
    <>
      <div
        class={
          isVisible()
            ? `${styles["fade"]} ${styles["visible"]}`
            : `${styles["fade"]}`
        }
      >
        <img
          src={props.src}
          alt={props.alt}
          loading="lazy"
          id={`img-${props.alt.slice(0, 5)}`}
          class={`${
            props.style == "a"
              ? "xl:w-35vw lg:w-35vw md:w-29vw xs:w-45vw mh h-auto cursor-pointer object-contain"
              : "xl:w-27vw lg:w-27vw md:w-27vw xs:w-40vw mh h-auto cursor-pointer object-contain"
          }`}
          onClick={handleImageClick}
        />
        <TextWithLinks
          content={props.blurb}
          styles={
            props.style == "a"
              ? "xl:w-35vw lg:w-35vw md:w-29vw xs:w-45vw lg:leading-4 xs:leading-3 mt-1"
              : "xl:w-27vw lg:w-27vw md:w-27vw xs:w-40vw lg:leading-4 xs:leading-3 mt-1"
          }
        />
      </div>
    </>
  );
};

export default ImageThumb;
