import dark from '@/assets/themes/dark.css'
import light from '@/assets/themes/light.css'
import defaultCss from '@/assets/themes/default.css'
let themes = {
    defaultCss,
    theme: (localStorage.getItem('theme') == 'dark' )? dark: light
}

export async function changeCss(value) {
    if (value == 'dark') {
        themes =  await import ('@/assets/themes/dark.css')
    }
    else {
        themes = await import ('@/assets/themes/light.css')
    }
}
export default themes