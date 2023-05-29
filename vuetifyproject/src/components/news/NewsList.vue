<template>
    <v-container class="d-flex  justify-center">
        <v-card class="pt-6 pe-5 px-5  pb-5" color="transparent" width="95%">
            <template v-slot:image>
                    <v-img :class="this.$currentTheme() + '-gradient'"></v-img>
                </template>
            <v-container>
                <v-row>
                    <v-col v-for="item in news" :key="item.id" cols="12" sm="3">
                        <a @click="getNewsItem(item)" style="cursor: pointer;">
                            <v-card>
                                <v-img :src="'/' + item.imagePath" style="border-radius: 4px;">
                                </v-img>
                                <v-card-title class="mt-2">
                                </v-card-title>
                                <v-card-text>
                                    {{ item.title }}
                                </v-card-text>
                                <v-card-text>{{ item.createAt }}</v-card-text>
                            </v-card>
                        </a>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>


<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => {
        return {
            news: ''
        }
    },
    methods: {
        ...mapActions([
            'getNews'
        ]),
        ...mapGetters([
            'getActiveTabItem'
        ]),
        getNewsItem(item) {
            this.$router.push(`/news/${this.getActiveTabItem()}/${item.id}`)
        },
        getData() {
            this.getNews().then(response => {
                this.news = response.data
            }).catch(err => {
                console.log(err);
            })
        }
    },
    mounted() {
        this.getData()
    },
    updated() {
        this.getData()
    }
}
</script>