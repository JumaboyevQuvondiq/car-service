<template>
    <v-select  style="max-width: 105px;" :items="[2, 5, 10, 15]" color="secondary" base-color="textColor"  v-model="pageSize" :label="$t('cars.lb-page-size')"
        >
    </v-select>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    data: () => {
        return {
            pageSize: 10
        }
    },
    methods: {
        ...mapGetters([
            'getPageSize'   
        ]),
        ...mapMutations([
            'changePageSize'
        ]),
        ...mapActions([
            'getCars'
        ]),
        changeFilter() {
            this.changePageSize(this.pageSize)
            this.getCars()
        }
    },
    watch: {
        'pageSize'(to, from) {
            this.changeFilter()
        }
    }

}
</script>