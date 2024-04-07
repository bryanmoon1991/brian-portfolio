import type { Component } from "solid-js";
import { For, createEffect, createSignal } from "solid-js";
import Carousel from "./Carousel";
import Modal from "./Modal";
import TwoUp from "./TwoUp";

const ImageIndex: Component = () => {
  const [imageDataPairs, setImageDataPairs] = createSignal([]);
  const [galleries, setGalleries] = createSignal([]);

  createEffect(() => {
    fetch("/imageManifest.json")
      .then((response) => response.json())
      .then((manifest) => {
        const imageKeys = Object.keys(manifest);
        const _imageData = imageKeys.map((imgKey) => {
          let filename = imgKey.split(".")[0];
          let style = imgKey.split(".")[1];
          return {
            src: `/images/thumbnails/${filename}_Thumbnail.webp`,
            alt: filename,
            imageSet: imgKey,
            style: style,
            blurb: manifest[imgKey].blurb,
          };
        });
        // console.log(_imageData);
        setGalleries(_imageData);

        const pairs = [];
        for (let i = 0; i < _imageData.length; i += 2) {
          const pair = {
            firstImage: _imageData[i],
            secondImage: i + 1 < _imageData.length ? _imageData[i + 1] : "",
          };
          pairs.push(pair);
        }

        setImageDataPairs(pairs);
        // console.log(imageDataPairs());
      })
      .catch((error) => console.error("Failed to load image manifest:", error));
  });

  return (
    <>
      <div class="bgcw">
        <For each={imageDataPairs()} fallback={<div>Loading...</div>}>
          {(pair) => (
            <TwoUp
              firstImage={pair.firstImage}
              secondImage={pair.secondImage}
            />
          )}
        </For>
      </div>

      <For each={galleries()}>
        {(gallery) => (
          <Modal correspondingGallery={gallery.imageSet}>
            <Carousel imageSet={gallery.imageSet} />
          </Modal>
        )}
      </For>
    </>
  );
};

export default ImageIndex;
