import type { Component } from 'solid-js';
import { createSignal, Show, createEffect } from 'solid-js';

type CarouselProps = {
  imageSet: string; // Path to the directory of images
};

const Carousel: Component<CarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [imageUrls, setImageUrls] = createSignal([]);

  const [startX, setStartX] = createSignal(0);
  const [isSwiping, setIsSwiping] = createSignal(false);

  createEffect(() => {
    fetch('/imageManifest.json')
      .then((response) => response.json())
      .then((manifest) => {
        const selectedSetUrls = manifest[props.imageSet].images;
        setImageUrls(selectedSetUrls);
      })
      .catch((error) => console.error('Failed to load image manifest:', error));
  });

  const nextImage = () => {
    setCurrentIndex((i) => (i + 1) % imageUrls().length);
  };

  const prevImage = () => {
    setCurrentIndex((i) => (i - 1 + imageUrls().length) % imageUrls().length);
  };

  const handlePointerDown = (event: PointerEvent) => {
    setStartX(event.clientX);
    setIsSwiping(true);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isSwiping()) return;

    const currentX = event.clientX;
    const diffX = startX() - currentX;

    if (diffX > 50) {
      nextImage();
      setIsSwiping(false);
    } else if (diffX < -50) {
      prevImage();
      setIsSwiping(false);
    }
  };

  const handlePointerUp = () => {
    setIsSwiping(false);
  };

  const handleCarouselClick = (event: MouseEvent) => {
    const element = event.currentTarget as HTMLElement;
    const clickX = event.clientX;
    const elementWidth = element.offsetWidth;

    if (clickX < elementWidth / 2) {
      prevImage();
    } else {
      nextImage();
    }
  };

  return (
    <section
      class='flex flex-justify-center flex-items-center object-contain'
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleCarouselClick} // Keep this if you want to maintain click functionality
    >
      <Show when={imageUrls().length > 0}>
        <img
          src={imageUrls()[currentIndex()]}
          class='w-auto h-auto object-contain max-h-screen max-w-screen'
        />
      </Show>
    </section>
  );
};

export default Carousel;
