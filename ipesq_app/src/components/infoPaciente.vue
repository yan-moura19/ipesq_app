<template>
  <v-card class=" mt-5 ml-2 mr-2" v-if="pacienteSelecionado">
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
        
      </v-card>
</template>

<script setup>
import { useMyPaciente} from '@/stores/paciente'
import { ref,watch, computed } from 'vue';


const paciente = useMyPaciente()

var pacienteSelecionado = computed(() => {
  return paciente.pacienteSelecionado;
});


</script>

<style>

</style>