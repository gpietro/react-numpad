import React from 'react'
import {shallow, configure, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { expect } from 'chai'

configure({ adapter: new Adapter() });

import { Number } from '../lib/components/Number'

describe('Number', () => {
  describe('#render()', () => {
    it('renders <InputField />', () => {
      const wrapper = shallow(
        <Number onChange={(value) => { console.log('value', value)}} label={'Totale'} />
      )
      expect(wrapper.find('InputField')).to.have.length(1)
      expect(wrapper.find('InputField').dive().find('Input')).to.have.length(1)
      expect(wrapper.find('InputField').dive().find('Label')).to.have.length(1)
    })
  })
})

/*test('Keypad show after input click', () => {
  let component = mount(
    
  )
  let tree = renderer.create(component).toJSON()
  expect(tree).toMatchSnapshot()

  expect(component.find('input').length).toEqual(1)
  expect(component.find('label').length).toEqual(1)

  expect(component.find('KeyPad').length).toEqual(0)

  component.find('input').simulate('click')
  
  expect(component.find('KeyPad').length).toEqual(1)
  
  
  expect(component.find('Button').length).toEqual(12)
  
  
  //tree = renderer.create(shallowWithTheme(component.find('Button'))).toJSON()
  //expect(tree).toMatchSnapshot()
});*/