import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
// import devtools from 'solid-devtools/vite';
import UnoCSS from "@unocss/vite";
import { presetIcons } from "unocss";
// import UnocssPlugin from '@unocss/vite';

export default defineConfig({
  plugins: [
    /*
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    UnoCSS({
      presets: [presetIcons()],
      theme: {
        breakpoints: {
          xs: "320px",
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          xxl: "1440px",
          xxxl: "1920px",
        },
      },
      rules: [
        //image thumb
        ["col-gap", { "column-gap": "150px" }],
        [/^w-(\d+)vw$/, ([, d]) => ({ width: `${d}vw` })],
        ["mh", { "max-height": "70%" }],

        //modal
        ["gap", { gap: "10%" }],
        ["bgcw", { "background-color": "#FFFFFF" }],

        //text
        ["t-sm", { "font-size": "1.125rem" }],
        ["t-md", { "font-size": "1.962rem" }],
        ["t-lg", { "font-size": "2rem" }],
        ["ls-sm", { "letter-spacing": "-0.02rem" }],
        ["ls-md", { "letter-spacing": "-0.0325rem" }],
        ["ls-lg", { "letter-spacing": "-0.015rem" }],

        //carousel
        ["mobile-height", { height: "100svh" }],
        ["h-lg", { height: "85%" }],
        ["mh-lg", { "max-height": "85%" }],
        ["mw-lg", { "max-width": "80%" }],
        ["abcenter", { left: "50%" }],
        ["abtransform", { transform: "translateX(-50%)" }],
      ],
      shortcuts: {
        "width-a": "xl:xl-a md:md-a xs:xs-a h-auto mh object-contain",
        "width-b": "xl:xl-b md:md-b xs:xs-b h-auto mh object-contain",
        "text-sm": "t-sm ls-sm",
        "text-md": "t-md ls-md",
        "text-lg": "t-lg ls-lg",
        "b-centered": "abcenter abtransform",
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
