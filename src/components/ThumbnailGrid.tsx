import { createSignal, For } from 'solid-js';

const imageList = [
  '/images/thumbnails/1_SonHeungMin_Thumbnail.gif',
  '/images/thumbnails/5_JuicyJ&PierreBourne_SpaceAgePimpin_Thumbnail.png',
];

function ThumbnailGrid() {
  const [images, setImages] = createSignal([]);

  // Function to load an image and get its dimensions
  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ src, width: img.width, height: img.height });
      img.src = src;
    });
  }

  // Load all images and set their dimensions
  Promise.all(imageList.map(loadImage)).then(setImages);

  // Function to define CSS based on image dimensions
  const defineCSS = (width, height) => {
    // Define your custom CSS rules based on dimensions here
    // Example: return a different class name based on aspect ratio
    return width > height ? 'landscape' : 'portrait';
  };

  return (
    <div>
      <For each={images()}>
        {(image) => (
          <img src={image.src} class={defineCSS(image.width, image.height)} />
        )}
      </For>
    </div>
  );
}

export default ThumbnailGrid;
