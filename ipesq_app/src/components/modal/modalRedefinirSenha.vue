<template>
    <v-dialog  transition="dialog-top-transition" width="80%" persistent>
        

        <v-card class="px-4 py-4">
        <span class="d-flex justify-end">
                    <v-icon class="pa-3" @click="close">
                    mdi-close-circle-outline
                    </v-icon>
                </span>
        <h1 class="text-center">EMAIL REDEFINIR SENHA</h1>
        <br>
       
            
          
            <v-text-field v-model="email" label="Digite seu email" outlined></v-text-field>
            
            
            <v-btn class="primary" :loading="loading" @click="submit">Enviar email</v-btn>
            
            
      


        </v-card>
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
        </v-dialog>
        
        
</template>

<script setup>
import { ref,defineEmits, onMounted,  } from 'vue';
import {enviarEmail} from '../../modulos/pacientesMethods'

    const message = ref('')
    const timeout = ref(2000)
    const snackbar = ref(false)
    const loading = ref(false)
    const email = ref('')



const emit = defineEmits(['close'])

const close = (()=>{
    
    emit('close', false);

})
const submit = () =>{
    
    loading.value = true
     enviarEmail(email.value).then(()=>{
        loading.value = false
        snackbar.value = true
        message.value = "Email de redefinição enviado"
        setTimeout(function() {
            close();
                            }, 3000);
     }).catch((err)=>{
        loading.value = false
        snackbar.value = true
        message.value = err.response.data

     })
}

onMounted(()=>{
   
    
})

</script>

<style>

</style>