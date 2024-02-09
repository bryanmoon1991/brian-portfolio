import type { Component } from 'solid-js';
import {
  createSignal,
  Show,
  createEffect,
} from 'solid-js';

type CarouselProps = {
  imageSet: string; // Path to the directory of images
};

type ModuleWithDefaultExport = {
  default: string;
};

const Carousel: Component<CarouselProps> = (props) => {
  // const imageModules = import.meta.glob(`${props.imageSet}*.jpg`, {
  //   eager: true,
  // });
  // const images = Object.values(imageModules).map(
  //   (module: ModuleWithDefaultExport) => module.default
  // );
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [imageUrls, setImageUrls] = createSignal([]);

  createEffect(() => {
    // Fetch the image manifest
    fetch('/imageManifest.json') // Adjust the path if necessary
      .then((response) => response.json())
      .then((manifest) => {
        // Use the prop to determine which image set to display
        const selectedSetUrls = manifest[props.imageSet];
        setImageUrls(selectedSetUrls);
        console.log(imageUrls());
        // console.log(imageUrls.length, imageUrls().length)
      })
      .catch((error) => console.error('Failed to load image manifest:', error));
  });

  const nextImage = () => {
    setCurrentIndex((i) => (i + 1) % imageUrls().length);
  };

  const prevImage = () => {
    setCurrentIndex((i) => (i - 1 + imageUrls().length) % imageUrls().length);
  };

  // Example: Handling click event to determine where the user clicked (left or right side)
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
      class='w-screen min-h-screen z-2 position-absolute bgcw flex flex-justify-center flex-items-center object-contain'
      onClick={handleCarouselClick}
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
