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
        
       
       
        
      </v-col>
      <v-col cols="2" > <v-btn size="55" @click="abreModal">
        <v-icon
         
          icon="mdi-account-plus"
        ></v-icon></v-btn></v-col>
     
        

      </v-row>
      
      <info-paciente/>
      <v-card class="mt-2 align-center text-center" v-if="!!paciente.pacienteSelecionado.nome">
        <h4 class="mt-2 ml-2">NOVO FORMULÁRIO</h4>
          <v-select
          class="ml-2 mr-2 mt-2"
          :items="rotas"
          v-model="formulario"
          ></v-select>
          <v-btn class="mb-2 ml-2 mr-8" block @click="abreModalHistorico">Historico de FORMULÁRIO</v-btn>
      </v-card>
      
      <modal-cadastrar-paciente
      
      v-model="modal"
      @close="closeModal"
      />
      <ModalHistoricoPaciente
      v-model="modalHistorico"
      @close="closeModalHistorico"
      />
       
    </v-container>
  
</template>

<script setup>
import {  ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPacientes, getPacientePorId } from '../modulos/pacientesMethods'
import { useMyPaciente} from '@/stores/paciente'
import ModalHistoricoPaciente from '@/components/modal/modalHistoricoPaciente.vue';

var pacienteSelecionado = ref(null)
const modalHistorico = ref(false);
const modal = ref(false);
const paciente = useMyPaciente()
pacienteSelecionado.value = paciente.pacienteSelecionado

const rotas = ref(
  [
    'FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA',
    'FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA',
     'FICHA DE EVOLUÇÃO PSICOPEDAGOGIA',
     'FICHA DE EVOLUÇÃO FISIOTERAPIA/PSICOMOTRICIDADE',
     'FICHA DE EVOLUÇÃO FONOAUDIOLOGIA',
     'ACOMPANHAMENTO MENSAL'
    ]
)

const resetPaciente = (()=>{
  paciente.resetPacienteSelecionado()
})
const router = useRouter();
var pacientes = ref([]);
var formulario = ref(null)

watch(formulario, (novoValor, valorAntigo) => {
 
  var rota =novoValor.trim().toLowerCase()
  rota = rota.replace(/\s/g, "")
  rota = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (rota === 'fichadeevolucaofisioterapia/psicomotricidade'){
    rota = 'fichadeevolucaofisioterapiapsicomotricidade'
  }
 
  
 
  
  router.push({name: rota})
  
 
});
const selectedPaciente = ref(null);


const closeModal = (()=>{
  modal.value = false
  getNomesPacientes();
})
const abreModal = (()=>{
  modal.value =true
})
const closeModalHistorico = (()=>{
  modalHistorico.value = false
  
})
const abreModalHistorico = (()=>{
  modalHistorico.value =true
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