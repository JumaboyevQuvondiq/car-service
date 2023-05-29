/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const light = {
  dark: false,
  colors: {
    primary: '#14FC80',
    secondary: '#789AFF',
    error: '#F53326',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    textColor: '#000',
    inputBgColor: '#B8B8B8'
  }
}

const vuetify =  createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#FB8C00',
          secondary: '#5CBBF6',
          textColor: '#FFF',
          error: '#F53326',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          inputBgColor: '#234758'

        }
      },
      light
    }
  }
})

export default vuetify