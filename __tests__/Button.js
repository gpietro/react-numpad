import React from 'react'
import Button from '../lib/elements/Button'
import renderer from 'react-test-renderer'

test('Button console log when clicked', () => {
  const component = renderer.create(
    <Button className='NumPad-keypad-button' onClick={() => console.log('ciao')}>Ciao</Button>
  )
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});