<template >
    <v-navigation-drawer color="transparent" class="mx-n1"  width="190">
        <div :class="this.$currentTheme()+'-v-navigation-drawer__content'">
            <v-list>
                <v-list-item style="padding-left: 0;" v-for="item in list" @click="clicked(item)"
                :class="'font-weight-' + item.fontStyle + ' ' + 'font-' + item.fontStyle"
                :active="getActiveSubSidebarItem().title == item.title"
                :value="item.title">
                <v-container  class="mb-n2 d-flex justify-start dark-sidebar-item-color">
                    <v-icon color="primary" :icon="item.prependIcon" ></v-icon>
                    <span :class="this.$currentTheme()+'-text-color'" class="d-flex justify-center">
                        {{$t('subSidebar.'+ item.title.toLowerCase() )}}
                        <span v-if="item.count>0" class="mx-1 dot d-flex justify-center" style="font-style: normal;">
                            {{ item.count }}
                        </span>
                    </span>
                </v-container>
            </v-list-item>
        </v-list>
    </div>
    </v-navigation-drawer>
    <tabs :show="showTab" :tabItems="tabitems">
    <router-view>        
        </router-view>
    </tabs>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import tabs from './Tabs.vue'
export default {
    props: {
        list: {
            type: Object,
            required: false
        }
    },
    data: () => {
        return {
            showTab: false,
        }
    },
    components: {
        tabs
    },
    methods: {
        ...mapMutations([
            'setActiveSubSidebarItem',
            'setRoutePath',
            'setTabItems'
        ]),
        ...mapGetters([
            'getActiveSubSidebarItem',
            'getTabItems'
        ]),
        clicked(item) {
             this.setActiveSubSidebarItem(item)
             this.showTab = item.tabs
             this.setTabItems(item.tabsItems)
             if (!item.tabs) {
                this.$router.push(item.routePath)
             } 
             else {
                 this.setRoutePath(item.routePath)
                 this.$router.push(item.routePath+item.tabsItems[0].routePath)
             }
        }
    },
    computed: {
        tabitems() {
            return this.getTabItems()
        }
    },updated() {
        this.showTab = this.getActiveSubSidebarItem().tabs
    }
}
</script>

<style >
.dot {
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    display: flex;
    color: white;
}
.gradient {
    background-image: linear-gradient(to right, rgba(231, 236, 238, 0.8), rgba(206, 221, 219, 0.8));
  }
 
</style>