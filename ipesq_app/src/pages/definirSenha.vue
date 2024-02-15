<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
        <v-card>
            <v-card-title class="headline text-center maiuscula">REDEFINIR SENHA DE {{ nomeUser }}</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="redefinirSenha">
                <v-text-field v-model="senha" label="Senha" @click:append-inner="show1 = !show1" 
                :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
                outlined
                :type="show1 ? 'text' : 'password'"></v-text-field>
                <v-text-field v-model="senha2" 
                label="Confirme sua senha" 
                @click:append-inner="show2 = !show2" 
                :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" 
                outlined
                :type="show2 ? 'text' : 'password'"
                ></v-text-field>
                <v-btn :loading="loading" type="submit" color="primary" block>REDEFINIR</v-btn>
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
import { onMounted, ref, computed } from 'vue';
import {  useRouter, useRoute } from 'vue-router';
import { setToken,patchSenha} from '@/modulos/pacientesMethods.js'
import { useMyAuth } from '@/stores/auth';



const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)
      const show1 = ref(false)
      const show2 = ref(false)
const senha = ref('')
const senha2 = ref('')
const authDB = useMyAuth()

const loading = ref(false)
const router = useRouter()
const route = useRoute()


const redefinirSenha = (()=>{
    if(senha.value !== senha2.value){
        snackbar.value = true
        message.value = 'As senhas devem ser iguais'
        return
    }else{
        patchSenha(senha).then(()=>{
            snackbar.value = true
        message.value = 'A senha foi alterada'
        setTimeout(function() {
                                router.push('/');
                            }, 3000);

        }).catch((err)=>{
            
            snackbar.value = true
        message.value = 'Não foi possivel alterar a senha'
        })
    }

})


var nomeUser = computed(() => {
  return authDB.definirSenha.nome || null;
});

onMounted(()=>{
   
    
    if(!!route.query.token){
        setToken(route.query.token)
        router.push('/definir-senha')
    }else{
        

    }

})
</script>