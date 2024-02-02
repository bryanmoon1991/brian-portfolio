import type { Component } from 'solid-js';

const TwoUp: Component = () => {
  return (
    // <div class='flex xs:flex-gap-1 sm:flex-gap-3 md:flex-gap-6 lg:flex-gap-9 w-full h-full flex-justify-center flex-items-center object-contain '>
    <div class='flex th-p w-full h-full flex-justify-center flex-items-center object-contain '>
        <img
          src='/images/thumbnails/1_SonHeungMin_Thumbnail.gif'
          alt='son_heung_min'
          loading='lazy'
          class='font-0 width-a'
        />
        <img
          src='/images/thumbnails/2_Nonfiction_Thumbnail.png'
          alt='nonfiction'
          loading='lazy'
          class='font-0 width-b'
        />
    </div>
  );
};

export default TwoUp;
