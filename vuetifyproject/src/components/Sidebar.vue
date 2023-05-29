<template>
        <v-navigation-drawer color="transparent"  width="180">
            <div :class="this.$currentTheme()+'-v-navigation-drawer__content'">
                <v-list >
                    <v-list-item v-for="item in list" @click="click(item)"
                    color="textColor"
                    :class="'font-weight-' + item.fontStyle + ' ' + 'font-' + item.fontStyle"
                    :active="getActiveSidebarItem() == item.title" :value="item.title">
                    <v-container class="mb-n2 d-flex justify-center" >
                        <v-icon color="primary" class="mt-2" :icon="item.prependIcon"></v-icon>
                        <span  v-if="item.count > 0" class="mx-n2 dot d-flex justify-center" style="font-style: normal;">
                            {{ item.count }}
                        </span>
                    </v-container>
                    <span :class="this.$currentTheme()+'-text-color'" class="d-flex justify-center">
                        {{ $t('sidebar.' + item.title.toLowerCase()) }}
                    </span>
                </v-list-item>
            </v-list>
        </div>
    </v-navigation-drawer>
    <subSidebar :list="subSidebarItems">
        <router-view>
        </router-view>
    </subSidebar>
</template>

<script>
import subSidebar from '@/components/SubSidebar.vue'
import { mapMutations, mapActions, mapGetters } from 'vuex'
export default {
    data: () => {
        return {
            list: [
                {
                    prependIcon: 'mdi-email',
                    title: 'Email',
                    count: '',
                    fontStyle: 'bold',
                    items: [
                        {
                            title: 'Inbox',
                            routePath: '/news',
                            fontStyle: 'bold',
                            count: '',
                            prependIcon: 'mdi-email-variant',
                            tabs: true,
                            tabsItems: [],

                        },
                        {
                            title: 'Started',
                            routePath: '/',
                            fontStyle: '',
                            count: 2,
                            prependIcon: 'mdi-star',
                            tabs: false,
                            tabsItems: [],

                        },
                        {
                            title: 'Snoozed',
                            routePath: '/',
                            fontStyle: 'italic',
                            count: 0,
                            prependIcon: 'mdi-clock',
                            tabs: false,
                            tabsItems: [],
                        },
                        {
                            title: 'Send',
                            routePath: '/',
                            fontStyle: 'italic',
                            count: 0,
                            prependIcon: 'mdi-send',
                            tabs: false,
                            tabsItems: [],
                        },
                        {
                            title: 'Drafts',
                            routePath: '/',
                            fontStyle: '',
                            count: 2,
                            prependIcon: 'mdi-file',
                            tabs: false,
                            tabsItems: [],
                        }
                    ]
                },
                {
                    prependIcon: 'mdi-chat',
                    title: 'Chat',
                    count: 5,
                    fontStyle: 'bold',
                    items: [
                        {
                            title: 'Cars',
                            routePath: '/',
                            count: 5,
                            fontStyle: 'bold',
                            prependIcon: 'mdi-car',
                            tabs: false,
                            tabsItems: [],
                        },
                        {
                            title: 'Settings',
                            routePath: '/Settings',
                            count: 0,
                            fontStyle: 'bold',
                            prependIcon: 'mdi-account-settings',
                            tabs: false,
                            tabsItems: [],
                        }
                    ]

                },
                {
                    prependIcon: 'mdi-account-multiple',
                    title: 'Contacts',
                    count: 5,
                    fontStyle: 'italic',
                    items: []
                },
                {
                    prependIcon: 'mdi-video',
                    title: 'Meet',
                    count: 0,
                    fontStyle: 'italic',
                    items: []
                },

            ],
            subSidebarItems: ''
        }
    },
    components: {
        subSidebar
    },
    methods: {
        ...mapMutations([
            'setRoutePath',
            'setActiveSidebarItem',
            'setActiveSubSidebarItem',
            'setTabItems',
            'setActiveTabItem'

        ]),
        ...mapActions([
            'getCategories',
        ]),
        ...mapGetters([
            'getActiveSidebarItem',
        ]),
        renderData() {
            this.getCategories().then(response => {
                this.list[0].items[0].tabsItems = response.data
                this.list[0].items[0].count = 11
                this.list[0].count = 15
            })
            this.checkerRoute()
        },
        checkerRoute() {
            const cars = this.list[1]
            const news = this.list[0]

            if (!this.$route.path.startsWith('/news')) {
                this.setActiveSidebarItem(cars.title)
                this.subSidebarItems = cars.items
                cars.items.forEach(x => {
                    if (x.routePath.toLowerCase() == this.$route.path.toLowerCase()) {
                        this.setActiveSubSidebarItem(x)
                        return
                    }
                })
            }
            else {
                this.subSidebarItems = news.items
                this.setActiveSubSidebarItem(news.items[0])
                this.setActiveSidebarItem(news.title)
                this.setActiveTabItem(this.$route.params.category)
                this.setRoutePath(news.items[0].routePath)
                this.setTabItems(news.items[0].tabsItems)
            }
        },
        click(sidebarItem) {
            this.subSidebarItems = sidebarItem.items
            this.setActiveSidebarItem(sidebarItem.title)
        }
    },
    computed: {
        newsData() {
            return this.list[0].items[0].tabsItems
        }
    },
    watch: {
        'newsData'(to, from) {
            if (this.$route.path.startsWith('/news')) {
                const items = this.list[0].items
                this.subSidebarItems = items
                this.setActiveSubSidebarItem(items[0])
                this.setTabItems(items[0].tabsItems)
            }
        },
        '$route.path'(to, from) {
            this.checkerRoute()
        }
    },
    beforeMount() {
        this.renderData()
    }
}
</script>


<style scoped>
.dot {
    height: 20px;
    width: 20px;
    background-color: red;
    border-radius: 50%;
    font-size: small;
    z-index: 1;
}

</style>