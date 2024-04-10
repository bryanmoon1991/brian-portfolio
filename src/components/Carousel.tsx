import type { Component } from "solid-js";
import {
  createSignal,
  Show,
  For,
  createEffect,
  onMount,
  onCleanup,
} from "solid-js";
import Loader from "./Loader";
import { useAppContext } from "../contexts/AppContext";

type CarouselProps = {
  imageSet: string;
};

const Carousel: Component<CarouselProps> = (props) => {
  const { closeModal } = useAppContext();
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [imageUrls, setImageUrls] = createSignal([]);
  const [isSmallScreen, setIsSmallScreen] = createSignal(false);

  createEffect(() => {
    const mediaQuery = window.matchMedia("(max-height: 640px)");
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addEventListener("change", updateScreenSize);

    onCleanup(() => mediaQuery.removeEventListener("change", updateScreenSize));
  });

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

  const keydownHandler = function (e: KeyboardEvent) {
    const { key, code } = e;
    const isEscapePressed = (key || code) === "Escape";
    const arrowLeft = code === "ArrowLeft";
    const arrowRight = code === "ArrowRight";

    if (isEscapePressed) {
      closeModal();
    } else if (arrowLeft) {
      prevImage();
    } else if (arrowRight) {
      nextImage();
    }
  };

  onMount(() => {
    document.addEventListener("keydown", keydownHandler);
  });

  onCleanup(() => {
    observer.disconnect();
    document.removeEventListener("keydown", keydownHandler);
  });

  return (
    <>
      <Show when={imageUrls().length > 0} fallback={<Loader />}>
        <div
          ref={(el) => (carouselRef = el)}
          class={`h-screen w-screen overflow-x-scroll`}
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
        <div class="xs:bottom-35 absolute flex w-full justify-center gap-4 md:bottom-3">
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
