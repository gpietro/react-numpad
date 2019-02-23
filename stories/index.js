/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import { specs, describe, it } from 'storybook-addon-specifications';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { expect } from 'chai';
import styled from 'styled-components';
import NumPad from '../lib';
import Modal from './DemoModal';
import { appointmentDates } from './data';

configure({ adapter: new Adapter() });

const DisplayContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const oddValidator = value =>
  parseInt(value, 10) > 0 && parseInt(value, 10) % 2 !== 0 && parseFloat(value) % 1 === 0;

function StateValueTestComponent(props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <NumPad.Number
      onChange={v => {
        console.log('on change', v);
        setValue(v);
      }}
      cancel={() => console.log('cancel value')}
      position="startBottomLeft"
      label={`Number: Value(${value}) - Prop(${props.value}): `}
      value={value}
      negative={false}
      decimal={2}
    />
  );
}

storiesOf('Number', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <DisplayContainer>
      <div>
        <NumPad.Number onChange={action('onChange')} position="startBottomLeft" label="Number" />
      </div>
      <NumPad.Number
        onChange={action('onChange')}
        position="startBottomLeft"
        label="Number"
        inline
      />
    </DisplayContainer>
  ))
  .add('hooks and mutable props example', () => {
    const value = number('Default value', 70, { range: true, min: 0, max: 90, step: 5 });
    return <StateValueTestComponent value={value} />;
  })
  .add('initial value', () => {
    const Demo = () => {
      const [value, setValue] = useState(
        number('Default value', 70, { range: true, min: 0, max: 90, step: 5 })
      );

      return (
        <DisplayContainer>
          <div>
            <NumPad.Number
              onChange={value => setValue(value)}
              cancel={() => console.log('cancel value')}
              position="startBottomLeft"
              label="Number"
              value={value}
              negative={false}
              decimal={2}
            />
          </div>
          <NumPad.Number
            onChange={action('onChange')}
            cancel={() => console.log('cancel value')}
            position="startBottomRight"
            label="Number"
            value={value}
            negative={false}
            decimal={2}
          />
        </DisplayContainer>
      );
    };

    return <Demo />;
  })
  .add('positive number', () => (
    <NumPad.Number
      onChange={action('onChange')}
      value=""
      label="Number"
      decimal
      negative={false}
      position="center"
    />
  ))
  .add('positive integer', () => (
    <NumPad.Number
      decimal={false}
      negative={false}
      onChange={action('onChange')}
      value=""
      position="flex-start"
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
        sync
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
    <DisplayContainer>
      <div>
        <NumPad.DateTime
          dateFormat="HH:mm"
          onChange={action('onChange')}
          position="startBottomLeft"
          placeholder="HH:mm"
          sync
        />
      </div>
      <NumPad.DateTime
        dateFormat="HH:mm"
        onChange={action('onChange')}
        position="startBottomLeft"
        placeholder="HH:mm"
        sync
        inline
      />
    </DisplayContainer>
  ))
  .add('time with default → sync', () => {
    const formatString = text('format string', 'HH:mm');
    const Demo = () => {
      const [value, setValue] = useState('21:45');

      return (
        <NumPad.DateTime
          dateFormat={formatString}
          onChange={newValue => {
            console.log('update value', newValue);
            setValue(newValue);
          }}
          position="startBottomLeft"
          value={value}
          placeholder={formatString}
          sync
        />
      );
    };
    return <Demo />;
  })
  .add('Datetime', () => {
    const Demo = () => {
      const [value, setValue] = useState();

      return (
        <NumPad.DateTime
          dateFormat="DD-MM-YYYY HH:mm"
          placeholder="DD-MM-YYYY HH : mm"
          onChange={newValue => {
            console.log('update value', newValue);
            setValue(newValue);
          }}
          position="startBottomLeft"
          value={value}
          sync
        />
      );
    };
    return <Demo />;
  })
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
  .add('default', () => {
    const Demo = () => {
      const [value, setValue] = useState();

      return (
    <DisplayContainer>
      <div>
        <NumPad.Calendar
          dateFormat="DD MMMM YYYY"
          onChange={value => setValue(value)}
          locale="it"
          placeholder="DD MMMM YYYY"
          value={value}
        />
      </div>
    </DisplayContainer>
  )}
  return <Demo />
}).add('inline', () => (
  <NumPad.Calendar
          dateFormat="DD MMMM YYYY"
          locale="it"
          placeholder="DD MMMM YYYY"
          position='fullscreen'
          inline
        />
))
  .add('initial value', () => {
    const Demo = () => {
      const [value, setValue] = useState();
      return (
        <NumPad.Calendar
          dateFormat="DD-MM-YYYY"
          onChange={value => setValue(value)}
          position="startBottomLeft"
          value={value}
          placeholder="DD-MM-YYYY"
        />
      );
    };
    return <Demo />;
  })
  .add('Calendar with time picker', () => {
    const Demo = () => {
      const [value, setValue] = useState();
      console.log('value', value)
      return (
        <NumPad.Calendar
          dateFormat="DD-MM-YYYY"
          timeFormat=" HH:mm"
          onChange={setValue}
          value="29-12-1978 10:00"
          placeholder="date and time"
          value={value}
        />)}
    return <Demo />
      });

storiesOf('Appointment Editor', module)
  .add('default', () => (
    <DisplayContainer>
      <div>
        <NumPad.Appointment
          dates={appointmentDates}
          dateFormat="DD-MM-YYYY"
          onChange={action('onChange')}
          position="startBottomLeft"
          placeholder="DD-MM-YYYY"
        />
      </div>

      
    </DisplayContainer>
  ))
  .add('inline', () => (
<NumPad.Appointment
        dates={appointmentDates}
        dateFormat="DD-MM-YYYY"
        onChange={action('onChange')}
        position="fullscreen"
        placeholder="DD-MM-YYYY"
        inline
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
