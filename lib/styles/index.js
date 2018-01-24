import blue from './themes/blue';
import orange from './themes/orange';
import blackAndWhite from './themes/black_white';

export default name => {
  const themes = { blue, orange, blackAndWhite };
  return themes[name] || blue;
};
