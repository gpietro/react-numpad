import React from 'react'
import PropTypes from 'prop-types'
import Button from '../elements/Button'
import Input from '../elements/Input'

const KeyPadButton = (props) => {
    const { value, click } = props;

    return (
        <Button style={{width: 80}} onClick={() => click(value)}>{value}</Button>
    )    
}

KeyPadButton.defaultProps = {
    placeholder: '',
};
  
KeyPadButton.propTypes = {
    click: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}
export default KeyPadButton