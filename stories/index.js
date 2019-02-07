/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';

import NumPad from '../lib';
import Modal from './DemoModal';
import { appointmentDates } from './data';

configure({ adapter: new Adapter() });

const oddValidator = value =>
  parseInt(value, 10) > 0 && parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

storiesOf('Number', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <NumPad.Number onChange={action('onChange')} position="startBottomLeft" label="Number" />
  ))
  .add('initial value', () => {
    const value = number('Default value', 70, { range: true, min: 0, max: 90, step: 5 });
    return (
      <NumPad.Number
        onChange={action('onChange')}
        position="startBottomLeft"
        label="Number"
        value={value}
      />
    );
  })
  .add('positive number', () => (
    <NumPad.Number
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
      decimal
      negative={false}
    />
  ))
  .add('positive integer', () => (
    <NumPad.Number
      decimal={false}
      negative={false}
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
    />
  ))
  .add('positive & negative number', () => (
    <NumPad.Number
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
      decimal
      negative
    />
  ))
  .add('positive & negazive integer', () => (
    <NumPad.Number
      decimal={false}
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
    />
  ))
  .add('configure decimals allowed', () => {
    const decimals = number('Decimals', 2);
    return (
      <NumPad.Number
        onChange={action('onChange')}
        value=""
        position="startBottomLeft"
        label="Number"
        decimal={2}
      />
    );
  })
  .add('odd numbers with custom validator', () => (
    <NumPad.Number
      keyValidator={oddValidator}
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
    />
  ))
  .add('custom input field', () => (
    <NumPad.Number onChange={action('onChange')} value="5" position="startBottomLeft">
      <input type="text" />
      <button>i'm custom</button>
    </NumPad.Number>
  ))
  .add('testing numbers', () => {
    const story = (
      <NumPad.Number
        onChange={action('onChange')}
        value=""
        position="startBottomLeft"
        label="Number"
      />
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
    <NumPad.DateTime
      dateFormat="HH:mm"
      onChange={action('onChange')}
      position="startBottomLeft"
      placeholder="HH:mm"
      sync
    />
  ))
  .add('time with default', () => {
    const formatString = text('format string', 'HH:mm');
    const value = text('initial value', '21:45');
    return (
      <NumPad.DateTime
        dateFormat={formatString}
        onChange={action('onChange')}
        position="startBottomLeft"
        value={value}
        placeholder={formatString}
      />
    );
  })
  .add('Datetime', () => (
    <NumPad.DateTime
      dateFormat="DD-MM-YYYY HH:mm"
      onChange={action('onChange')}
      position="startBottomLeft"
      placeholder="DD-MM-YYYY HH : mm"
    />
  ))
  .add('Datetime date format', () => {
    const dateFormat = text('Date format', 'DD.MM.YYYY HH:mm');
    return (
      <NumPad.DateTime
        dateFormat={dateFormat}
        onChange={action('onChange')}
        position="startBottomLeft"
        placeholder={dateFormat}
      />
    );
  });

storiesOf('Calendar Editor', module)
  .add('default', () => (
    <NumPad.Calendar
      dateFormat="DD MMMM YYYY"
      onChange={action('onChange')}
      locale="it"
      placeholder="DD-MM-YYYY"
    />
  ))
  .add('initial value', () => (
    <NumPad.Calendar
      dateFormat="DD-MM-YYYY"
      onChange={action('onChange')}
      position="startBottomLeft"
      value="29-12-1978"
      placeholder="DD-MM-YYYY"
    />
  ))
  .add('Calendar with time picker', () => (
    <NumPad.Calendar
      dateFormat="DD-MM-YYYY"
      timeFormat=" HH:mm"
      onChange={action('onChange')}
      position="startBottomLeft"
      value="29-12-1978 10:00"
      placeholder="DD-MM-YYYY"
    />
  ));

storiesOf('Appointment Editor', module)
  .add('default', () => (
    <NumPad.Appointment
      dates={appointmentDates}
      dateFormat="DD-MM-YYYY"
      onChange={action('onChange')}
      position="startBottomLeft"
      placeholder="DD-MM-YYYY"
    />
  ))
  .add('fullscreen', () => (
    <NumPad.Appointment
      dates={appointmentDates}
      dateFormat="DD-MM-YYYY"
      onChange={action('onChange')}
      position="fullscreen"
      locale="it"
      placeholder="DD-MM-YYYY"
    />
  ));

storiesOf('Modal', module).add('Inside modal', () => (
  <Modal>
    <h4>Test component inside a modal with custom theme</h4>
    <NumPad.Number
      style={{ fontSize: '10px' }}
      key="number-1"
      placeholder="test"
      theme={{
        header: {
          primaryColor: 'red',
          secondaryColor: 'yellow',
          highlightColor: '#FFC107',
          backgroundColor: '#607D8B',
        },
        body: {
          primaryColor: '#263238',
          secondaryColor: '#32a5f2',
          highlightColor: '#FFC107',
          backgroundColor: '#f9f9f9',
        },
        panel: {
          backgroundColor: '#CFD8DC',
        },
      }}
      onChange={action('selected value')}
      position="startBottomLeft"
      label="Totale"
      value={10}
    />
  </Modal>
));

storiesOf('Calendar Editor formats', module)
  .add('DD-MM-YYYY', () => (
    <NumPad.DateTime
      dateFormat="DD-MM-YYYY"
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="DD-MM-YYYY"
    />
  ))
  .add('MM-DD-YYYY', () => (
    <NumPad.DateTime
      dateFormat="MM-DD-YYYY"
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="MM-DD-YYYY"
    />
  ))
  .add('YYYY-MM-DD', () => (
    <NumPad.DateTime
      dateFormat="YYYY-MM-DD"
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="YYYY-MM-DD"
    />
  ))
  .add('DD**YYYY', () => (
    <NumPad.DateTime
      dateFormat="DD*MMM*YYYY"
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="DD*MMM*YYYY"
    />
  ));
