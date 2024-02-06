<template>
    <v-container>
      <v-row >
        <v-col cols="10">
        <VAutocomplete
        :items="pacientes"
        item-title="nome"
        item-value="id"
        v-model="selectedPaciente"
       
        >
        </VAutocomplete>
        {{ modal }}
        
      </v-col>
        <v-btn class="mt-5" @click="abreModal">Novo Paciente</v-btn>

      </v-row>
      <v-card class=" mt-5" v-if="pacienteSelecionado">
        <v-col class="mt-1 ml-2 pb-4">
        
        
          <v-col>
            <v-row> <h4>Nome: &nbsp;</h4> {{ pacienteSelecionado.nome }}</v-row>
            <v-row> <h4>Nome da mãe: &nbsp;</h4> {{ pacienteSelecionado.nomeMae }}</v-row>
          </v-col>
         

        
      
          <v-col>
          <v-row> <h4>Idade:&nbsp; </h4><span> {{ pacienteSelecionado.idade }}</span> </v-row>
            <v-row> <h4>Data de nascimento: &nbsp;</h4><span> {{ pacienteSelecionado.dataNascimento }}</span> </v-row>
          </v-col>
        
      </v-col>
        <v-card-actions class="mt-2">
          <h4 >NOVO FORMULÁRIO</h4>
          <v-select
          :items="['FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA','FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA']"
          v-model="formulario"
          ></v-select>
        </v-card-actions>
      </v-card>
      
      <modal-cadastrar-paciente
      :show="modal"
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


onMounted(async () => {
      await getPacientes().then((resp)=>{
        pacientes.value = resp.data

      })
      paciente.resetPacienteSelecionado()
    });

</script>

<style>

</style>