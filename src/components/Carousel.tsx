import type { Component } from "solid-js";
import {
  createSignal,
  Show,
  For,
  createEffect,
  onMount,
  onCleanup,
} from "solid-js";
import { Transition } from "solid-transition-group";
import styles from "./Carousel.module.css";

type CarouselProps = {
  imageSet: string; // Path to the directory of images
};

const Carousel: Component<CarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [imageUrls, setImageUrls] = createSignal([]);

  const [startX, setStartX] = createSignal(0);
  const [isSwiping, setIsSwiping] = createSignal(false);

  createEffect(() => {
    fetch("/imageManifest.json")
      .then((response) => response.json())
      .then((manifest) => {
        const selectedSetUrls = manifest[props.imageSet].images;
        setImageUrls(selectedSetUrls);
      })
      .catch((error) => console.error("Failed to load image manifest:", error));
  });

  const isVideoFile = (src: string): boolean => {
    return /\.(mp4|mov)$/i.test(src);
  };

  const nextImage = () => {
    setCurrentIndex((i) => (i + 1) % imageUrls().length);
  };

  const prevImage = () => {
    setCurrentIndex((i) => (i - 1 + imageUrls().length) % imageUrls().length);
  };

  const handlePointerDown = (event: PointerEvent) => {
    setStartX(event.clientX);
    console.log("pointer down", event.clientX);
    setIsSwiping(true);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isSwiping()) return;

    const currentX = event.clientX;
    const diffX = startX() - currentX;
    console.log("pointer move", diffX);
    if (diffX > 20) {
      nextImage();
      setIsSwiping(false);
    } else if (diffX < -20) {
      prevImage();
      setIsSwiping(false);
    }
  };

  const handlePointerUp = () => {
    setIsSwiping(false);
    console.log("pointer up");
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

  const selectImage = (index: number) => {
    setCurrentIndex(index);
  };

  onMount(() => {
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
  });
  onCleanup(() => {
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointerdown", handlePointerDown);
    document.removeEventListener("pointermove", handlePointerMove);
  });

  return (
    <>
      <section
        class="xs:mobile-height flex w-full items-center justify-around overflow-hidden object-contain lg:h-full"
        id="carousel"
        onClick={handleCarouselClick} // Keep this if you want to maintain click functionality
      >
        <Show when={imageUrls().length > 0}>
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
            <Show
              when={isVideoFile(imageUrls()[currentIndex()])}
              fallback={
                <img
                  src={imageUrls()[currentIndex()]}
                  class="mh-lg mw-lg h-auto w-auto object-contain"
                />
              }
            >
              <video
                src={imageUrls()[currentIndex()]}
                class="mh-lg mw-lg h-auto w-auto object-contain"
                controls
                // autoplay
                loop
                muted
              />
            </Show>
          </Transition>
        </Show>
      </section>

      <Show when={imageUrls().length > 1}>
        <div class="z-3 b-centered absolute bottom-5 flex gap-2">
          <For each={imageUrls()}>
            {(url, index) => (
              <span
                class={`${currentIndex() === index() ? "active" : "cursor-pointer opacity-20"}`}
                onClick={[selectImage, index()]}
              >
                &#8226
              </span>
            )}
          </For>
        </div>
      </Show>
    </>
  );
};

export default Carousel;
