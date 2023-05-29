<template>
    <div >
        <v-dialog v-model="dialog"  width="25%">
            <template v-slot:activator="{ props }">
                <v-btn class="me-2 mx-2 mt-1" variant="flat" color="secondary" height="50" v-bind="props">
                   {{$t('cars.create.btn-title')}}
                </v-btn>
            </template>

            <v-card class="pt-4 pb-4  pe-4 px-4" color="primary">
                <template v-slot:image>
                    <v-img gradient="to top right, rgba(50,124,202,.7), rgba(128,208,199,.8)"></v-img>
                </template>
                <v-container class="d-flex justify-center">
                    <v-card-title style=" font-size: 40px;" class="mt-2">{{$t('cars.create.title')}}</v-card-title>
                </v-container>
                <v-container>
                    <v-text-field hide-details="auto" :error="(companyErr.length > 0)" bg-color="inputBgColor"
                        v-model="createDto.company" :label="$t('cars.create.lb-company')" class="mt-5 text-color"></v-text-field>
                    <span style="color:orangered">{{ companyErr }}</span>
                </v-container>
                <v-container>

                    <v-text-field :label="$t('cars.create.lb-model')" bg-color="inputBgColor" :error="(modelErr.length > 0)" hide-details="auto"
                        v-model="createDto.model" class="mt-5 text-color"></v-text-field>
                    <span style="color:orangered">{{ modelErr }}</span>
                </v-container>

                <v-container>

                    <v-text-field  :label="$t('cars.create.lb-price')" bg-color="inputBgColor" hide-details="auto" type="number"
                        :error="(priceErr.length > 0)" v-model="createDto.price" class="mt-5 text-color"></v-text-field>
                    <span style="color:orangered">{{ priceErr }}</span>
                </v-container>
                <v-container>
                    <v-select :items="getColorsForCars()" :label="$t('cars.create.lb-color')" color="secondary" :error="(colorErr.length > 0)"
                        v-model="createDto.color" density="comfortable">
                    </v-select>
                    <span style="color:orangered">{{ colorErr }}</span>
                    <!-- select -->
                </v-container>
                <v-container class="mt-3 mb-8 d-flex justify-center">
                    <v-btn @click="create" :disabled="isLoading" variant="elevated" color="success" 
                        class="text-h6">{{ $t('cars.create.create-btn') }}</v-btn>
                </v-container>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    data() {
        return {
            dialog: false,
            createDto: {
                company: '',
                model: '',
                price: '',
                color: ''
            },
            companyErr: '',
            modelErr: '',
            priceErr: '',
            colorErr: ''

        }
    },
    methods: {
        ...mapGetters([
            'getColorsForCars'
        ]),
        ...mapActions([
            'createCar',
            'getCars'
        ]),
        create() {
            this.createCar(this.createDto).then(response => {
                if (response.status == 200) {
                    this.dialog = false
                    this.getCars()
                    this.companyErr = ''
                    this.modelErr = '',
                        this.priceErr = ''
                    this.colorErr = ''
                    this.createDto.company = '',
                        this.createDto.model = '',
                        this.createDto.color = '',
                        this.createDto.price = ''

                }
                else if (response.status == 201) {
                    console.log(response.data);
                    if (response.data[3].errors.length > 0) {

                        this.companyErr = response.data[3].errors[0].errorMessage
                    }
                    if (response.data[1].errors.length > 0) {

                        this.modelErr = response.data[1].errors[0].errorMessage
                    }
                    if (response.data[2].errors.length > 0) {

                        this.priceErr = response.data[2].errors[0].errorMessage
                    }
                    if (response.data[0].errors.length > 0) {

                        this.colorErr = response.data[0].errors[0].errorMessage
                    }
                }
            })
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.cars.isLoadingCars
        }
    }

}
</script>