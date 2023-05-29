<template>
    <v-container class="d-flex mt-16  justify-center">
        <v-card class="pt-5 pe-5 px-5  pb-3" width="50%" color="transparent">
            <template v-slot:image>
                <v-img :class="this.$currentTheme()+'-gradient'"></v-img>
            </template>
            <v-container :class="this.$currentTheme()+'-text-color'" class="d-flex justify-center">
                <v-card-title style=" font-size: 40px;" class="mt-2">{{ $t('register.title') }}</v-card-title>
            </v-container>
            <v-form ref="form" class="d-flex">
                <v-container>
                    <v-container>
                        <v-text-field :label="$t('register.first-name.label')" :rules="validate.firstName"
                            hide-details="auto" bg-color="inputBgColor" v-model.trim="user.firstName" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                            :placeholder="$t('register.first-name.place-holder')"
                            prepend-inner-icon="mdi-account"></v-text-field>
                    </v-container>
                    <v-container>
                        <v-text-field :label="$t('register.email.label')" :rules="validate.emailOrPhone" hide-details="auto"
                            bg-color="inputBgColor" v-model.trim="user.email" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                            :placeholder="$t('register.email.place-holder').toString()"
                            prepend-inner-icon="mdi-email-outline"></v-text-field>
                    </v-container>
                    <v-container>
                        <v-text-field :append-inner-icon="!passVisible ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="passVisible ? 'text' : 'password'" :rules="validate.password"
                            :label="$t('register.password.label')" hide-details="auto" bg-color="inputBgColor"
                            v-model.trim="user.password" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                            :placeholder="$t('register.password.place-holder')" prepend-inner-icon="mdi-lock-outline"
                            @click:append-inner="() => { passVisible = !passVisible }"></v-text-field>
                    </v-container>
                </v-container>
                <v-container>
                    <v-container>
                        <v-text-field :label="$t('register.last-name.label')" :rules="validate.lastName" hide-details="auto"
                            bg-color="inputBgColor" v-model.trim="user.lastName" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                            :placeholder="$t('register.last-name.place-holder')"
                            prepend-inner-icon="mdi-account"></v-text-field>
                    </v-container>
                    <v-container>
                        <v-text-field :label="$t('register.surname.label')" :rules="validate.surname" hide-details="auto"
                            bg-color="inputBgColor" v-model.trim="user.surename" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                            :placeholder="$t('register.surname.place-holder').toString()"
                            prepend-inner-icon="mdi-email-outline"></v-text-field>
                    </v-container>
                    <v-container>
                        <v-text-field :append-inner-icon="!retryPassVisable ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="retryPassVisable ? 'text' : 'password'"
                            :error-messages="(user.password != user.retryPassword && user.retryPassword != '') ? $t('register.retry-password.validation') : ''"
                            :label="$t('register.retry-password.label')" hide-details="auto" bg-color="inputBgColor"
                            v-model.trim="user.retryPassword" class="mt-5" :class="this.$currentTheme()+'-text-color'"
                            :placeholder="$t('register.retry-password.place-holder')" prepend-inner-icon="mdi-lock-outline"
                            @click:append-inner="() => { retryPassVisable = !retryPassVisable }"></v-text-field>
                    </v-container>

                </v-container>
            </v-form>
            <v-container class="mt-6 d-flex justify-center">
                <v-btn :disabled="isLoading" variant="elevated" @click="submitRegisterBtn" color="success"
                    class="text-h5">{{ $t('register.submit-btn') }}</v-btn>
            </v-container>
            <v-container class="mt-5 mx-1 mb-4 d-flex">
                <v-container class="d-flex">
                    <span :class="this.$currentTheme()+'-text-color'" class="mt-2">{{ $t('register.label-have-account') }}</span>
                    <v-btn @click="redirectToLogin" class="mx-7" variant="flat" color="secondary">{{
                        $t('register.login-btn') }}</v-btn>
                </v-container>
            </v-container>
        </v-card>

    </v-container>
</template>

<script>
import i18n from '@/i18n'
export default {
    data: () => {
        return {
            user: {
                firstName: '',
                email: '',
                password: '',
                lastName: '',
                surename: '',
                retryPassword: '',
            },
            passVisible: false,
            retryPassVisable: false,
            validate: {
                firstName: [
                    required => required.length > 0 || i18n.global.t('register.first-name.validation.required'),
                    maxlength => maxlength.length <= 50 || i18n.global.t('register.first-name.validation.max-length'),
                    minlength => minlength.length >= 2 || i18n.global.t('register.first-name.validation.min-length'),
                ],
                emailOrPhone: [
                    required => required.length > 0 || i18n.global.t('register.email.validation.required'),
                    emailOrPhone => /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(emailOrPhone) || /^([\+]?998[3789][012345789][0-9]{7})$/.test(emailOrPhone) || i18n.global.t('register.email.validation.email-or-phone'),
                ],
                password: [
                    required => required.length > 0 || i18n.global.t('register.password.validation.required'),
                    maxlength => maxlength.length <= 50 || i18n.global.t('register.password.validation.max-length'),
                    minlength => minlength.length >= 8 || i18n.global.t('register.password.validation.min-length'),
                    lowerCase => lowerCase.search(/[a-z]/) >= 0 || i18n.global.t('register.password.validation.lower-case'),
                    UpperCase => UpperCase.search(/[A-Z]/) >= 0 || i18n.global.t('register.password.validation.upper-case'),
                    digit => digit.search(/[0-9]/) >= 0 || i18n.global.t('register.password.validation.digit'),
                    symbol => symbol.search(/[@$!%*?&]/) >= 0 || i18n.global.t('register.password.validation.symbol'),
                    strong => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(strong) || i18n.global.t('register.password.validation.strong-pass'),
                ],
                lastName: [
                    required => required.length > 0 || i18n.global.t('register.last-name.validation.required'),
                    maxlength => maxlength.length <= 50 || i18n.global.t('register.last-name.validation.max-length'),
                    minlength => minlength.length >= 2 || i18n.global.t('register.last-name.validation.min-length'),
                ],
                surname: [
                    required => required.length > 0 || i18n.global.t('register.surname.validation.required'),
                    maxlength => maxlength.length <= 50 || i18n.global.t('register.surname.validation.max-length'),
                    minlength => minlength.length >= 2 || i18n.global.t('register.surname.validation.min-length'),
                ],
            }
        }
    },
    methods: {
        redirectToLogin() {
            this.$router.push({ name: 'Login' })
        },
        async submitRegisterBtn(e) {
            if ((await this.$refs.form.validate()).valid) {
                e.preventDefault()
                this.$store.dispatch('register', this.user).then((response) => {
                    if (response.status == 200) {
                        this.redirectToLogin()
                    }
                }).catch((err) => {
                    alert(err.data.Message)
                })
            }
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.auth.isLoading
        }
    }
}
</script>


<style >
.v-messages__message {
    font-size: 15px;
    font-weight: 500;
}
</style>