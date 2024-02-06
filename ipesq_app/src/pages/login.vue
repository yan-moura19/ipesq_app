<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline text-center">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="usuario" label="Email" outlined></v-text-field>
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
  import { ref, onMounted } from 'vue';
  import {  useRouter } from 'vue-router';
  
  import { useMyAuth } from '@/stores/auth';
  import { useMyPaciente} from '@/stores/paciente'
  
  
     const paciente = useMyPaciente()
      const usuario = ref('');
      const senha = ref('');
      const router = useRouter();

      const myAuth = useMyAuth();
      
      
      const resetPaciente = (()=>{
      paciente.resetPacienteSelecionado()
    })
          onMounted(() => {
        myAuth.resetAuth();
      });
  
      const login = () => {
       
        myAuth.login( usuario.value,senha.value).then(()=>{
          router.push('/paciente');
        }).catch((err)=>{
          console.log(err)
          
        })
        
       
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