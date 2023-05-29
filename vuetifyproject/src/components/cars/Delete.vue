<template>
  <div>
    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" color="error">
          <svg width="16" height="16" fill="#fff" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
          </svg></v-btn>
      </template>

      <v-card class="pt-4 pb-4  pe-4 px-4" color="transparent">
        <template v-slot:image>
          <v-img gradient="to top right, rgba(50,124,202,.8), rgba(128,208,199,.9)"></v-img>
        </template>
        <v-card-text class="text-color">
          Siz haqiqatdan ham ushbu {{ car.id }} - idga ega {{ car.company }} {{ car.model }} ni ochirmoqchimisiz?
        </v-card-text>

        <v-container class="d-flex justify-center" style="max-width: 25%;">
          <v-btn class="me-4" color="red" block @click="this.delete(car.id)">Delete</v-btn>
          <v-btn color="secondary" block @click="() => dialog = false">Close</v-btn>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    car: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions([
      'deleteCar',
      'getCars'
    ]),
    delete(id) {
      this.deleteCar(id).then(response => {
        if (response.status == 200) {
          this.dialog = false
          this.getCars()
        }
      }).catch(err => {
        alert('tizimda xatolik' + `${err.message}`)
      })

    }
  }
}
</script>