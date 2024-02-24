import type { Component } from 'solid-js';
import { For, createEffect, createSignal, Show } from 'solid-js';
import Carousel from './Carousel';
import Modal from './Modal';
import TwoUp from './TwoUp';
import { useAppContext } from '../contexts/AppContext';

const ImageIndex: Component = (props) => {
  const { state, openModal, closeModal } = useAppContext();
  const [imageData, setImageData] = createSignal([]);
  const [galleries, setGalleries] = createSignal([]);

  createEffect(() => {
    fetch('/imageManifest.json')
      .then((response) => response.json())
      .then((manifest) => {
        const imageThumbs = Object.keys(manifest);
        const imageSets = imageThumbs.map((img) => {
          return {
            src: `/images/thumbnails/${img}_Thumbnail.webp`,
            alt: img,
            imageSet: img,
          };
        });

        setGalleries(imageSets);
        const pairs = [];

        for (let i = 0; i < imageSets.length; i += 2) {
          const pair = {
            firstImage: imageSets[i],
            secondImage: i + 1 < imageSets.length ? imageSets[i + 1] : '',
          };
          pairs.push(pair);
        }

        setImageData(pairs);
        console.log(imageData());
      })
      .catch((error) => console.error('Failed to load image manifest:', error));
  });

  return (
    <>
      <Show when={!state.modalOpen}>
        <div class='snap-mandatory snap-y'>
          <For each={imageData()} fallback={<div>Loading...</div>}>
            {(pair) => (
              <TwoUp
                firstImage={pair.firstImage}
                secondImage={pair.secondImage}
              />
            )}
          </For>
        </div>
      </Show>
      <For each={galleries()} fallback={<div>Loading...</div>}>
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
