import type { Component } from 'solid-js';
import {
  For,
  createEffect,
  createSignal,
  Show,
  onMount,
  onCleanup,
} from 'solid-js';
import Carousel from './Carousel';
import Modal from './Modal';
import TwoUp from './TwoUp';
import ImageThumb from './ImageThumb';
import { useAppContext } from '../contexts/AppContext';
import { useNavigate, useLocation } from 'solid-app-router';

const ImageIndex: Component = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, setScrollPosition } = useAppContext();
  const [imageDataPairs, setImageDataPairs] = createSignal([]);
  const [galleries, setGalleries] = createSignal([]);
  const [elementRef, setElementRef] = createSignal(null);

  createEffect(() => {
    fetch('/imageManifest.json')
      .then((response) => response.json())
      .then((manifest) => {
        const imageKeys = Object.keys(manifest);
        const _imageData = imageKeys.map((imgKey) => {
          let filename = imgKey.split('.')[0];
          let style = imgKey.split('.')[1];
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
            secondImage: i + 1 < _imageData.length ? _imageData[i + 1] : '',
          };
          pairs.push(pair);
        }

        setImageDataPairs(pairs);
        // console.log(imageDataPairs());
      })
      .catch((error) => console.error('Failed to load image manifest:', error));
  });


  // Debounce function to limit how often we calculate and navigate during scroll
  let debounceTimer;
  const debounce = (func, delay) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(func, delay);
  };

  // The main logic to handle scroll events
  const handleScroll = () => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return;

    const viewportHeight = window.innerHeight;
    const scrollTop = rootElement.scrollTop;
    const currentImageIndex = Math.floor(scrollTop / viewportHeight);

    // Use navigate to update the URL without reloading the page
    navigate(`/image/${currentImageIndex}`, { replace: true });
    setScrollPosition(currentImageIndex)
  };

  // Enhanced handleScroll to debounce the execution
  const debouncedHandleScroll = () => debounce(handleScroll, 100);

  function scrollToImage(imageIndex) {
    const imageHeight = window.innerHeight; // Assuming each image has a fixed height of 500px
    const scrollPosition = imageHeight * imageIndex;
  
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth' // Optional: enables smooth scrolling
    });
  }

  // Effect to handle direct URL accesses or refreshes
  createEffect(() => {
    const path = location.pathname.split('/');
    if (path[1] === 'image' && path.length === 3) {
      const index = parseInt(path[2], 10);
      if (!isNaN(index)) {
        // Logic to scroll to the specific image or adjust the view based on the index
        // This will depend on your layout and how you track image positions
        // console.log(`Direct access to image index: ${index}`);
        scrollToImage(index);
      }
    }
  });

  onMount(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.addEventListener('scroll', debouncedHandleScroll);
    }
  });

  onCleanup(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.removeEventListener('scroll', debouncedHandleScroll);
    }
    clearTimeout(debounceTimer);
  });

  return (
    <>
        <div>
          <For each={imageDataPairs()} fallback={<div>Loading...</div>}>
            {(pair) => (
              <TwoUp
                firstImage={pair.firstImage}
                secondImage={pair.secondImage}
              />
            )}
          </For>
        </div>

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
