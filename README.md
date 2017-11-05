![Logo of the project](https://bitbucket.org/bpietro86/react-numpad/raw/master/logo.png)

# React numpad
A numpad for number, date and time, built with and for React.

## Installation
The easiest way to use React-Numpad is to install it from NPM and include it in your own React build process (using Webpack, etc).

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

All NumPad components, except Calendar, share a base component, following the higher-order component technique. This allows to create new components (Time, Number, Date,...) by simply overriding few common properties.

### NumPad.Number
Input field for numeric value.

```shell
<NumPad.Number 
    onChange={(value) => { console.log('value', value)}} 
    label={'Total'} 
/>
```

| Property | Type | Default | Description
:---|:---|:---|:---|:---
| `validation` | function | value => true | function responsible to validate the input value. Override for  custom validation. If the value is not valid, the onChange function is not fired. |
| `displayRule` | function | value => value | function responsible to display the value in a certain form. By default the value is displayed unchanged. |

### NumPad.Time
Input field with time format.
```shell
<NumPad.Time 
    onChange={(value) => { console.log('value', value)}} 
    label={'Departure date'} 
/>
```
| Property | Type | Default | Description
:---|:---|:---|:---|:---
| `validation` | function | value => true | function responsible to validate the input value. Override for  custom validation. If the value is not valid, the onChange function is not fired. |
| `displayRule` | function | value => value | function responsible to display the value in a certain form. By default the value is displayed unchanged. |

### NumPad.Date
CurrentDate must be provided as moment date. The default value is the local current date time.

```shell
<NumPad.Date
    onChange={(value) => { console.log('value', value)}} 
    label={'Departure date'} 
/>
```


## Common properties
| Property | Type | Default | Description
:---|:---|:---|:---|:---
| `numberOfDigits` | integer | undefined | limit the number of digits if defined. |
| `float` | boolean | true | flag to allow floating point value. |
| `negative` | boolean | true | flag to allow floating point value. |
| `inputButtonContent` | object | undefined | icon or text to display as input button content. |
| `onChange` | function | undefined | function called when value change and is valid. |
| `value` | integer | undefined | default input value. |
| `placeholder` | string | undefined | text to display as input placeholder. |
| `label` | string | undefined | text to display as input label. |

## Demo / Examples

## Developing

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://bitbucket.org/bpietro86/react-numpad
cd react-numpad/
npm install
npm start
npm run storybook
```

Visit localhost:6006 to see the available NumPad components available so far. Storybook is helpful during development to see how the components behaves and looks.

### Build
```shell
npm run build
```

A bundle will be created in the dist directory.

## Contribute
If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

See our [CONTRIBUTING.md](https://bitbucket.org/bpietro86/react-numpad/raw/master/CONTRIBUTING.md) for information on how to contribute.

## License
MIT Licensed. Copyright (c) Pietro Ghezzi 2017.