<template>
    <v-dialog v-model="props.show" transition="dialog-top-transition" width="80%" persistent>
        

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
        </v-dialog>
        
</template>

<script setup>
import { ref,defineEmits, onMounted,defineProps  } from 'vue';
import {postPaciente} from '../../modulos/pacientesMethods'

const props = defineProps({
  show: Boolean
});



const formData = ref({
  nome: '',
  dataNascimento: null,
  nomeMae: ''
});
const submitForm = () => {
  console.log('Dados do formulário:', formData.value);
  // Aqui você pode enviar os dados para onde quiser, por exemplo, um servidor backend
}
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
        alert("paciente salvo")
    }).catch(()=>{
        alert("Erro ao salvar paciente")
    })
})
onMounted(()=>{
   
    
})

</script>

<style>

</style>