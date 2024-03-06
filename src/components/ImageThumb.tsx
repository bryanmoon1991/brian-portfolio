import type { Component } from 'solid-js';
import { createSignal, createEffect, onCleanup, Show } from 'solid-js';
import TextWithLinks from './TextWithLinks';
import { useAppContext } from '../contexts/AppContext';
import styles from './ImageThumb.module.css';

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
            console.log(props.alt.slice(0, 5) + 'visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(element);

    onCleanup(() => observer.disconnect());
  });

  return (
    <>
      <div
        class={
          isVisible()
            ? `${styles['fade']} ${styles['visible']}`
            : `${styles['fade']}`
        }
      >
        <img
          src={props.src}
          alt={props.alt}
          loading='lazy'
          id={`img-${props.alt.slice(0, 5)}`}
          class={`${
            props.style == 'a'
              ? 'cursor-pointer width-a'
              : 'cursor-pointer font-0 width-b'
          }`}
          onClick={handleImageClick}
        />
        <TextWithLinks content={props.blurb} />
      </div>
    </>
  );
};

export default ImageThumb;
