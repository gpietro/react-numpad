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

All NumPad components, except Calendar, share the base component, following the higher-order component technique. This allows to create new components (Time, Number, Date,...) by simply overriding few common properties.

### NumPad.Number
Input field for integer value.

```shell
<NumPad.Number 
    onChange={(value) => { console.log('value', value)}} 
    label={'Total'} 
/>
```

| Property | Type | Default | Description
:---|:---|:---|:---|:---
| `validation` | function | value => true | function responsible to validate the input value and be able to override it with custom validation. If the value is not valid, the onChange function is not called. |
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
| `validation` | function | value => true | function responsible to validate the input value and be able to override it with custom validation. If the value is not valid, the onChange function is not called. |
| `displayRule` | function | value => value | function responsible to display the value in a certain form. By default the value is displayed unchanged. |

### NumPad.Date
CurrentDate must be provided as moment date. The default value is the local current date time.

```shell
<NumPad.Date
    onChange={(value) => { console.log('value', value)}} 
    label={'Departure date'} 
/>
```

### NumPad.Calendar
Input field with a calendar as a date picker

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

And state what happens step-by-step.

### Building

If your project needs some additional steps for the developer to build the
project after some code changes, state them here:

```shell
./configure
make
make install
```

Here again you should state what actually happens when the code above gets
executed.

### Deploying / Publishing

In case there's some step you have to take that publishes this project to a
server, this is the right time to state it.

```shell
packagemanager deploy awesome-project -s server.com -u username -p password
```

And again you'd need to tell what the previous code actually does.

## Features

What's all the bells and whistles this project can perform?
* What's the main functionality
* You can also do another thing
* If you get really randy, you can even do this

## Configuration

Here you should write what are all of the configurations a user can enter when
using the project.

#### Argument 1
Type: `String`  
Default: `'default value'`

State what an argument does and how you can use it. If needed, you can provide
an example below.

Example:
```bash
awesome-project "Some other value"  # Prints "You're nailing this readme!"
```

#### Argument 2
Type: `Number|Boolean`  
Default: 100

Copy-paste as many of these as you need.

## Contributing

When you publish something open source, one of the greatest motivations is that
anyone can just jump in and start contributing to your project.

These paragraphs are meant to welcome those kind souls to feel that they are
needed. You should state something like:

"If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome."

If there's anything else the developer needs to know (e.g. the code style
guide), you should link it here. If there's a lot of things to take into
consideration, it is common to separate this section to its own file called
`CONTRIBUTING.md` (or similar). If so, you should say that it exists here.

## Licensing

One really important part: Give your project a proper license. Here you should
state what the license is and how to find the text version of the license.
Something like:

"The code in this project is licensed under MIT license."