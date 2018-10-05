import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import NumPad from '../lib';
import Modal from './DemoModal';
import { appointmentDates, LoremIpsum } from './data';

const numberStories = storiesOf('Number', module);
numberStories.addDecorator(withKnobs);

numberStories
  .add('Input number', () => [
    <div key="story-1" style={{ marginBottom: '400px' }}>
      <p>Input nubmer teset</p>
      <ChangeProps>
        <NumPad.Number
          style={{ fontSize: '10px' }}
          key="number-1"
          placeholder="test"
          theme="orange"
          onChange={value => {
            console.log('value', value);
          }}
          position="startBottomLeft"
          label="Totale"
          sync={true}
        >
          <input type="text" placeholder="test" />
          <Button />
        </NumPad.Number>
      </ChangeProps>
    </div>,
    <LoremIpsum key="lorem" />,
    <NumPad.Date
      key="issue-1"
      onChange={value => {
        console.log('value', value);
      }}
      position="startTopLeft"
      placeholder="birthdate"
      dateFormat="DD.MM.YYYY"
    />,
    <NumPad.PositiveNumber
      key="number-2"
      onChange={value => {
        console.log('value', value);
      }}
      position="startTopRight"
      label="Positive"
    />,
    <NumPad.IntegerNumber
      key="number-3"
      onChange={value => {
        console.log('value', value);
      }}
      position="flex-start"
      label="Integer"
      value="-ciao100.99"
    />,
    <NumPad.PositiveIntegerNumber
      key="number-4"
      onChange={value => {
        console.log('value', value);
      }}
      value="-ciao100.99"
      position="startBottomRight"
      label="Positive integer"
    />,
    <NumPad.Number onChange={() => {}} value="-100.99" />,
  ])
  .add('Time', () => [
    <NumPad.Time
      key="time-1"
      placeholder="HH:mm"
      label="Sveglia"
      onChange={value => console.log('changed', value)}
      sync={true}
      value={'12:33'}
    />,
    <NumPad.Time
      key="time-2"
      theme="blackAndWhite"
      sync={true}
      onChange={value => console.log('changed', value)}
    />,
    <LoremIpsum key="lorem" />,
  ])
  .add('Numpad date', () => [
    <NumPad.Date
      key="date-1"
      placeholder="D.M.Y"
      dateFormat="DD.MM.YYYY"
      label="Data di nascita"
      onChange={value => console.log('changed', value)}
      value={'28.06.1986'}
    />,
    <LoremIpsum key="lorem" />,
  ])
  .add('Numpad date time', () => [
    <NumPad.DateTime
      key="date-1"
      label="Data e ora"
      onChange={value => console.log('changed', value)}
    />,
    <NumPad.DateTime
      key="date-2"
      dateFormat="DD.MM.YYYY"
      onChange={value => console.log('changed', value)}
      value={'28.06.1986 10:00'}
    />,
    <LoremIpsum key="lorem" />,
  ])
  .add('Styled component', () => {
    const StyledNumber = styled(NumPad.Number)`
      color: green;
      button {
        color: red;
      }
      .numpad-input-value {
        input {
          border: 2px solid #333;
        }
        button {
          color: navy;
        }
      }
    `;
    return (
      <StyledNumber
        key="number-1"
        onChange={value => {
          console.log('value', value);
        }}
        sync={true}
        label="Restilizzato"
      >
        <input type="text" />
      </StyledNumber>
    );
  });
storiesOf('Calendar', module)
  .add('Date US', () => [
    <NumPad.Calendar
      key="numpad-date"
      onChange={value => console.log('changed', value)}
      label={'Birthdate'}
      locale="en"
      dateFormat="MM/DD/YYYY"
      position="startBottomLeft"
      min={'01/20/2018'}
      max={'01/30/2018'}
    >
      <input type="text" style={{ boder: '2px solid red', width: '300px' }} />
    </NumPad.Calendar>,
    <LoremIpsum key="lorem" />,
  ])
  .add('Date CH-IT', () => (
    <NumPad.Calendar
      label="data in italiano"
      dateFormat={'DD.MM.YYYY'}
      position="fullscreen"
      locale={'it'}
      onChange={value => console.log('value', value)}
    />
  ))
  .add('Inside modal', () => (
    <Modal>
      <h4>Test component inside a modal</h4>
      <NumPad.Number
        style={{ fontSize: '10px' }}
        key="number-1"
        placeholder="test"
        theme="orange"
        onChange={value => {
          console.log('value', value);
        }}
        position="startBottomLeft"
        label="Totale"
        value={10}
      >
        <input type="text" placeholder="test" />
        <Button />
      </NumPad.Number>
      <hr />
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
      />
    </Modal>
  ));

storiesOf('Appointment', module)
  .add('Events', () => (
    <NumPad.Appointment
      dateFormat={'DD.MM.YYYY'}
      dates={appointmentDates}
      locale={'it'}
      value={'20.04.2018 10:00'}
      position={'startBottomLeft'}
      onChange={value => console.log('value', value)}
    />
  ))
  .add('Events fullscreen', () => (
    <NumPad.Appointment
      dateFormat={'DD.MM.YYYY'}
      position={'fullscreen'}
      dates={appointmentDates}
      locale={'it'}
      onChange={value => console.log('value', value)}
    />
  ));

class Button extends React.Component {
  render() {
    console.log('props', this.props);
    return <button {...this.props}>click me</button>;
  }
}

class ChangeProps extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 1 };
  }
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              value: Math.floor(Math.random() * Math.floor(100)),
            })
          }
        >
          Gen new value
        </button>
        <div>
          {React.Children.map(this.props.children, child =>
            React.cloneElement(child, { value: this.state.value })
          )}
        </div>
      </div>
    );
  }
}
