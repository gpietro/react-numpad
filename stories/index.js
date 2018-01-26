import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import NumPad from '../lib';

storiesOf('Components', module)
  .add('Number', () => [
    <div key="story-1">
      <NumPad.Number
        key="number-1"
        placeholder="test"
        theme="orange"
        onChange={value => {
          console.log('value', value);
        }}
        label="Totale"
        defaultValue={10}
      >
        <input placeholder="test" type="number" />
        <button>ciao</button>
      </NumPad.Number>
    </div>,
    <NumPad.Date
      key="issue-1"
      onChange={value => {
        console.log('value', value);
      }}
      placeholder="birthdate"
      dateFormat="DD.MM.YYYY"
    >
      <input className="form-control input-lg" />
      <button>Pinco palla</button>
    </NumPad.Date>,
    <NumPad.PositiveNumber
      key="number-2"
      onChange={value => {
        console.log('value', value);
      }}
      label="Positive"
    />,
    <NumPad.IntegerNumber
      key="number-3"
      onChange={value => {
        console.log('value', value);
      }}
      label="Integer"
    />,
    <NumPad.PositiveIntegerNumber
      key="number-4"
      onChange={value => {
        console.log('value', value);
      }}
      label="Positive integer"
    />,
  ])
  .add('Time', () => [
    <NumPad.Time
      key="time-1"
      placeholder="HH:mm"
      label="Sveglia"
      onChange={value => console.log('changed', value)}
      defaultValue={'12:33'}
    />,
    <NumPad.Time
      key="time-2"
      theme="blackAndWhite"
      onChange={value => console.log('changed', value)}
    />,
    <LoremIpsum key="lorem" />,
  ])
  .add('Inside modal', () => (
    <DemoModal>
      <NumPad.Time
        key="time-1"
        placeholder="HH:mm"
        label="Sveglia"
        onChange={value => console.log('changed', value)}
      />
      <NumPad.Time
        key="time-2"
        theme="blackAndWhite"
        onChange={value => console.log('changed', value)}
      />
      <NumPad.Calendar
        onChange={value => console.log('changed', value)}
        label={'Data di nascita'}
        locale="it"
        dateFormat="DD.MM.YYYY"
        minDate={'20.01.2018'}
        maxDate={'30.01.2018'}
      />
    </DemoModal>
  ))
  .add('Numpad date', () => [
    <NumPad.Date
      key="date-1"
      placeholder="D.M.Y"
      dateFormat="DD.MM.YYYY"
      label="Data di nascita"
      onChange={value => console.log('changed', value)}
      defaultValue={'28.06.1986'}
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
      defaultValue={'28.06.1986 10:00'}
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
        label="Restilizzato"
      />
    );
  })
  .add('Date US', () => [
    <NumPad.Calendar
      key="numpad-date"
      onChange={value => console.log('changed', value)}
      label={'Birthdate'}
      locale="en"
      dateFormat="MM/DD/YYYY"
      minDate={'01/20/2018'}
      maxDate={'01/30/2018'}
    >
      <input type="text" style={{ boder: '2px solid red', width: '300px' }} />
    </NumPad.Calendar>,
    <LoremIpsum key="lorem" />,
  ])
  .add('Date CH-IT', () => (
    <NumPad.Calendar
      onChange={value => console.log('changed', value)}
      label={'Data di nascita'}
      locale="it"
      theme={'orange'}
      dateFormat="DD.MM.YYYY"
      defaultValue={'28.06.1986'}
    />
  ));

const LoremIpsum = () => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce pellentesque nulla eget eros
    tempor porta. Fusce quis leo ante. Cras vestibulum tincidunt mi, consequat euismod augue congue
    ac. Curabitur nulla neque, hendrerit nec est eu, gravida dignissim quam. Sed tincidunt finibus
    orci, sit amet condimentum metus ullamcorper ut. Suspendisse odio tortor, pretium vitae nisl ac,
    cursus iaculis odio. Suspendisse rhoncus dui commodo ligula facilisis, ut condimentum metus
    volutpat. Praesent bibendum venenatis ornare. Praesent eu luctus lacus, et varius nibh. Aliquam
    elit lectus, egestas ut sagittis gravida, consectetur quis justo. Fusce sed gravida est.
    Phasellus lectus tellus, fringilla sit amet ipsum ac, volutpat pharetra ipsum. Aenean lorem
    turpis, luctus a ullamcorper sit amet, mattis in leo. Suspendisse potenti. Nunc consequat quam
    eu commodo pretium. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent
    finibus massa vel mattis efficitur. In auctor dictum ante, non tincidunt augue laoreet a. Fusce
    quis maximus sem, sed congue ante. Praesent imperdiet elit at nisi pulvinar tincidunt. Sed sed
    volutpat libero, eget placerat mauris. Sed bibendum leo ligula, sit amet hendrerit arcu iaculis
    rhoncus. Proin porta ligula magna, ac commodo tortor lobortis vitae. Nulla et massa vulputate,
    pellentesque nisi sit amet, venenatis erat. Sed nisi ex, mollis sit amet vestibulum a, efficitur
    eget nulla. Sed vulputate ligula sed mauris facilisis laoreet. Donec facilisis id eros nec
    facilisis. Phasellus laoreet sem vitae lorem cursus, eget consequat leo condimentum. Vivamus
    consequat sapien at mattis luctus. Nulla varius, felis a hendrerit pulvinar, magna augue tempor
    sem, cursus convallis urna erat ut leo. Quisque aliquam turpis ante, at venenatis nibh suscipit
    et. Integer scelerisque mollis tristique. Praesent sed lorem et lorem lobortis tristique. Nam
    venenatis at nibh id accumsan. Cras ultricies massa id pharetra venenatis. In ac efficitur nunc.
    Phasellus eu diam commodo sapien finibus posuere. Phasellus vel eros elit. Curabitur accumsan
    velit ac elit tincidunt, a efficitur mauris imperdiet. Suspendisse a scelerisque lacus. Praesent
    at elit quis tellus lacinia ornare. Nunc vehicula pharetra nulla a iaculis. Vestibulum eleifend
    accumsan vestibulum. Donec id nibh eleifend, rhoncus risus ac, vulputate erat. Quisque eleifend
    imperdiet tempor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
    cubilia Curae; Curabitur ullamcorper, nisl sit amet venenatis lobortis, nunc nibh dictum metus,
    sed congue neque diam at diam. Nunc sem dui, laoreet non ante ac, consectetur pellentesque dui.
    Phasellus congue dignissim metus, et tempus ex blandit et. Aliquam elementum, leo quis gravida
    vehicula, justo neque porttitor tortor, eget volutpat sem lacus id lorem. Vestibulum ante ipsum
    primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nunc tortor tellus, fermentum
    vitae volutpat vitae, placerat ut lorem. Proin malesuada varius diam quis tempus. Fusce molestie
    massa ut turpis facilisis, ac ornare ligula cursus. Aliquam ligula ligula, maximus eu mattis
    elementum, tempor vel sapien. Nullam sit amet metus vitae ante ornare pharetra a id nibh.
    Suspendisse consectetur libero ante, id sodales lacus varius eu. Sed vehicula vulputate auctor.
    Quisque varius diam dui, at sollicitudin felis fringilla in. Pellentesque habitant morbi
    tristique senectus et netus et malesuada fames ac turpis egestas. Ut a consectetur ligula.
    Curabitur commodo maximus massa quis aliquam.
  </div>
);

class DemoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>Open modal</Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={false}
        >
          <ModalHeader toggle={this.toggle}>Demo Modal</ModalHeader>
          <ModalBody>{this.props.children}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
