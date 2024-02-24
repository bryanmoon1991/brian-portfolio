import type { Component } from 'solid-js';
import ImageThumb from './ImageThumb';

interface TwoUpProps {
  firstImage: {
    src: string;
    alt: string;
    imageSet: string;
  };
  secondImage: {
    src: string;
    alt: string;
    imageSet: string;
  };
}

const TwoUp: Component<TwoUpProps> = (props) => {

  return (
    // <div class='flex xs:flex-gap-1 sm:flex-gap-3 md:flex-gap-6 lg:flex-gap-9 w-full h-full flex-justify-center flex-items-center object-contain '>
    <div class='flex th-p w-full h-full flex-justify-center flex-items-center object-contain snap-center'>
      <ImageThumb
        // src='/images/thumbnails/1_SonHeungMin_Thumbnail.webp'
        // alt='son_heung_min'
        // imageSet='1_SonHeungMin'
        src={props.firstImage.src}
        alt={props.firstImage.alt}
        imageSet={props.firstImage.imageSet}
      />
      <ImageThumb
        // src='/images/thumbnails/2_Nonfiction_Thumbnail.webp'
        // alt='nonfiction'
        // imageSet='2_Nonfiction'
        src={props.secondImage.src}
        alt={props.secondImage.alt}
        imageSet={props.secondImage.imageSet}
      />
    </div>
  );
};

export default TwoUp;
