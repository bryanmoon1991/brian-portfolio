import type { Component } from "solid-js";
import {
  createSignal,
  Show,
  For,
  createEffect,
  onMount,
  onCleanup,
} from "solid-js";

type CarouselProps = {
  imageSet: string; // Path to the directory of images
};

const Carousel: Component<CarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [imageUrls, setImageUrls] = createSignal([]);

  const [dropShadowStyle, setDropShadowStyle] = createSignal("");
  const [distanceX, setDistanceX] = createSignal(0);
  const [distanceY, setDistanceY] = createSignal(0);

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

  const nextImage = () => {
    setCurrentIndex((i) => (i + 1) % imageUrls().length);
  };

  const prevImage = () => {
    setCurrentIndex((i) => (i - 1 + imageUrls().length) % imageUrls().length);
  };

  const handlePointerDown = (event: PointerEvent) => {
    setStartX(event.clientX);
    // console.log('pointer down', event.clientX)
    setIsSwiping(true);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!isSwiping()) return;

    const currentX = event.clientX;
    const diffX = startX() - currentX;
    // console.log('pointer move', diffX)
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
    // console.log('pointer up')
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

  const updateDropShadow = (event: MouseEvent) => {
    const carouselElement = document.getElementById("carousel");
    if (!carouselElement) return;

    const rect = carouselElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = ((event.clientX - centerX) / 70) * -1;
    const distanceY = ((event.clientY - centerY) / 70) * -1.5;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2); // Distance from center

    // Calculate shadow intensity based on distance
    const maxDistance = Math.max(rect.width, rect.height) / 2;
    const intensity = Math.min(distance / maxDistance, 1);

    // Adjust these values to achieve the desired visual effect
    const blur = 0 * intensity; // Base blur plus intensity
    const spread = 1 + 5 * intensity; // Base spread plus intensity

    // Update drop shadow style
    setDistanceX(distanceX);
    setDistanceY(distanceY);
    setDropShadowStyle(
      `drop-shadow(${distanceX}px ${distanceY}px ${blur}px ${spread}px rgba(0,0,0,0.5))`,
    );
    // console.log(dropShadowStyle());
  };

  onMount(() => {
    const carouselElement = document.getElementById("carousel");
    if (carouselElement) {
      carouselElement.addEventListener("mousemove", updateDropShadow);
    }
  });

  onCleanup(() => {
    const carouselElement = document.getElementById("carousel");
    if (carouselElement) {
      carouselElement.removeEventListener("mousemove", updateDropShadow);
    }
  });

  return (
    <>
      <section
        class="flex h-full w-full items-center justify-around object-contain"
        id="carousel"
        onClick={handleCarouselClick} // Keep this if you want to maintain click functionality
      >
        <Show when={imageUrls().length > 0}>
          <img
            src={imageUrls()[currentIndex()]}
            // style={{ filter: dropShadowStyle() }}
            style={{
              filter: `drop-shadow(${distanceX()}px ${distanceY()}px 0px rgba(0,0,0,0.8))`,
            }}
            class="mh-lg mw-lg h-auto w-auto object-contain"
          />
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
