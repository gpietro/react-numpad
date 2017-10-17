import React from 'react'

export default ({negative, float}) => {
    let specialKeys = []
    if(negative) {
        specialKeys.push({
            key: '-',
            value: <span className='fa fa-minus'/>
        })
    }
    if(float) {
        specialKeys.push({            
            key: '.',
            value: <span className='fa fa-circle'/>
        })
    }

    console.log('n', negative, float)

    return {
        keys: specialKeys.map( sk => sk.key),
        values: specialKeys.map( sk => sk.value)
    }
}