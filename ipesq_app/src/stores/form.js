import { defineStore } from 'pinia'

export const useMyForm= defineStore('form', {
  state: () => ({
    
    formSelecionado: {},
  }),
  actions: {
    // ações da loja
    getForm(id) {   
    },
    setForm(form){
        this.formSelecionado = form
    },
    resetForm(){
        this.formSelecionado = {}
    },
    formFisioterapiaRespiratoria(){
      this.formSelecionado = {
        sinaisVitaisIniciais: {},
        sinaisVitaisFinais: {}



      }

    }
  },
})