import { createMedia } from '@artsy/fresnel';

export const mediaBreakpoints = {
  mobile: 0,
  tablet: 768,
  smallComputer: 992,
  computer: 1024,
  largescreen: 1200,
};

export const { MediaContextProvider, Media } = createMedia({
  breakpoints: mediaBreakpoints,
});
