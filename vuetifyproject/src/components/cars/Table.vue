<template>
    <v-table fixed-header :class="this.$currentTheme() + '-table-color'" class="bg-table mb-4">
        <thead>
            <tr :class="this.$currentTheme() + '-table-color'">
                <th>{{ $t('cars.table.id') }}</th>
                <th>{{ $t('cars.table.company') }}</th>
                <th>{{ $t('cars.table.model') }}</th>
                <th>
                    <pricefilter>
                    </pricefilter>
                </th>
                <th>
                    <colorFilter>
                    </colorFilter>
                </th>
                <th>{{ $t('cars.table.delete') }}</th>

            </tr>
        </thead>
        <tbody>
            <tableitem :cars="getCarsArray()">
            </tableitem>
        </tbody>
    </v-table>
</template>

<script>
import pricefilter from './PriceFiter.vue'
import tableitem from './TableItem.vue'
import colorFilter from '@/components/cars/ColorFilter.vue'
import { mapActions, mapGetters } from 'vuex';
export default {
    data: () => {
        return {
            pagenationData: null
        }
    },
    methods: {
        ...mapActions([
            'getCars'
        ]),
        ...mapGetters([
            'getFilter',
            'getCarsArray'
        ])
    },
    components: {
        pricefilter,
        tableitem,
        colorFilter
    },
    mounted() {

        this.getCars()
    }
}
</script>

<style scoped>
.bg-table {
    background: transparent;
}
</style>