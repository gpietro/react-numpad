import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

configure({ adapter: new Adapter() });

import { Number } from '../lib/components/Number';

describe('Number', () => {
  describe('#render()', () => {
    it('renders <InputField />', () => {
      const wrapper = shallow(
        <Number
          onChange={value => {
            console.log('value', value);
          }}
          label={'Total'}
        />
      );
      expect(wrapper.find('InputField')).to.have.length(1);
      expect(wrapper.find('InputField').props().label).to.equal('Total');
      expect(
        wrapper
          .find('InputField')
          .dive()
          .find('Input')
      ).to.have.length(1);
      expect(
        wrapper
          .find('InputField')
          .dive()
          .find('Label')
      ).to.have.length(1);
    });

    it('renders <KeyPad />', () => {
      const wrapper = mount(
        <Number
          onChange={value => {
            console.log('value', value);
          }}
        />
      );
      expect(wrapper.state().show).to.equal(false);
      expect(wrapper.find('KeyPad')).to.have.length(0);
      expect(wrapper.state().value).to.equal('');
      wrapper.find('.numpad-input-value').simulate('click');
      expect(wrapper.state().show).to.equal(true);
      expect(wrapper.find('KeyPad')).to.have.length(1);
    });
  });

  describe('#input()', () => {
    const wrapper = mount(
      <Number
        onChange={value => {
          console.log('value', value);
        }}
      />
    );
    wrapper.find('.numpad-input-value').simulate('click');
    expect(wrapper.find('Button')).to.have.length(12);
    wrapper
      .find('Button')
      .first()
      .simulate('click');
    wrapper.find('.numpad-input-value').simulate('keyDown', { key: 'Enter' });
  });
});
