<template>
    <v-container class="d-flex mt-16  justify-center">
        <v-card class="pt-5 pe-5 px-5 pb-3" color="transparent" width="90%">
            <template v-slot:image>
                <v-img :class="this.$currentTheme()+'-gradient'"></v-img>
            </template>
            <v-container class="mt-1 d-flex">
                <v-container class="mx-2 d-flex justify-start">
                    <v-card-title style=" font-size: 40px;" class="mt-3" :class="this.$currentTheme()+'-text-color'">{{$t('cars.title')}}</v-card-title>
                </v-container>
                <v-container class="mt-2 me-5 d-flex justify-end">
                    <pageSize :class="this.$currentTheme()+'-text-color'" class="mx-5">
                    </pageSize>
                    <search style="max-width: 300px;">
                    </search>
                    <createCar >
                    </createCar>
                </v-container>
            </v-container>
            <v-container class="mt-3">
                <carstable class="px-10 pe-10">
                </carstable>
                <pagenation>
                </pagenation>
            </v-container>
            <v-container class="d-flex justify-center">
            </v-container>
        </v-card>

    </v-container>
</template>

<script>
import search from './../components/cars/Search.vue'
import carstable from './../components/cars/Table.vue'
import pageSize from '@/components/cars/pageSize.vue'
import pagenation from '@/components/cars/Pagenation.vue'
import createCar from '@/components/cars/Create.vue'
import { mapActions } from 'vuex'

export default {
    components: {
        search,
        carstable,
        pageSize,
        pagenation,
        createCar
    },
    methods: {
        ...mapActions([
            'getColors'
        ]),
    },
    beforeMount() {
        this.getColors()
    }
}
</script>