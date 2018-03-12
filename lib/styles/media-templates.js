// these sizes are arbitrary and you can set them to whatever you wish
import { css } from 'styled-components';

const sizes = {
  desktop: 4000,
  mobile: 415,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const isMobile = () => {
  const mobile = window.matchMedia(`(max-width: ${sizes.mobile}px)`);
  // const desktop = window.matchMedia(`(max-width: ${sizes.desktop}px)`);
  return mobile.matches;
};
