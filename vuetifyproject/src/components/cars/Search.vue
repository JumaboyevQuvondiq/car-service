<template>
    <v-text-field append-icon="mdi-magnify" :label="$t('cars.lb-search')" single-line @input="textChange" hide-details style="height: 80%;"
    :class="this.$currentTheme()+'-text-color'"></v-text-field>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
export default {
    methods: {
        ...mapMutations([
            'changeSearch'
        ]),
        ...mapActions([
            'getCars'
        ]),
        textChange(e) {
            this.changeSearch(e.target.value)
            this.getCars()
        }
    }
}
</script>