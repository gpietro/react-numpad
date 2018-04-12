import React from 'react';
import moment from 'moment';

const appointmentDates = {
  [moment().format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(6, 'days')
    .format('DD.MM.YYYY')]: ['08:00', '08:30', '09:00', '09:30', '10:00', '11:00'],
  [moment()
    .add(10, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(11, 'days')
    .format('DD.MM.YYYY')]: ['08:00', '08:30', '09:00', '09:30'],
  [moment()
    .add(12, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '13:30',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(13, 'days')
    .format('DD.MM.YYYY')]: ['08:00', '08:30', '09:00', '09:30', '10:00', '11:00'],
  [moment()
    .add(18, 'days')
    .format('DD.MM.YYYY')]: ['08:00', '08:30', '09:00', '09:30'],
  [moment()
    .add(20, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(21, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '12:00',
    '13:00',
    '13:30',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(22, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '12:00',
    '13:00',
    '13:30',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(23, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '12:00',
    '13:00',
    '13:30',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(31, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(54, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(55, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
  [moment()
    .add(51, 'days')
    .format('DD.MM.YYYY')]: [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
  ],
};

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

export { appointmentDates, LoremIpsum };
