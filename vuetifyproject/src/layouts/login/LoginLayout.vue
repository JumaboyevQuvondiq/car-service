<template>
    <span :class="this.$currentTheme()+'-bg-img'"></span>
    <v-container :class="this.$currentTheme()+'-text-color'" class="d-flex">
        <v-select  class=" d-flex justify-end"  v-model="this.$i18n.locale"
            :items="this.$i18n.availableLocales" density="comfortable">
        </v-select>
    </v-container>

    <router-view></router-view>
</template>

<script>
import {locationHandler} from '@/i18n/index'

export default {
    beforeMount() {
        locationHandler(['login','register'])
    }
}

</script>
