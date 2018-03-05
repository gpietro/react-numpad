import numpad from './themes/numpad';

export default name => {
  const themes = { numpad };
  return themes[name] || numpad;
};
