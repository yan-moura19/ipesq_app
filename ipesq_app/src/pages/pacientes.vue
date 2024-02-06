<template>
    <v-container>
      <v-row >
        
        <v-col cols="12">
          <VAutocomplete
        :items="pacientes"
        item-title="nome"
        item-value="id"
        v-model="selectedPaciente"
       
        >
        </VAutocomplete>
        
        <v-btn  @click="abreModal">Novo Paciente</v-btn>
        
      </v-col>
        

      </v-row>
      
      <info-paciente/>
      <v-card class="mt-2">
        <h4 class="mt-2 ml-2">NOVO FORMULÁRIO</h4>
          <v-select
          class="ml-2 mr-2 mt-2"
          :items="['FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA','FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA']"
          v-model="formulario"
          ></v-select>
      </v-card>
      
      <modal-cadastrar-paciente
      
      v-model="modal"
      @close="closeModal"
      />
       
    </v-container>
  
</template>

<script setup>
import {  ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPacientes, getPacientePorId } from '../modulos/pacientesMethods'
import { useMyPaciente} from '@/stores/paciente'

var pacienteSelecionado = ref(null)
const paciente = useMyPaciente()
pacienteSelecionado.value = paciente.pacienteSelecionado

const resetPaciente = (()=>{
  paciente.resetPacienteSelecionado()
})
const router = useRouter();
var pacientes = ref([]);
var formulario = ref()

watch(formulario, (novoValor, valorAntigo) => {
  var rota =novoValor.trim().toLowerCase()
  rota = rota.replace(/\s/g, "")
  rota = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  
  router.push({name: rota})
  
 
});
const selectedPaciente = ref(null);

const modal = ref(false);
const closeModal = (()=>{
  modal.value = false
  getNomesPacientes();
})
const abreModal = (()=>{
  modal.value =true
})

const onSelectedPacienteChange =  (idPaciente) => {
     
      getPacientePorId(idPaciente).then(()=>{
        
      }) 
}




watch(selectedPaciente, (novoValor, valorAntigo) => {
  getPacientePorId(novoValor).then(()=>{
    pacienteSelecionado.value = paciente.pacienteSelecionado
      }) 
});

const getNomesPacientes = (()=>{
  getPacientes().then((resp)=>{
        pacientes.value = resp.data

      })
})


onMounted(async () => {
    await getNomesPacientes();
      
    });

</script>

<style>

</style>