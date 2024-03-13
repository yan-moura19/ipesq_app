<template>
    <v-dialog  class="maiuscula" transition="dialog-top-transition" width="80%" >
        

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
            <VAutocomplete
            :items="especialidades"
            item-title="nome"
            item-value="id"
            clearable
            v-model="formData.especialidadeId"
        
            />
            
            
            
            <v-btn class="primary" @click="buscar">BUSCAR<v-icon
          end
          icon="mdi-magnify"
        ></v-icon></v-btn>
            
            
        <v-data-table
            :headers="headers"
            :items="formularios"
            :loading="loading"
            loading-text="Carregando formulários"
            no-data-text="O usuário não possui formulários"
            @click:row="handleClick"
            :items-per-page="5"
            
           
            >
        </v-data-table>


        </v-card>
        </v-dialog>
        
</template>

<script setup>
import { ref,defineEmits, onMounted,computed  } from 'vue';
import { useMyPaciente} from '@/stores/paciente'
import {getFormularios, getEspecialidades} from '@/modulos/pacientesMethods'
import { useRouter } from 'vue-router';
import moment from 'moment';
import  {useMyForm} from '@/stores/form'
import {useMyStore} from '@/stores/store'


const paciente = useMyPaciente()
const router = useRouter();
const storeDB =  useMyStore();

const headers = ref([
      { key: 'dataAplicacao', title: 'data Aplicacao' },
      { key: 'nomeForm', title: 'Formulário' }
    ]);

const useForm = useMyForm()


const formData = ref({
    dataInicio: moment().format("YYYY-MM-DD"),
    dataFim: moment().format("YYYY-MM-DD"),
    especialidadeId: ''
  
});
const loading = ref(false)

const emit = defineEmits(['close'])

var especialidades = computed(() => {
  return storeDB.especialidades;
});


var formularios = computed(() => {
  return paciente.pacienteSelecionado.formularios;
});



const handleClick = (event, row)=>{
   
    let form = JSON.parse(row.item.form)
    let nomeForm = row.item.nomeForm
    form.id = row.item.id
    useForm.setForm(form)
    let rota = nomeForm.trim().toLowerCase()


    
    rota = rota.replace(/\s/g, "")
    rota = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
    if (rota === 'fichadeevolucaofisioterapia/psicomotricidade'){
    rota = 'fichadeevolucaofisioterapiapsicomotricidade'
  }
        router.push({name: rota})
}

const buscar = (()=>{
    loading.value =true
    getFormularios(formData.value).then(()=>{
        loading.value =false

    }).catch(()=>{
        loading.value =false
    })
    
   
})

const close = (()=>{
    
    emit('close', false);

})

onMounted(()=>{
    buscar()
    getEspecialidades().then((resp)=>{
        if (resp && resp.data) {
        especialidades.value = resp.data;
    }
    })
   
    
})

</script>

<style>

</style>