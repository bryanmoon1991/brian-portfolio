import { defineConfig } from 'unocss';
// import { presetMini } from '@unocss/preset-mini';
import { presetUno } from '@unocss/preset-uno';
import { presetFluid } from 'unocss-preset-fluid';
// import { presetTypography } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    // presetTypography()
  //   presetFluid({
  //     maxWidth: 1440,
  //     extendMaxWidth: 1920,
  //     minWidth: 320,
  //     useRemByDefault: true,
  //     ranges: {
  //       xs: [0.5, 1],
  //       sm: [1, 1.5],
  //       md: [2, 2.5],
  //       lg: [3, 3.5],
  //     },
  //   }),
  ],
});
