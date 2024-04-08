import { createSignal, createEffect, onCleanup } from "solid-js";
import type { Component } from "solid-js";

const About: Component = () => {
  const [isSmallScreen, setIsSmallScreen] = createSignal(false);

  createEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const updateScreenSize = () => setIsSmallScreen(mediaQuery.matches);

    updateScreenSize();
    mediaQuery.addListener(updateScreenSize);

    onCleanup(() => mediaQuery.removeListener(updateScreenSize));
  });

  return (
    <section class="z-2 position-absolute bgcw min-h-screen w-screen">
      <p class="xs:text-6 lg:text-9 ml-8 mr-8 mt-16 font-thin">
        Brian is an art director and designer based in Brooklyn, New York. His
        work ranges from visual identities, art direction, editorial, and
        packaging/print for clients operating in fashion, music, technology, and
        many more. <br /> <br /> Currently open for new projects, commissions,
        and collaborations.
      </p>
      <div class="md:gap-30 xs:gap-5 xs:justify-between ml-8 mr-8 flex md:justify-start">
        <p class="xs:text-3 md:text-sm">
          CONTACT
          <br />
          <br />
          hello@brianyou.info
          <br />
          @brian_you
        </p>
        <p class="xs:text-3 md:text-sm">
          {isSmallScreen() ? "CLIENTS" : "SELECTED CLIENTS"}
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
        <p class="xs:text-3 md:text-sm">
          EXPERIENCE
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
          {isSmallScreen() ? "JKR" : "Jones Knowles Ritchie"}
          <br />
          With Projects
          <br />
          Landscape
          <br />
          Moving Brands
        </p>
      </div>
      <p class="xs:text-2 pl fixed bottom-0 w-full">
        ©2024 All Rights Reserved
      </p>
    </section>
  );
};

export default About;
