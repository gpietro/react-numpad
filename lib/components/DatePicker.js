import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { injectGlobal, ThemeProvider } from 'styled-components'
import moment from 'moment'
import { InputField, Wrapper, Calendar } from '../elements'
import globalCSS from '../styles/global-css'
import calendarCSS from '../styles/calendar-css'
import styles from '../styles'

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
            const { placeholder, label, locale, dateFormat, currentDate, theme } = this.props

            return [
                <ThemeProvider key='input-field' theme={styles(theme)}>
                    <InputField
                        placeholder={placeholder}
                        showKeyPad={this.toggleCalendar}
                        value={displayRule(value)}
                        label={label}
                        disabled={this.state.show}
                        buttonContent={inputButtonContent} />
                </ThemeProvider>,
                show &&
                    <ThemeProvider key='key-pad' theme={styles(theme)}>
                        <Wrapper>
                            <Calendar
                                locale={locale}
                                currentDate={value ? moment(value, dateFormat) : currentDate}
                                dateFormat={dateFormat}
                                hideCalendar={this.toggleCalendar}
                            />
                        </Wrapper>
                    </ThemeProvider>
            ]
        }
    }
)