import type { Component } from 'solid-js';
import { createSignal, Show } from 'solid-js';
import Carousel from './Carousel';
import { useAppContext } from '../contexts/AppContext'

type ImageThumbProps = {
  src: string;
  alt: string;
  imageSet: string;
};

const ImageThumb: Component<ImageThumbProps> = (props) => {
  const { state, openModal, closeModal } = useAppContext();

  const handleImageClick = () => {
    if (state.modalOpen) {
      closeModal();
    } else {
      openModal(props.imageSet)
    }
  };

  return (
    <>
      <img
        src={props.src}
        alt={props.alt}
        loading='lazy'
        class='font-0 width-a'
        onClick={handleImageClick}
      />
      {/* <Show when={state.currentModal == props.imageSet}>
        <Carousel imageSet={props.imageSet}/>
      </Show> */}
    </>
  );
};

export default ImageThumb;
