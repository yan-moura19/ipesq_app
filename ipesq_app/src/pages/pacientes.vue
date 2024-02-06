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
        <v-btn class="mt-5" @click="abreModal">Novo Paciente</v-btn>

      </v-row>
      <v-card class=" mt-5" v-if="pacienteSelecionado">
        <v-row class="mt-6 ml-8 pb-4">
        
        <v-row cols="6" md="6">
          <v-col>
            <v-row> <h4>Nome: &nbsp;</h4> {{ pacienteSelecionado.nome }}</v-row>
            <v-row> <h4>Nome da mãe: &nbsp;</h4> {{ pacienteSelecionado.nomeMae }}</v-row>
          </v-col>
         

        </v-row>
        <v-row cols="6" class="mt-n4">
          <v-col>
          <v-row> <h4>Idade:&nbsp; </h4><span> {{ pacienteSelecionado.idade }}</span> </v-row>
            <v-row> <h4>Data de nascimento: &nbsp;</h4><span> {{ pacienteSelecionado.dataNascimento }}</span> </v-row>
          </v-col>
        </v-row>
      </v-row>
        <v-card-actions class="mt-2">
          <h4 >NOVO FORMULÁRIO</h4>
          <v-select
          :items="['FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA','FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA']"
          v-model="formulario"
          ></v-select>
        </v-card-actions>
      </v-card>
      <modal-cadastrar-paciente
      
      v-bind="{ show:modal.active }"
      @close="closeModal"
      
      />
        
        <router-view></router-view>
        
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
const selectedPaciente = ref(null);

const modal = ref({
      active: true,
    });

const onSelectedPacienteChange =  (idPaciente) => {
      console.log("mudou")
      getPacientePorId(idPaciente).then(()=>{
        console.log("ok")
      }) 
}


const closeModal = (()=>{
  console.log("vo")
  modal.active = false
  console.log(modal.active)
})
const abreModal = (()=>{
  modal.active =true
})

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