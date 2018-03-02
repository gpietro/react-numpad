import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });

import KeyPad from '../lib/elements/KeyPad';
var theme = {
  color: {
    primary: '#383D3B',
    secondary: '#32a5f2',
    light: '#999',
  },
  background: {
    primary: '#f9f9f9',
  },
};

var fun = () => true;

describe('KeyPad', () => {
  describe('#render()', () => {
    const tree = renderer
      .create(
        <KeyPad
          theme={{
            color: {
              primary: '#383D3B',
              secondary: '#32a5f2',
              light: '#999',
            },
            background: {
              primary: '#f9f9f9',
            },
          }}
          cancel={() => true}
          confirm={() => true}
          validation={() => true}
          keyValid={() => true}
          sync={false}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
