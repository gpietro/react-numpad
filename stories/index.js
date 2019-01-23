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

import { NumPad, NumberEditor, CalendarDate, DateTimeEditor, Appointment } from '../lib';
import Modal from './DemoModal';
import { appointmentDates } from './data';

configure({ adapter: new Adapter() });

const oddValidator = value =>
  parseInt(value, 10) > 0 && parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

storiesOf('Number', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <NumberEditor onChange={action('onChange')} position="startBottomLeft" label="Number" />
  ))
  .add('initial value', () => {
    const value = number('Default value', 70, { range: true, min: 0, max: 90, step: 5 });
    return (
      <NumberEditor
        onChange={action('onChange')}
        position="startBottomLeft"
        label="Number"
        value={value}
      />
    );
  })
  .add('positive number', () => (
    <NumberEditor
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
      decimal
      sign={false}
    />
  ))
  .add('positive integer', () => (
    <NumberEditor
      decimal={false}
      sign={false}
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
    />
  ))
  .add('positive & negative number', () => (
    <NumberEditor
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
      decimal
      sign
    />
  ))
  .add('positive & negazive integer', () => (
    <NumberEditor
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
      <NumberEditor
        onChange={action('onChange')}
        value=""
        position="startBottomLeft"
        label="Number"
      />
    );
  })
  .add('odd numbers with custom validator', () => (
    <NumberEditor
      keyValidator={oddValidator}
      onChange={action('onChange')}
      value=""
      position="startBottomLeft"
      label="Number"
    />
  ))
  .add('custom input field', () => (
    <NumberEditor onChange={action('onChange')} value="5" position="startBottomLeft">
      <input type="text" />
      <button>culo</button>
    </NumberEditor>
  ))
  .add('testing numbers', () => {
    const story = (
      <NumberEditor
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
    <NumPad onChange={action('onChange')} position="startBottomLeft" placeholder="HH : mm" sync>
      <DateTimeEditor dateFormat="HH:mm" />
    </NumPad>
  ))
  .add('time with default', () => {
    const formatString = text('format string', 'HH:mm');
    const value = text('initial value', '21:45');
    return (
      <NumPad
        onChange={action('onChange')}
        position="startBottomLeft"
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
      position="startBottomLeft"
      placeholder="DD-MM-YYYY HH : mm"
    >
      <DateTimeEditor dateFormat="DD-MM-YYYY HH : mm" />
    </NumPad>
  ))
  .add('Datetime date format', () => {
    const dateFormat = text('Date format', 'DD.MM.YYYY HH:mm');
    return (
      <NumPad onChange={action('onChange')} position="startBottomLeft" placeholder={dateFormat}>
        <DateTimeEditor dateFormat={dateFormat} />
      </NumPad>
    );
  });

storiesOf('Calendar Editor', module)
  .add('default', () => (
    <NumPad
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="DD-MM-YYYY"
    >
      <CalendarDate dateFormat="DD MMMM YYYY" />
    </NumPad>
  ))
  .add('initial value', () => (
    <NumPad
      onChange={action('onChange')}
      position="startBottomLeft"
      value="29-12-1978"
      placeholder="DD-MM-YYYY"
    >
      <CalendarDate dateFormat="DD-MM-YYYY" />
    </NumPad>
  ));

storiesOf('Appointment Editor', module)
  .add('default', () => (
    <NumPad onChange={action('onChange')} position="startBottomLeft" placeholder="DD-MM-YYYY">
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

    <NumberEditor
      style={{ fontSize: '10px' }}
      key="number-1"
      placeholder="test"
      theme="orange"
      onChange={action('selected value')}
      position="startBottomLeft"
      label="Totale"
      value={10}
    />
  </Modal>
));

storiesOf('Calendar Editor formats', module)
  .add('DD-MM-YYYY', () => (
    <NumPad
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="DD-MM-YYYY"
    >
      <DateTimeEditor dateFormat="DD-MM-YYYY" />
    </NumPad>
  ))
  .add('MM-DD-YYYY', () => (
    <NumPad
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="MM-DD-YYYY"
    >
      <DateTimeEditor dateFormat="MM-DD-YYYY" />
    </NumPad>
  ))
  .add('YYYY-MM-DD', () => (
    <NumPad
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="YYYY-MM-DD"
    >
      <DateTimeEditor dateFormat="YYYY-MM-DD" />
    </NumPad>
  ))
  .add('DD**YYYY', () => (
    <NumPad
      onChange={action('onChange')}
      position="startBottomLeft"
      locale="it"
      placeholder="DD*MMM*YYYY"
    >
      <DateTimeEditor dateFormat="DD*MMM*YYYY" />
    </NumPad>
  ));
