import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';

import NumPad from '../lib';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

storiesOf('NumPad', module)
  .add('with number', () => 
    <NumPad.Number 
      onChange={(value) => { console.log('value', value)}} 
      label={'Totale'} />)
  .add('with time', () => ([<NumPad.Time key='1' label={'Sveglia'}/>,<NumPad.Time key='2'/>]))
  .add('with date', () => <NumPad.Date onChange={(value) => console.log('changed', value)} label={'Data di nascita'} />)
