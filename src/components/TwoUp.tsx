import type { Component } from "solid-js";
import ImageThumb from "./ImageThumb";

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
    <div class="flex-items-center flex h-screen w-full snap-center justify-evenly object-contain">
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
