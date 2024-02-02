import { defineConfig } from 'unocss';
// import { presetMini } from '@unocss/preset-mini';
import { presetUno } from '@unocss/preset-uno';
import { presetFluid } from 'unocss-preset-fluid'

export default defineConfig({
  presets: [
    presetUno(),
      presetFluid({
        maxWidth: 1440,
        extendMaxWidth: 1920,
        minWidth: 320,
        ranges: {
          xs: [12, 16],
          sm: [14, 18],
          md: [18, 24],
          lg: [22, 30],
        }
      })
  ],
});
