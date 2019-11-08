import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconAccessTime from '@material-ui/icons/AccessTimeSharp';
import IconCalendarToday from '@material-ui/icons/CalendarTodaySharp';

import moment from 'moment';
import {
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  IconButton,
  Link,
} from '@material-ui/core';
import NumPad from '../lib';

const useStyles = makeStyles({
  card: {
    margin: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
    .add(1, 'days')
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
    .add(3, 'days')
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
    .add(4, 'days')
    .format('DD.MM.YYYY')]: ['08:00', '08:30', '09:00', '09:30'],
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
};

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'any.number':
      return { anyNumber: action.value };
    case 'positive.number':
      return { positiveNumber: action.value };
    case 'integer.number':
      return { integerNumber: action.value };
    case 'positiveInteger.number':
      return { positiveIntegerNumber: action.value };
    case 'any.time':
      return { anyTime: action.value };
    case 'any.date':
      return { anyDate: action.value };
    case 'time.date':
      return { timeDate: action.value };
    case 'italian.calendar':
      return { italianCalendar: action.value };
    case 'default.calendar':
      return { defaultCalendar: action.value };
    case 'markers.calendar':
      return { markersCalendar: action.value };
    case 'any.appointment':
      return { anyAppointment: action.value };
    case 'fullscreen.appointment':
      return { fullscreenAppointment: action.value };
    default:
      throw new Error();
  }
};

const NumPadDemo = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5">Number</Typography>
            <Grid container alignItems="center">
              <Grid item sm xs={12}>
                <NumPad.Number
                  onChange={value => dispatch({ type: 'any.number', value })}
                  position="flex-end"
                >
                  <Grid container alignItems="center">
                    <Grid item xs>
                      <TextField label="Any number" value={state.anyNumber} />
                    </Grid>
                    <Grid item xs>
                      <Button color="primary">Click me</Button>
                    </Grid>
                  </Grid>
                </NumPad.Number>
              </Grid>
              <Grid item sm xs={12}>
                <NumPad.Number
                  onChange={value => dispatch({ type: 'positive.number', value })}
                  theme="orange"
                  negative={false}
                  position="startTopLeft"
                  placeholder="Positive"
                >
                  <TextField label="Positive number" value={state.positiveNumber} />
                </NumPad.Number>
              </Grid>

              <Grid item sm xs={12}>
                <NumPad.Number
                  onChange={value => dispatch({ type: 'integer.number', value })}
                  decimal={false}
                  placeholder="Integer number"
                >
                  <TextField label="Integer number" value={state.integerNumber} />
                </NumPad.Number>
              </Grid>

              <Grid item sm xs={12}>
                <NumPad.Number
                  onChange={value => dispatch({ type: 'positiveInteger.number', value })}
                  decimal={false}
                  negative={false}
                >
                  <TextField label="PositiveInteger" value={state.positiveIntegerNumber} />
                </NumPad.Number>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5">Date, time and date time</Typography>
            <Grid container alignItems="center">
              <Grid item sm xs={12}>
                <NumPad.DateTime
                  onChange={value => dispatch({ type: 'any.time', value })}
                  position="startBottomLeft"
                  dateFormat="HH:mm"
                  placeholder="--:--"
                >
                  <TextField label="Time" value={state.anyTime} />
                  <IconButton>
                    <IconAccessTime />
                  </IconButton>
                </NumPad.DateTime>
              </Grid>

              <Grid item sm xs={12}>
                <NumPad.DateTime
                  onChange={value => dispatch({ type: 'any.date', value })}
                  dateFormat="DD.MM.YYYY"
                  placeholder="DD.MM.YYYY"
                >
                  <TextField label="Date DD.MM.YYYY" value={state.anyDate} />
                  <IconButton>
                    <IconCalendarToday />
                  </IconButton>
                </NumPad.DateTime>
              </Grid>

              <Grid item sm xs={12}>
                <NumPad.DateTime
                  onChange={value => dispatch({ type: 'time.date', value })}
                  dateFormat="YYYY-MM-DD HH:mm"
                >
                  <TextField label="DD.MM.YYYY HH:mm" value={state.timeDate} />
                  <IconButton>
                    <IconCalendarToday />
                  </IconButton>
                </NumPad.DateTime>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5">Calendar</Typography>
            <Grid container alignItems="center">
              <Grid item sm xs={12}>
                <NumPad.Calendar
                  dateFormat="DD.MM.YYYY"
                  locale="it"
                  onChange={value => dispatch({ type: 'italian.calendar', value })}
                >
                  <TextField label="Calendario italiano" value={state.italianCalendar} />
                </NumPad.Calendar>
              </Grid>

              <Grid item sm xs={12}>
                <NumPad.Calendar onChange={value => dispatch({ type: 'default.calendar', value })}>
                  <TextField label="Default calendar" value={state.defaultCalendar} />
                </NumPad.Calendar>
              </Grid>

              <Grid item sm xs={12}>
                <NumPad.Calendar
                  onChange={value => dispatch({ type: 'markers.calendar', value })}
                  dateFormat="DD.MM.YYYY"
                  markers={[
                    moment()
                      .subtract(4, 'days')
                      .format('DD.MM.YYYY'),
                    moment()
                      .add(1, 'days')
                      .format('DD.MM.YYYY'),
                  ]}
                  position="startTopLeft"
                >
                  <TextField label="markers" value={state.markersCalendar} />
                </NumPad.Calendar>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5">Appointment</Typography>
            <Grid container alignItems="center">
              <Grid item sm xs={12}>
                <NumPad.Appointment
                  dateFormat="DD.MM.YYYY"
                  dates={appointmentDates}
                  locale="it"
                  position="startTopLeft"
                  onChange={value => dispatch({ type: 'any.appointment', value })}
                >
                  <TextField label="Appuntamento" value={state.anyAppointment} />
                </NumPad.Appointment>
              </Grid>
              <Grid item sm xs={12}>
                <NumPad.Appointment
                  dateFormat="DD.MM.YYYY"
                  dates={appointmentDates}
                  position="fullscreen"
                  onChange={value => dispatch({ type: 'fullscreen.appointment', value })}
                >
                  <TextField label="Fullscreen" value={state.fullscreenAppointment} />
                </NumPad.Appointment>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card className={classes.card}>
          <CardContent>
            <Grid container alignItems="center">
              <Grid item sm xs={12}>
                <Typography variant="h5">About</Typography>
                <Link variant="body1" href="https://github.com/gpietro/react-numpad">
                  Github repo
                </Link>
                <br />
                <Link variant="body1" href="https://github.com/gpietro/react-numpad">
                  Contribute
                </Link>
              </Grid>

              <Grid item sm xs={12}>
                <Typography variant="h5">License</Typography>
                <Typography variant="body1">
                  MIT Licensed. Copyright (c) Pietro Ghezzi 2019.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default NumPadDemo;
