import { createI18n } from 'vue-i18n'
import en from './locations/en'
import ru from './locations/ru'
import uz from './locations/uz'
const languages = {en, ru, uz}
const messages = {
    En: {
        login: '',
        register: '',
        navbar: '',
        sidebar: '',
        subSidebar: '',
        cars: '',
        settings: ''
    },
    Ru: {
        login: '',
        register: '',
        navbar: '',
        sidebar: '',
        subSidebar: '',
        cars: '',
        settings: ''
    },
    Uz: {
        login: '',
        register: '',
        navbar: '',
        sidebar: '',
        subSidebar: '',
        cars: '',
        settings: ''
    }
}

export function locationHandler(required) {
    for (let key in messages) {
        for (let key1 in messages[key]) {
            if (required.includes(key1)) {
                messages[key][key1] = languages[key.toLowerCase()][key1]
            }
            else {
                messages[key][key1] = ''
            }
        }
    }
}
function defaultLang() {

    const language = localStorage.getItem('language')
    if (language) {
        for (let key in messages) {
            if (key === language) {
                return language
            }
        }
    }
    return 'Ru'
}
const i18n = createI18n({
    legacy: false,
    locale: defaultLang(),
    fallbackLocale: 'Ru',
    messages,

})

export default i18n