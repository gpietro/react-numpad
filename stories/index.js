import React from 'react'
import moment from 'moment'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import NumPad from '../lib'
import Calendar from '../lib/elements/Calendar'

import Button from '../lib/elements/Button'

storiesOf('Components', module)
  .add('Number', () => 
    <NumPad.Number key='number-1' onChange={(value) => { console.log('value', value)}} label={'Totale'} />)    
  .add('Time', () => ([
    <NumPad.Time key='time-1' label={'Sveglia'} onChange={(value) => console.log('changed', value)}/>,
    <NumPad.Time key='time-2' onChange={(value) => console.log('changed', value)}/>
  ]))
  .add('Date US', () => <NumPad.Date 
    onChange={(value) => console.log('changed', value)}
    label={'Birthdate'}
    locale='en'
    dateFormat='MM/DD/YYYY' />)
  .add('Date CH-IT', () => <NumPad.Date 
    onChange={(value) => console.log('changed', value)}
    label={'Data di nascita'}
    locale='it'
    dateFormat='DD.MM.YYYY' />)
  
storiesOf('Elements', module)
  .add('Calendar', () => <Calendar 
    locale='it'
    dateFormat='MM/DD/YYYY'
    onChange={date => console.log(date)} />)
  .add('Button', () => <Button />)