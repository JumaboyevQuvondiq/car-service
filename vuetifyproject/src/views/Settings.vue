<template>
    <v-container class="d-flex mt-16  justify-center">
        <v-card class="pt-5 pe-5 px-5  pb-3 " color="transparent"  width="30%">
            <template v-slot:image>
                <v-img :class="this.$currentTheme()+'-gradient'"></v-img>
            </template>
            <v-container class="d-flex justify-center">
                <v-card-title  style="font-size: 40px;" class="mt-2"  :class="this.$currentTheme()+'-text-color'">{{$t('settings.title')}}</v-card-title>
            </v-container>
            <v-container>
                <v-text-field hide-details="auto" :error="(nameError.length > 0)" :label="$t('settings.lb-name')"
                     bg-color="inputBgColor" :model-value="username"
                    @input="(e) => { userDto.name = e.target.value }" :class="this.$currentTheme()+'-text-color'" class="mt-5"
                    prepend-inner-icon="mdi-account"></v-text-field>
                <span style="color:orangered">{{ nameError }}</span>
            </v-container>
            <v-container>

                <v-text-field :append-inner-icon="!passVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passVisible ? 'text' : 'password'" :placeholder="$t('settings.pass-placeholder')" :label="$t('settings.lb-password')"
                    bg-color="inputBgColor" :error="(passwordError.length > 0)" hide-details="auto" v-model="userDto.password"
                    class="mt-5" :class="this.$currentTheme()+'-text-color'" prepend-inner-icon="mdi-lock-outline"
                    @click:append-inner="() => { passVisible = !passVisible }"></v-text-field>
                <span style="color:orangered">{{ passwordError }}</span>
            </v-container>

            <v-container>

                <v-text-field :append-inner-icon="!newpassVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="newpassVisible ? 'text' : 'password'" :placeholder="$t('settings.new-pass-placeholder')" :label="$t('settings.lb-new-password')"
                    bg-color="inputBgColor" hide-details="auto" :error="(newPassError.length > 0)" v-model="userDto.newPassword"
                    class="mt-5" :class="this.$currentTheme()+'-text-color'" prepend-inner-icon="mdi-lock-outline"
                    @click:append-inner="() => { newpassVisible = !newpassVisible }"></v-text-field>
                <span style="color:orangered">{{ newPassError }}</span>
            </v-container>
            <v-container class="mt-8 mb-8 d-flex justify-center">
                <v-btn variant="elevated" :disabled="isLoading" @click="updateUserData" color="success" 
                    height="50" class="text-h6">{{ $t('settings.submit-btn') }}</v-btn>
            </v-container>

        </v-card>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data: () => {
        return {
            passVisible: false,
            newpassVisible: false,
            userName: '',
            nameError: '',
            passwordError: '',
            newPassError: '',
            userDto: {
                name: '',
                password: '',
                newPassword: ''
            }
        }
    },
    methods: {
        ...mapGetters([
            'userInfo'
        ]),
        ...mapActions([
            'updateUser'
        ]),
        updateUserData() {
            this.updateUser(this.userDto).then((response) => {
                if (response.status == 201) {
                    if (response.data[0].errors.length > 0) {

                        this.nameError = response.data[0].errors[0].errorMessage
                    }
                    if (response.data[1].errors.length > 0) {

                        this.passwordError = response.data[1].errors[0].errorMessage
                    }
                    if (response.data[2].errors.length > 0) {

                        this.newPassError = response.data[2].errors[0].errorMessage
                    }
                }
            })
        }
    },
    computed: {
        username() {
            return this.userInfo()
        },
        isLoading() {
            return this.$store.state.auth.isLoading
        }
    }
}
</script>