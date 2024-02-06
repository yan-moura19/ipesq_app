import { defineStore } from 'pinia'
import axios from 'axios'
import { URL_API } from '@/ennviroments' 

export const useMyAuth = defineStore('authLogin', {
  state: () => ({
    user: {},
    estaAutenticado: false,
    headers: '',
  }),
  actions: {
    // ações da loja
    async login(usuario, senha) {
        return await axios.post(`${URL_API}Usuario/login`,{email: usuario, senha: senha}, null).then((resp)=>{
            this.user = resp.data;
            this.headers =`Bearer ${resp.data.token}`;
            this.estaAutenticado = true;

        })
      
    },
    resetAuth(){
      this.user = {}
            this.headers = "";
            this.estaAutenticado = false;
    }
  },
})