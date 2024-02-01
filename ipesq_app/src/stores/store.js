import { defineStore } from 'pinia'

export const useMyStore = defineStore('myStore', {
  state: () => ({
    // estado da loja
    count: 0,
  }),
  actions: {
    // ações da loja
    increment() {
      this.count++
    },
  },
})