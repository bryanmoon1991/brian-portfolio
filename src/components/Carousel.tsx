import type { Component } from "solid-js";
import { createSignal, Show, For, createEffect, onCleanup } from "solid-js";
import { Transition } from "solid-transition-group";
import styles from "./Carousel.module.css";

type CarouselProps = {
  imageSet: string; // Path to the directory of images
};

const Carousel: Component<CarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [imageUrls, setImageUrls] = createSignal([]);

  let carouselRef: HTMLDivElement;
  let observer;

  createEffect(() => {
    fetch("/imageManifest.json")
      .then((response) => response.json())
      .then((manifest) => {
        const selectedSetUrls = manifest[props.imageSet].images;
        setImageUrls(selectedSetUrls);

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const index = entry.target.getAttribute("data-index");
                setCurrentIndex(index ? parseInt(index, 10) : 0);
              }
            });
          },
          {
            root: carouselRef,
            threshold: 0.5,
          },
        );

        const nodes = carouselRef?.querySelectorAll("[data-index]");
        nodes.forEach((node) => observer.observe(node));
      })
      .catch((error) => console.error("Failed to load image manifest:", error));
  });

  const isVideoFile = (src: string): boolean => {
    return /\.(mp4|mov)$/i.test(src);
  };

  const nextImage = () => {
    selectImage((currentIndex() + 1) % imageUrls().length);
  };

  const prevImage = () => {
    selectImage((currentIndex() - 1 + imageUrls().length) % imageUrls().length);
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
    const targetElement = carouselRef?.querySelector(`[data-index="${index}"]`);
    targetElement?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  };

  onCleanup(() => observer.disconnect());

  return (
    <>
      <Show when={imageUrls().length > 0}>
        <div
          ref={(el) => (carouselRef = el)}
          class={`mobile-max-h h-auto w-screen overflow-x-scroll`}
          style={{
            display: "flex",
            "scroll-snap-type": "x mandatory",
            "overscroll-behavior-x": "contain",
            "-webkit-overflow-scrolling": "touch",
            "scrollbar-width": "none",
            "-ms-overflow-style": "none",
          }}
          id="carousel"
          onClick={handleCarouselClick}
        >
          <For each={imageUrls()}>
            {(url, index) => (
              <div
                data-index={index()}
                class="min-w-screen xs:mobile-height flex snap-center items-center justify-center lg:h-full"
              >
                <Show
                  when={isVideoFile(url)}
                  fallback={
                    <img
                      src={url}
                      class="mh-lg mw-lg h-auto w-auto object-contain"
                    />
                  }
                >
                  <video
                    src={url}
                    class="mh-lg mw-lg h-auto w-auto snap-center object-contain"
                    controls
                    loop
                    muted
                  />
                </Show>
              </div>
            )}
          </For>
        </div>
      </Show>

      <Show when={imageUrls().length > 1}>
        <div class="absolute bottom-4 flex w-full justify-center gap-4">
          <For each={imageUrls()}>
            {(url, index) => (
              <span
                class={`cursor-pointer ${currentIndex() === index() ? "text-black" : "text-gray-400"}`}
                onClick={() => selectImage(index())}
                id="untouchable"
              >
                &#8226;
              </span>
            )}
          </For>
        </div>
      </Show>
    </>
  );
};

export default Carousel;
