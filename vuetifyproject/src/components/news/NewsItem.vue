<template>
    <v-container class="d-flex  justify-center">
        <v-card class="pt-8 pe-8 px-8  pb-8" color="transparent" width="85%">
            <template v-slot:image>
                    <v-img :class="this.$currentTheme() + '-gradient'"></v-img>
                </template>
            <v-btn @click="back"><span :class="this.$currentTheme()+'-text-color'">back</span></v-btn>
            <v-card-title class="mt-2" :class="this.$currentTheme() + '-text-color'">
                <v-img :src="'/' + newsItem.imagePath" style="border-radius: 4px;">
                </v-img>
                {{ newsItem.title }}</v-card-title>
            <v-card-text :class="this.$currentTheme() + '-text-color'">{{ newsItem.description }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => {
        return {
            newsItem: ''
        }
    },
    methods: {
        ...mapActions([
            'getNewsItem'
        ]),
        ...mapGetters([
            'getActiveTabItem'
        ]),
        back() {
            this.$router.push('/news/' + this.getActiveTabItem())
        }
    },
    beforeMount() {
        this.getNewsItem().then(response => {
            this.newsItem = response
        }).catch(err => {
            console.log(err);
        })
    }
}
</script>