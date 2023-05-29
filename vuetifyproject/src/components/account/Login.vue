<template>
    <v-container class="d-flex mt-16  justify-center">
        <v-card class="pt-5 pe-5 px-5  pb-3" color="transparent" width="500">
            <template v-slot:image>
                <v-img :class="this.$currentTheme()+'-gradient'"></v-img>
            </template>
            <v-container :class="this.$currentTheme()+'-text-color'" class="d-flex justify-center">
                <v-card-title style=" font-size: 40px;" class="mt-2 ">{{ $t('login.title') }}</v-card-title>
            </v-container>
            <v-container>
                <v-text-field :label="$t('login.email-text')" :error="(emailError.length > 0)" hide-details="auto" v-model="user.email"
                    bg-color="inputBgColor" class="mt-5" :class="this.$currentTheme()+'-text-color'" prepend-inner-icon="mdi-email-outline"></v-text-field>
                <span style="color:orangered">{{ emailError }}</span>
            </v-container>
            <v-container>
                <v-text-field :append-inner-icon="!passVisible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="passVisible ? 'text' : 'password'" :label="$t('login.password-text')" :error="(passError.length > 0)"
                    hide-details="auto" v-model="user.password" bg-color="inputBgColor" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                    prepend-inner-icon="mdi-lock-outline"
                    @click:append-inner="() => { passVisible = !passVisible }"></v-text-field>
                <span style="color:orangered">{{ passError }}</span>
            </v-container>
            <v-container class="mt-8 d-flex justify-center">
                <v-btn :disabled="isLoading" @click="submitLoginBtn" variant="elevated" color="success" width="100"
                    height="50" class="text-h6">{{ $t('login.submit-btn') }}</v-btn>
            </v-container>
            <v-container class="mt-10 mx-1 d-flex ">
                <v-container>
                    <span :class="this.$currentTheme()+'-text-color'">{{ $t('login.label-have-account') }}</span>
                </v-container>
                <v-container class="mt-n2 d-flex justify-end textColor me-4">
                    <v-btn @click="redirectToRegister()" variant="flat" color="secondary" class="text-h7">{{ $t('login.register-btn') }}</v-btn>

                </v-container>
            </v-container>
        </v-card>

    </v-container>
</template>

<script >
import { mapActions } from 'vuex'
export default {
    data: () => {
        return {
            user: {
                email: '',
                password: '',
            },
            emailError: '',
            passError: '',
            passVisible: false
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.auth.isLoading
        }
    },
    methods: {
        ...mapActions([
            'login'
        ]),
        redirectToRegister() {
            this.$router.push({name: 'register'})
        },
        submitLoginBtn(e) {
            e.preventDefault()
            this.login(this.user).then((response) => {
                this.emailError = ''
                this.passError = ''
                if (response.status == 200) {
                    this.$router.push({ name: 'cars' })
                }
                else if (response.status == 201) {
                    if (response.data[0].errors.length > 0) {

                        this.emailError = response.data[0].errors[0].errorMessage
                    }
                    if (response.data[1].errors.length > 0) {

                        this.passError = response.data[1].errors[0].errorMessage
                    }
                }
            }).catch((err) => {
                this.emailError = ''
                this.passError = ''
                alert(err.data.Message)
            })
        }
    }
}
</script>

<style>
</style>