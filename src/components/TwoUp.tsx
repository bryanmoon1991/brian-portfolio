import type { Component } from 'solid-js';
import ImageThumb from './ImageThumb';

interface TwoUpProps {
  firstImage: {
    src: string;
    alt: string;
    imageSet: string;
    style: string;
    blurb: string;
  };
  secondImage: {
    src: string;
    alt: string;
    imageSet: string;
    style: string;
    blurb: string;
  };
}

const TwoUp: Component<TwoUpProps> = (props) => {

  return (
    // <div class='flex xs:flex-gap-1 sm:flex-gap-3 md:flex-gap-6 lg:flex-gap-9 w-full h-full flex-justify-center flex-items-center object-contain '>
    <div class='flex gap w-full h-screen flex-justify-center flex-items-center snap-center'>
      <ImageThumb
        src={props.firstImage.src}
        alt={props.firstImage.alt}
        imageSet={props.firstImage.imageSet}
        style={props.firstImage.style}
        blurb={props.firstImage.blurb}
      />
      <ImageThumb
        src={props.secondImage.src}
        alt={props.secondImage.alt}
        imageSet={props.secondImage.imageSet}
        style={props.secondImage.style}
        blurb={props.secondImage.blurb}
      />
    </div>
  );
};

export default TwoUp;
