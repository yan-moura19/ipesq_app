<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline text-center">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="usuario" label="Email" outlined></v-text-field>
                <v-text-field v-model="senha" 
                label="Senha" 
                @click:append-inner="show1 = !show1" 
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                outlined
                :type="show1 ? 'text' : 'password'"
                ></v-text-field>
                <v-btn :loading="loading" type="submit" color="primary" block>Entrar</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
       
        </v-col>
      </v-row>
      <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ message }}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
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
      const loading = ref(false)
      const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)
      const show1 = ref(true)

      const myAuth = useMyAuth();
      
      
      const resetPaciente = (()=>{
      paciente.resetPacienteSelecionado()
    })
          onMounted(() => {
        myAuth.resetAuth();
        resetPaciente()
      });
  
      const login = () => {
        loading.value = true
       
        myAuth.login( usuario.value,senha.value).then(()=>{
          router.push('/paciente');
          loading.value = false
        }).catch((err)=>{
          console.log(err.response.data)
          message.value = err.response.data
          loading.value = false
          snackbar.value = true
          
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