import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import Carousel from './Carousel';
import { useAppContext } from '../contexts/AppContext';

type ImageThumbProps = {
  src: string;
  alt: string;
  imageSet: string;
  style: string;
  blurb: string;
};

const ImageThumb: Component<ImageThumbProps> = (props) => {
  const { state, openModal, closeModal } = useAppContext();

  const handleImageClick = () => {
    if (state.modalOpen) {
      closeModal();
    } else {
      openModal(props.imageSet);
    }
  };

  return (
    <>
      <div>
        <img
          src={props.src}
          alt={props.alt}
          loading='lazy'
          class={props.style == 'a' ? 'font-0 width-a' : 'font-0 width-b'}
          onClick={handleImageClick}
        />
        <p class='m-0'>{props.blurb}</p>
        {/* <Show when={state.currentModal == props.imageSet}>
        <Carousel imageSet={props.imageSet}/>
      </Show> */}
      </div>
    </>
  );
};

export default ImageThumb;
