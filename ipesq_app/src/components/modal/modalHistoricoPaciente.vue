<template>
    <v-dialog  class="maiuscula" transition="dialog-top-transition" width="80%" persistent>
        

        <v-card class="px-4 py-4">
        <span class="d-flex justify-end">
                    <v-icon class="pa-3" @click="close">
                    mdi-close-circle-outline
                    </v-icon>
                </span>
        <h1 class="text-center maiuscula">Histórico de formulários</h1>
        <br>
       
            
          
            <v-text-field type="date" v-model="formData.dataInicio" label="Data inicio" outlined></v-text-field>
            <v-text-field type="date" v-model="formData.dataFim" label="Data final" outlined></v-text-field>
            
            
            <v-btn class="primary" @click="buscar">BUSCAR<v-icon
          end
          icon="mdi-magnify"
        ></v-icon></v-btn>
            
            
        <v-data-table
            :headers="headers"
            :items="formularios"
            loading-text="Carregando formulários"
            no-data-text="O usuário não possui formulários"
            
           
            ><template #bottom></template>
        </v-data-table>


        </v-card>
        </v-dialog>
        
</template>

<script setup>
import { ref,defineEmits, onMounted,computed  } from 'vue';
import { useMyPaciente} from '@/stores/paciente'
import {getFormularios} from '@/modulos/pacientesMethods'


const paciente = useMyPaciente()

const headers = ref([
      { key: 'dataAplicacao', title: 'data Aplicacao' },
    ]);


const formData = ref({
    dataInicio: null,
    dataFim: null,
  
});

const emit = defineEmits(['close'])

var formularios = computed(() => {
  return paciente.pacienteSelecionado.formularios;
});

const buscar = (()=>{
    getFormularios(formData.value)
    console.log("buscou")
})

const close = (()=>{
    
    emit('close', false);

})

onMounted(()=>{
   
    
})

</script>

<style>

</style>