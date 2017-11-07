import basic from './themes/default'
import material from './themes/material'

export default (name) => {
    let themes = {basic, material}
    return themes[name] || basic
}