import type { Component } from 'solid-js';
// import { createSignal } from 'solid-js';
// import Modal from './Modal';

const About: Component = () => {
  return (
    <>
      <p class='text-lg mt-28 ml-8 mr-8'>
        Brian is an art director and designer based in Brooklyn, New York. His
        work ranges from visual identities, art direction, editorial, and
        packaging/print for clients operating in fashion, music, technology, and
        many more. <br /> <br /> Currently open for new projects, commissions,
        and collaborations.
      </p>
      <div class='flex gap-30 ml-8 mr-8'>
        <p class='text-sm'>
          CONTACT
          <br />
          <br />
          <br />
          hello@brianyou.info
          <br />
          @brian_you
        </p>
        <p class='text-sm'>
          SELECTED CLIENTS
          <br />
          <br />
          <br />
          Apple
          <br />
          Calvin Klein
          <br />
          Claxton Projects
          <br />
          Google
          <br />
          Harvard Design Magazine
          <br />
          Mercedez Benz
          <br />
          Nonfiction
          <br />
          OMA
          <br />
          Son Heung Min
          <br />
          Ultimate Ears
          <br />
          West Coast Industries
          <br />
          WeWork
          <br />
          Wine Access
        </p>
        <p class='text-sm'>
          EXPERIENCE
          <br />
          <br />
          <br />
          Apple
          <br />
          Calvin Klein
          <br />
          Google Creative Lab
          <br />
          Transport NY
          <br />
          Jones Knowles Ritchie
          <br />
          With Projects
          <br />
          Landscape
          <br />
          Moving Brands
        </p>
      </div>
      <p class='w-full fixed bottom-0 pl'>
	  	©2024 All Rights Reserved
      </p>
    </>
  );
};

export default About;
