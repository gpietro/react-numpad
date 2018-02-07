![Logo of the project](https://raw.githubusercontent.com/gpietro/react-numpad/master/logo.png)

# React numpad

[![Greenkeeper badge](https://badges.greenkeeper.io/gpietro/react-numpad.svg)](https://greenkeeper.io/)
[![BCH compliance](https://bettercodehub.com/edge/badge/gpietro/react-numpad?branch=master)](https://bettercodehub.com/)

A numpad for number, date and time, built with and for React.
It's written with the extensibility in mind. The idea of this project is to cover the majority of input types in a form.

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

### NumPad.Number

Input field for numeric value. There are also **PositiveNumber**, **IntegerNumber**, **PositiveIntegerNumber** components with the same properties.

```shell
<NumPad.Number
    onChange={(value) => { console.log('value', value)}}
    label={'Total'}
    placeholder={'my placeholder'}
    defaultValue={100}
/>
```

### NumPad.Time

Input field with time format.

```shell
<NumPad.Time
    onChange={(value) => { console.log('value', value)}}
    label={'Departure time'}
    placeholder={'my placeholder'}
/>
```

### NumPad.Date

Input field with date format.

```shell
<NumPad.Date
    onChange={(value) => { console.log('value', value)}}
    label={'Data di nascita di partenza'}
/>
```

### NumPad.DateTime

Input field with date and time format.

```shell
<NumPad.DateTime
    onChange={(value) => { console.log('value', value)}}
    dateFormat={'DD.MM.YYYY'}
    label={'Data e ora di partenza'}
    defaultValue={'10.02.2018 10:00'}
/>
```

### NumPad.Calendar

Calendar input field.

```shell
<NumPad.Calendar
    onChange={value => console.log('changed', value)}
    label='Data di nascita'
    locale="it"
    dateFormat="DD.MM.YYYY"
    minDate="01.01.1900"
/>
```

## Properties

| Property             | Type                 | Default      | Description                                                 |
| :------------------- | :------------------- | :----------- | :---------------------------------------------------------- |
| `onChange`           | `function`           | **required** | function called when value change and is valid.             |
| `placeholder`        | `string`             | none         | text to display as input placeholder.                       |
| `label`              | `string`             | none         | text to display as input label.                             |
| `position`           | `string`             | `flex-end`   | Position to the screen. `center`, `flex-start`, `flex-end`  |
| `theme`              | `string` or `object` | `blue`       | string as the name of the theme or object as custom styles. |
| `dateFormat`         | `string`             | `MM/DD/YYYY` | specify a different date format.                            |
| `defaultValue`       | `string` or `number` | none         | default value for the input field.                          |
| `locale`             | `string`             | `en`         | locale for days and months                                  |
| `inputButtonContent` | `object`             | none         | override input button content                               |
| `minDate`            | `string`             | none         | min date for calendar input validation                      |
| `maxDate`            | `string`             | none         | max date for calendar input validation                      |

## Custom input field

It's possible to override the InputField component by passing your input field as child component of NumPad.

```shell
<NumPad.Number onChange={(value) => console.log('value', value)}>
    <button>Click me!</button>
</NumPad.Number>
```

## Themes

There are themes available, in /styles folder, you can choose from: **blue**, **orange**, **blackAndWhite**.
Any css style is customizable using styled components.
To install styled-components

```shell
npm install styled-components
```

Usage example

```shell
import styled from 'styled-components';
import NumPad from 'react-numpad';

const Styled = styled(NumPad)`
    ${InputField} {
        background: red;
    }
`
```

Another way is to define an object as theme prop.

```shell
const myTheme = {
    color: {
        primary: '#383D3B',
        secondary: '#32a5f2',
        light: '#999',
    },
    background: {
        primary: '#f9f9f9',
    },
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

## Demo / Examples

Live demo: [gpietro.github.io/docs](https://gpietro.github.io/docs)

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

MIT Licensed. Copyright (c) Pietro Ghezzi 2017.
