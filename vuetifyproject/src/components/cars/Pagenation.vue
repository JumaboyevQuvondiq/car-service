<template>
    <div v-if="totalPage > 1" class="d-flex ">
        <v-container class="d-flex justify-center">
            <v-pagination  :class="this.$currentTheme()+'-text-color'" color="textColor" active-color="secondary" v-model="page" :length="totalPage"></v-pagination>
        </v-container>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    data: () => {
        return {
            page: 1
        }
    },
    methods: {
        ...mapActions([
            'getCars'
        ]),
        ...mapGetters([
            'getCurrentPage',
            'getTotalPage'
        ]),
        ...mapMutations([
            'changeCurrentPage'
        ]),
        changePage() {
            this.changeCurrentPage(this.page)
            this.getCars()
            this.page = this.getCurrentPage()
        }
    },
    computed: {
        currentPage() {
            return this.getCurrentPage()
        },
        totalPage() {
            return this.getTotalPage()
        }
    },
    watch: {
        'page'(to, from) {
            this.changePage()
        },
        'currentPage'(to, from) {
            this.page = this.currentPage
        }
    }
}
</script>