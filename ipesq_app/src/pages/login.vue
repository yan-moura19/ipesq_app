<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline text-center">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="usuario" label="Usuário" outlined></v-text-field>
                <v-text-field v-model="senha" label="Senha" type="password" outlined></v-text-field>
                <v-btn type="submit" color="primary" block>Entrar</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
       
        </v-col>
      </v-row>
      <div>
    
  </div>
    </v-container>
  </template>
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useMyStore } from '../stores/store';
  
  
    
      const usuario = ref('');
      const senha = ref('');
      const router = useRouter();
      const route = useRoute();
      const myStore = useMyStore();
      
      const aumentar = () =>{
        myStore.increment()
      }
  
      const login = () => {
        console.log("Usuário:", usuario.value, "Senha:", senha.value);
        
        router.push('/index');
      };
  
      
    
  
  </script>
  
  <style scoped>
  .fill-height {
    height: 100%;
  }
  
  .text-center {
    text-align: center;
  }
  </style>