/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import { NumPad, NumberEditor, positiveIntegerValidation, Time, DateTime } from '../lib';
import Modal from './DemoModal';
import { appointmentDates, LoremIpsum } from './data';

const oddValidator = value =>
  parseInt(value, 10) > 0 && parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

storiesOf('Number Editor', module)
  .addDecorator(withKnobs)
  .add('Input number', () => {
    const value = number('Default value', 70, { range: true, min: 0, max: 90, step: 5 });
    return (
      <NumPad onChange={action('onChange')} position="startBottomLeft" label="Number" value={value}>
        <NumberEditor />
      </NumPad>
    );
  })
  .add('Input positive integer', () => (
    <NumPad onChange={action('onChange')} value="" position="startBottomLeft" label="Number">
      <NumberEditor keyValid={positiveIntegerValidation} />
    </NumPad>
  ))
  .add('Odd numbers', () => (
    <NumPad onChange={action('onChange')} value="" position="startBottomLeft" label="Number">
      <NumberEditor keyValid={oddValidator} />
    </NumPad>
  ))
  .add('Custom input field', () => (
    <NumPad
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      customInput={<TextField variant="outlined" />}
    >
      <NumberEditor keyValid={oddValidator} />
    </NumPad>
  ));

storiesOf('Date Time Editor', module)
  .addDecorator(withKnobs)
  .add('Datetime', () => (
    <NumPad
      onChange={action('onChange')}
      position="startButtomLeft"
      placeholder="DD-MM-YYYY HH : mm"
    >
      <DateTime dateFormat="DD-MM-YYYY HH : mm" />
    </NumPad>
  ))
  .add('Datetime date format', () => {
    const dateFormat = text('Date format', 'DD.MM.YYYY HH:mm');
    return (
      <NumPad onChange={action('onChange')} position="startButtomLeft" placeholder={dateFormat}>
        <DateTime dateFormat={dateFormat} />
      </NumPad>
    );
  });
