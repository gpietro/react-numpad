/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import { Button } from '@material-ui/core';
import {
  NumPad,
  NumberEditor,
  positiveIntegerValidation,
  CalendarDate,
  DateTimeEditor,
  Appointment,
} from '../lib';
import Modal from './DemoModal';
import { appointmentDates } from './data';

configure({ adapter: new Adapter() });

const oddValidator = value =>
  parseInt(value, 10) > 0 && parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

storiesOf('Number', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <NumPad onChange={action('onChange')} position="startBottomLeft" label="Number">
      <NumberEditor />
    </NumPad>
  ))
  .add('initial value', () => {
    const value = number('Default value', 70, { range: true, min: 0, max: 90, step: 5 });
    return (
      <NumPad onChange={action('onChange')} position="startBottomLeft" label="Number" value={value}>
        <NumberEditor />
      </NumPad>
    );
  })
  .add('positive integer', () => (
    <NumPad onChange={action('onChange')} value="" position="startBottomLeft" label="Number">
      <NumberEditor keyValidator={positiveIntegerValidation} />
    </NumPad>
  ))
  .add('odd numbers', () => (
    <NumPad onChange={action('onChange')} value="" position="startBottomLeft" label="Number">
      <NumberEditor keyValidator={oddValidator} />
    </NumPad>
  ))
  .add('custom input field', () => (
    <NumPad
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      customInput={<TextField label="Number" variant="outlined" />}
    >
      <NumberEditor />
    </NumPad>
  ))
  .add('testing numbers', () => {
    const story = (
      <NumPad onChange={action('onChange')} value="" position="startBottomLeft" label="Number">
        <NumberEditor />
      </NumPad>
    );
    specs(() =>
      describe('Check text', () => {
        it('Should have the Number label', () => {
          const wrapper = mount(story);
          expect(wrapper.text()).equal('Number');
        });
      })
    );
    return story;
  });

storiesOf('Date Time Editor', module)
  .add('time', () => (
    <NumPad onChange={action('onChange')} position="startButtomLeft" placeholder="HH : mm">
      <DateTimeEditor dateFormat="HH:mm" />
    </NumPad>
  ))
  .add('time with default', () => {
    const formatString = text('format string', 'HH:mm');
    const value = text('initial value', '21:45');
    return (
      <NumPad
        onChange={action('onChange')}
        position="startButtomLeft"
        value={value}
        placeholder={formatString}
      >
        <DateTimeEditor dateFormat={formatString} />
      </NumPad>
    );
  })
  .add('Datetime', () => (
    <NumPad
      onChange={action('onChange')}
      position="startButtomLeft"
      placeholder="DD-MM-YYYY HH : mm"
    >
      <DateTimeEditor dateFormat="DD-MM-YYYY HH : mm" />
    </NumPad>
  ))
  .add('Datetime date format', () => {
    const dateFormat = text('Date format', 'DD.MM.YYYY HH:mm');
    return (
      <NumPad onChange={action('onChange')} position="startButtomLeft" placeholder={dateFormat}>
        <DateTimeEditor dateFormat={dateFormat} />
      </NumPad>
    );
  });

storiesOf('Calendar Editor', module)
  .add('default', () => (
    <NumPad onChange={action('onChange')} position="startButtomLeft" placeholder="DD-MM-YYYY">
      <CalendarDate dateFormat="DD-MM-YYYY" />
    </NumPad>
  ))
  .add('initial value', () => (
    <NumPad
      onChange={action('onChange')}
      position="startButtomLeft"
      value="29-12-1978"
      placeholder="DD-MM-YYYY"
    >
      <CalendarDate dateFormat="DD-MM-YYYY" />
    </NumPad>
  ));

storiesOf('Appointment Editor', module)
  .add('default', () => (
    <NumPad onChange={action('onChange')} position="startButtomLeft" placeholder="DD-MM-YYYY">
      <Appointment dates={appointmentDates} dateFormat="DD-MM-YYYY" />
    </NumPad>
  ))
  .add('fullscreen', () => (
    <NumPad
      onChange={action('onChange')}
      position="fullscreen"
      locale="it"
      placeholder="DD-MM-YYYY"
    >
      <Appointment dates={appointmentDates} dateFormat="DD-MM-YYYY" />
    </NumPad>
  ));

storiesOf('Modal', module).add('Inside modal', () => (
  <Modal>
    <h4>Test component inside a modal</h4>
    <NumPad
      style={{ fontSize: '10px' }}
      key="number-1"
      placeholder="test"
      theme="orange"
      onChange={action('selected value')}
      position="startBottomLeft"
      label="Totale"
      value={10}
      customInput={
        <div>
          <TextField label="Uncontrolled" margin="normal" variant="outlined" value="1234" />
          <Button>open</Button>
        </div>
      }
    >
      <NumberEditor />
    </NumPad>
    {/* <hr />
      <NumPad.Time
        key="time-2"
        theme="blackAndWhite"
        onChange={value => console.log('changed', value)}
      />
      <hr />
      <NumPad.Calendar
        onChange={value => console.log('changed', value)}
        label={'Data di nascita'}
        locale="it"
        dateFormat="DD.MM.YYYY"
        value={'28.06.1986'}
      />
      <hr />
      <NumPad.Calendar
        onChange={value => console.log('changed', value)}
        label={'Markers'}
        locale="it"
        dateFormat="DD.MM.YYYY"
        markers={['01.03.2018', '06.03.2018']}
      /> */}
  </Modal>
));
