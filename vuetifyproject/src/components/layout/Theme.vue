<template>
    <div class="d-flex">
        <v-dialog v-model="dialog" class="d-flex justify-end align-start mt-10" width="15%">
            <template v-slot:activator="{ props }">
                <v-icon color="textColor" icon="mdi-cog" v-bind="props">
                </v-icon>
            </template>
            <v-card class="pt-4 pb-4  pe-4 px-4" color="transparent">
                <template v-slot:image>
                    <v-img :class="this.$currentTheme() + '-gradient'"></v-img>
                </template>
                <v-container class="d-flex justify-center">
                    <v-card-title :class="this.$currentTheme() + '-text-color'" style=" font-size: 40px;" class="mt-2">{{
                        $t('navbar.theme') }}</v-card-title>
                </v-container>
                <v-container class="d-flex justify-center">
                    <v-card v-for="item in themes" :key="item.title" width="60%" class="me-2" height="55"
                        style="cursor: pointer;" @click="changeTheme(item.title)">
                        <v-img :src="item.background" cover="true">
                            <v-card-title style="color: white;">{{ item.title }}</v-card-title>
                        </v-img>
                    </v-card>
                </v-container>

            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { useTheme } from 'vuetify'
import { mapMutations } from 'vuex'

export default {
    setup() {
        const theme = useTheme()

        return {
            theme,
            toggleTheme: (name) => {
                theme.global.name.value = name
            }

        }
    },
    methods: {
        ...mapMutations([
            'setAppColor'
        ]),
        changeTheme(name) {
            this.toggleTheme(name)
            this.setAppColor(name)
        }
    },
    data: () => {
        return {
            dialog: false,
            themes: [
                {
                    title: 'dark',
                    background: '/images/thumb-1920-1041085.jpg'
                },
                {
                    title: 'light',
                    background: '/images/flowers-276014_1280.jpg'
                }
            ]
        }
    }
}
</script>

<style scoped></style>