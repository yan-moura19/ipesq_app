import { defineStore } from 'pinia'

export const useMyStore = defineStore('store', {
  state: () => ({
    especialidades: []
  }),
  actions: {
   
    setExpecialidades(especialidades) {
      this.especialidades = especialidades
    },
  },
})