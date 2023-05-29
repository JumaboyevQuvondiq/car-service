<template>
    <v-select style="height: 80%; max-width: 100px;" :items="colors()" color="secondary" v-model="color"
        density="compact">
    </v-select>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    data: () => {
        return {
            color: 'All',
        }
    },
    methods: {
        ...mapMutations([
            'changeColorFilter'
        ]),
        ...mapGetters([
            'getColorsForFilter'
        ]),
        ...mapActions([
            'getCars',
        ]),
        colors() {
            const data = this.getColorsForFilter()
            return data
        }
    },
    watch: {
        'color'(to, from) {
            this.changeColorFilter(this.color)
            this.getCars()
        }
    }

}
</script>

