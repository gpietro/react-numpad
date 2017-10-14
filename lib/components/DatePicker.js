import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectGlobal } from 'styled-components'
import { InputField, KeyPadWrapper, Calendar } from '../elements'
import globalCSS from '../styles/global-css'
import calendarCSS from '../styles/calendar-css'

injectGlobal`${ globalCSS, calendarCSS }`

export default ({validation, displayRule, inputButtonContent}) => (
    class DatePicker extends Component {
        constructor(props) {
            super(props)
            this.state = { show: false, value: '' }
            this.toggleCalendar = this.toggleCalendar.bind(this)
        }

        toggleCalendar(value) {
            let updateValue = this.state.show && validation(value, this.props.dateFormat) ? {value} : {}
            this.setState((prevState) => (
                Object.assign({}, { show: !prevState.show }, updateValue)), 
                () => this.props.onChange(value)
            )
        }

        render() {
            const {show, value} = this.state
            const { placeholder, label, locale, dateFormat } = this.props

            return [
                <InputField
                    key='input-field'
                    placeholder={placeholder}
                    showKeyPad={this.toggleCalendar}
                    value={displayRule(value)}
                    label={label}
                    disabled={this.state.show}
                    buttonContent={inputButtonContent} />,
                show &&
                    <KeyPadWrapper key={`key-pad-wrapper`}>
                        <Calendar
                            locale={locale}
                            dateFormat={dateFormat}
                            hideCalendar={this.toggleCalendar}
                        />
                    </KeyPadWrapper>
            ]
        }
    }
)