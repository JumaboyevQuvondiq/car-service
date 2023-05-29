<template>
    <a @click="changeFilter" class="text-font"> {{ $t('cars.table.price') }}
        <v-icon v-if="getPriceFilter() == 'asc'"  icon="mdi-chevron-double-down"></v-icon>
        <v-icon v-if="getPriceFilter() == 'des'" icon="mdi-chevron-double-up"></v-icon>
    </a>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    methods: {
        ...mapGetters([
            'getPriceFilter'
        ]),
        ...mapMutations([
            'changeSort'
        ]),
        ...mapActions([
            'getCars'
        ]),
        changeFilter() {
            this.changeSort()
            this.getCars()
        }
    },
    computed: {
        priceFilter() {
            return this.getPriceFilter()
        }
    }
}
</script>

<style scoped>
.text-font {
    text-decoration: underline 2px;
    cursor: pointer;

}
</style>