import React from 'react'
import ReactTestUtils from 'react-dom/test-utils'
import Calendar from '../lib/elements/Calendar'
import renderer, {shallow} from 'react-test-renderer'

test('Button console log when clicked', () => {
  const component = renderer.create(
    <Button className='NumPad-keypad-button' onClick={() => console.log('ciao')}>Ciao</Button>
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});