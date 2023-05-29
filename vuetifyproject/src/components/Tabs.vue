<template>
    <v-container v-if="show" class="d-flex mt-5 mb-n7 justify-center">
        <v-card color="transparent">
            <template v-slot:image>
                <v-img :class="this.$currentTheme()+'-gradient'"></v-img>
            </template>
            <v-tabs  color="secondary" v-model="activeTabItem" >
                <v-tab color="secondary"  v-for="item in tabItems" @click="click(item)" :value="item.title.toLowerCase()"><span :class="this.$currentTheme()+'-text-color'">{{ item.title }}</span>
                    <span v-if="item.count>0" class="mx-1 dot d-flex justify-center" style="font-style: normal;">
                        {{ item.count }}
                    </span>
                </v-tab>
            </v-tabs>
        </v-card>
    </v-container>
    
        <router-view>
            
        </router-view>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        },
        tabItems: {
            type: Array,
            required: false
        }
    },
    data: () => {
        return {
            tab:''
        }
    },
    methods: {
        ...mapGetters([
            'getRoutePath',
            'getActiveTabItem'
        ]),
        click(item) {
            this.$router.push(this.getRoutePath() + item.routePath)
        }
    },
    computed: {
        activeTabItem() {
            return this.getActiveTabItem().toLowerCase()
        }
    },
    beforeMount() {
        this.tab = this.activeTabItem
    }

   
}
</script>

<style scoped>
.dot {
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    display: flex;
    color: white;
}
</style>