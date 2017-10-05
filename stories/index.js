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
    <NumPad.Number key='number-1' onChange={(value) => { console.log('value', value)}} label={'Totale'} />)
  .add('with time', () => ([
    <NumPad.Time key='time-1' label={'Sveglia'} onChange={(value) => console.log('changed', value)}/>,
    <NumPad.Time key='time-2' onChange={(value) => console.log('changed', value)}/>
  ]))
  .add('with date', () => <NumPad.Date onChange={(value) => console.log('changed', value)} label={'Data di nascita'} />)
