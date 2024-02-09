import { AppProvider } from './contexts/AppContext';
import type { Component } from 'solid-js';
import { createSignal, createEffect, For } from 'solid-js';
import Nav from './components/Nav';
import TwoUp from './components/TwoUp';
import '../styles/main.css';

const App: Component = () => {
  const [imageData, setImageData] = createSignal([]);

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
        const pairs = [];

        for (let i = 0; i < imageSets.length; i += 2) {
          const pair = {
            firstImage: imageSets[i],
            secondImage: i + 1 < imageSets.length ? imageSets[i + 1] : '',
          };
          pairs.push(pair);
        }

        setImageData(pairs);
        console.log(imageData())
      })
      .catch((error) => console.error('Failed to load image manifest:', error));
  });

  return (
    <AppProvider>
      <Nav />
      <For each={imageData()} fallback={<div>Loading...</div>}>
        {(pair) => (
          <TwoUp firstImage={pair.firstImage} secondImage={pair.secondImage} />
        )}
      </For>
    </AppProvider>
  );
};

export default App;
