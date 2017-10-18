export default ({negative, float}) => {
    let specialKeys = []
    if(negative) { specialKeys.push('-') }
    if(float) { specialKeys.push('.') }

    return specialKeys
}