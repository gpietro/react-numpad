![Logo of the project](https://raw.githubusercontent.com/gpietro/react-numpad/master/logo.png)

# React numpad

[![Greenkeeper badge](https://badges.greenkeeper.io/gpietro/react-numpad.svg)](https://greenkeeper.io/)
[![BCH compliance](https://bettercodehub.com/edge/badge/gpietro/react-numpad?branch=master)](https://bettercodehub.com/)
[![npm version](https://badge.fury.io/js/react-numpad.svg)](https://badge.fury.io/js/react-numpad)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)

> **Version > 4.0.0**: API and components are changed.

A numpad for number, date and time, built with and for React.
It's written with the extensibility in mind. The idea of this project is to cover the majority of input types in a form.

## Demo / Examples

Live demo: [gpietro.github.io/docs](https://gpietro.github.io/docs)

## Installation

To use React-Numpad, install it from NPM and include it in your own React build process (using Webpack, etc).

```shell
npm install --save react-numpad
```

At this point you can import react-numpad in your application

```shell
import NumPad from 'react-numpad';
```

## Usage

React-NumPad generates an input field containing the selected value, so you can submit it as part of a standard form. You can also listen for changes with the onChange event property.
When the value is changed, onChange(selectedValue) will fire.

React-NumPad is built based on a "main" component (NumPad.js). Following the higher-order component technique, is possible to create new components by simply overriding few common properties.

| Property      | Type                 | Default      | Description                                                                                                                        |
| :------------ | :------------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `onChange`    | `function`           | **required** | function called when value change and is valid.                                                                                    |
| `placeholder` | `string`             | none         | text to display as input placeholder.                                                                                              |
| `label`       | `string`             | none         | text to display as input label.                                                                                                    |
| `position`    | `string`             | `flex-end`   | Position to the screen. `center`, `flex-start`, `flex-end`, `startBottomLeft`, `startBottomRight`, `startTopLeft`, `startTopRight` |
| `theme`       | `string` or `object` | `numpad`     | string as the name of the theme or object as custom styles.                                                                        |
| `value`       | `string` or `number` | none         | value (default) for the input field.                                                                                               |
| `sync`        | `boolean`            | false        | if true, callbacks calls while typing if the input is valid                                                                        |

> **Version > 4.0.0**: is possible to override the following component's functions

| Property       | Type       | Default | Description                              |
| :------------- | :--------- | :------ | :--------------------------------------- |
| `validation`   | `function` |         | Validates the input value                |
| `keyValidator` | `function` |         | Validates the enabled keys while typing  |
| `displayRule`  | `function` |         | Format the output value                  |

### NumPad.Number

Input field for numeric value.

> **Version > 4.0.0**: the components PositiveNumber, IntegerNumber, PositiveIntegerNumber are replaced with the props **decimal** and **negative**.

| Property   | Type                  | Default  | Description                                                                   |
| :--------- | :-------------------- | :------- | :---------------------------------------------------------------------------- |
| `decimal`  | `boolean` or `number` | **true** | True allows decimal numbers or is possible to specify the number of decimals. |
| `negative` | `bolean`              | **true** | True allows negative numbers                                                  |

```shell
<NumPad.Number
    onChange={(value) => { console.log('value', value)}}
    label={'Total'}
    placeholder={'my placeholder'}
    value={100}
    decimal={2}
/>
```

### NumPad.DateTime

Input field for date and time format.

> **Version > 4.0.0**: the input layout is now based on the date format, date time format or only time format property. Components Date and Time have been removed.

| Property     | Type     | Default          | Description                                                                                    |
| :----------- | :------- | :--------------- | :--------------------------------------------------------------------------------------------- |
| `dateFormat` | `string` | **'DD.MM.YYYY'** | Specify the date time format based on moment.js. Ex: 'DD.MM.YYYY', 'HH:mm', 'YYYY-MM-DD HH:mm' |

```shell
<NumPad.DateTime
    onChange={(value) => { console.log('value', value)} }
    dateFormat="DD.MM.YYYY HH:mm"
    label={'Input for date and time'}
/>

<NumPad.DateTime
    onChange={(value) => { console.log('value', value)} }
    dateFormat="HH:mm"
    label={'Input for time'}
/>
```

### NumPad.Calendar

Calendar input field.

| Property     | Type     | Default      | Description                                                                                                 |
| :----------- | :------- | :----------- | :---------------------------------------------------------------------------------------------------------- |
| `dateFormat` | `string` | `MM/DD/YYYY` | specify a different date format.                                                                            |
| `locale`     | `string` | `en`         | locale for days and months                                                                                  |
| `weekOffset` | `number` | `0`          | First day of the week, by default is Sunday                                                                 |
| `markers`    | `array`  | []           | list of dates to place a marker on Calendar. The string date format must be the same as dateFormat property |
| `min`        | `string` | none         | min value for validation                                                                                    |
| `max`        | `string` | none         | max value for validation                                                                                    |

```shell
<NumPad.Calendar
    onChange={value => console.log('changed', value)}
    label='Data di nascita'
    locale="it"
    dateFormat="DD.MM.YYYY"
    min="01.01.1900"
    markers={['01.03.2018', '06.03.2018']}
/>
```

> **Version > 4.1.0**

#### NumPad.Calendar with Times Picker ( can pick only hours for now )

| Property     | Type     | Default            | Description                               |
| :----------- | :------- | :----------------- | :---------------------------------------- |
| `dateFormat` | `string` | `MM/DD/YYYY HH:mm` | specify a different date format and time. |

### NumPad.Appointment

Available date time appointments picker.

| Property           | Type     | Default      | Description                                    |
| :----------------- | :------- | :----------- | :--------------------------------------------- |
| `appointmentDates` | `object` | **required** | object representing available dates with times |
| `dateFormat`       | `string` | `MM/DD/YYYY` | specify a different date format.               |
| `locale`           | `string` | `en`         | locale for days and months                     |

```shell
<NumPad.Appointment
    dateFormat={"DD.MM.YYYY"}
    dates={appointmentDates}
    locale={"it"}
    onChange={value => console.log("value", value)}
/>

const appointmentDates = {
    '01.04.2018': ['08:00', '09:00', '10:00', '11:00'],
    '03.04.2018': ['08:00', '09:00', '10:00'],
    '04.04.2018': ['08:00', '09:00', '10:00', '11:00', '17:00'],
    '09.04.2018': ['08:00', '10:00', '11:00', '15:00']
}
```

## Custom input

It's possible to override the InputField component by passing your input field as child component of NumPad.

```shell
<NumPad.Number onChange={(value) => console.log('value', value)}>
    <button>Click me!</button>
</NumPad.Number>
```

## Themes

There is only one theme available for now, in /styles folder, **numpad**.
Any css style is customizable using styled components.

It is possible to override a theme by defining an object with the theme properties:

```shell
const myTheme = {
  header: {
    primaryColor: '#263238',
    secondaryColor: '#f9f9f9',
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
    backgroundColor: '#CFD8DC'
  }
};


<NumPad.Number theme={myTheme}>
```

## Keyboard support

`0, 1, 2, ... 9`: input number.

`- and .`: input symbol.

`Esc`: close keypad or calendar.

`Enter`: submit value.

## Calendar swipe support

On mobile is possible to switch between months by swipe.

## Developing

```shell
git clone git@github.com:gpietro/react-numpad.git
cd react-numpad/
npm install
npm start
npm run storybook
```

Visit localhost:6006 to see the NumPad components available so far.

### Build

```shell
npm run build
```

A bundle will be created in the dist directory.

## Contribute

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

See our [CONTRIBUTING.md](https://github.com/gpietro/react-numpad/blob/master/CONTRIBUTING.md) for information on how to contribute.

## License

MIT Licensed. Copyright (c) Pietro Ghezzi 2017-2018.
