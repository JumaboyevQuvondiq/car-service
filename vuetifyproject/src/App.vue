<template>
  <router-view />
</template>

<script>
import { useTheme } from 'vuetify'
import { mapGetters } from 'vuex'
import theme  from '@/config/theme/index'
export default {
  setup() {
        const theme = useTheme()

        return {
            theme
        }
    },
    methods: {
        ...mapGetters([
            'getAppColor'
        ])
    },
  watch: {
    '$i18n.locale'(to,from) {
      localStorage.setItem('language',this.$i18n.locale)
    }
  },
  beforeMount() {
    const themeName = (this.getAppColor() != null) ? this.getAppColor() : 'dark'
    this.theme.current = this.theme.computedThemes.value[themeName]
    this.theme.global.name.value = themeName
  }
}
</script>
