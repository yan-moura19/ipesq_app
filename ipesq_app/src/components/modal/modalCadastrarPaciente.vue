<template>
    <v-dialog  transition="dialog-top-transition" width="80%" persistent>
        

        <v-card class="px-4 py-4">
        <span class="d-flex justify-end">
                    <v-icon class="pa-3" @click="close">
                    mdi-close-circle-outline
                    </v-icon>
                </span>
        <h1 class="text-center">Cadastrar paciente</h1>
        <br>
       
            
          
            <v-text-field v-model="formData.nome" label="Nome" outlined></v-text-field>
            <v-text-field type="date" v-model="formData.dataNascimento" label="Data de Nascimento" outlined></v-text-field>
            <v-text-field v-model="formData.nomeMae" label="Nome da Mãe" outlined></v-text-field>
            
            <v-btn class="primary" @click="salvarPaciente">Salvar</v-btn>
            
            
      


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
import {postPaciente} from '../../modulos/pacientesMethods'

const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)


const formData = ref({
  nome: '',
  dataNascimento: null,
  nomeMae: ''
});

const emit = defineEmits(['close'])
const modal = ref(true)
const close = (()=>{
    
    emit('close', false);

})
const salvarPaciente =(()=>{
    postPaciente({
        nome: formData.value.nome,
        dataNascimento: formData.value.dataNascimento,
        nomeMae: formData.value.nomeMae
    }).then(()=>{
      snackbar.value = true
      message.value = 'paciente salvo'
     
        
    }).catch(()=>{
      snackbar.value = true
      message.value = 'Erro ao salvar paciente'
       
    })
})
onMounted(()=>{
   
    
})

</script>

<style>

</style>