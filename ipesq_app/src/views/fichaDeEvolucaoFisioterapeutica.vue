<template>
    <info-paciente/>
    <v-container fluid width="800px">
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA
      </h2>
    </v-card>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">EGI</span> 
        <v-select
        class=""
        multiple
        :items="itensEG"
        v-model="formSelecionado.egi"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Conduta </span> 
        <v-select
        multiple
        class="mx-4 "
        :items="itensCondutas"
        v-model="formSelecionado.conduta"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Uso de Tala </span> 
        <v-select
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.tala"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Uso de Órtese </span> 
        <v-select
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.ortese"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Relato </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.relato"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">EGF</span> 
        <v-select
        multiple
        class=""
        :items="itensEG"
        v-model="formSelecionado.egf"
        ></v-select>
    </v-col>
    <v-col>
        <h4>Profissional responsável: {{ profissional }}</h4>
    </v-col>
    <v-col cols="12">
        <v-row class="d-flex justify-end"><v-btn color="primary" @click="salvar">SALVAR</v-btn></v-row>

    </v-col>
    <button class="floating-button-esquerda" @click="voltar"> <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon></button>
   
    </v-container>
  
</template>

<script setup>
import { ref, computed, onBeforeUnmount,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment'
import {salvarFormulario}  from '@/modulos/pacientesMethods'
import  { useMyForm} from '@/stores/form'

const router = useRouter()
const useForm = useMyForm()

var formSelecionado = computed(() => {
  return useForm.formSelecionado;
});
onBeforeUnmount(()=>{
    useForm.resetForm()
})
onMounted(()=>{
   console.log( !!useForm.formSelecionado.id)
   
})

const voltar = (()=>{
    router.push({name: 'pacienteList'})
    useForm.resetForm()

})
const salvar = (async ()=>{
    let hoje = moment().format('YYYY-MM-DD');
    let body = {  
        dataAplicacao: hoje,
        nomeForm: "FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA",
        formJson: formSelecionado,
    }
    await salvarFormulario(body).then((resp)=>{
        alert("salvo")

    }).catch(()=>{
        alert("não foi possivel salvar")
    })


    
})

var form = ref({
    egi: [],
    conduta: [],
    tala: '',
    ortese: '',
    relato: '',
    egf: []



})
const itensDeUso = ref([
    'MMSS',
    'MMII'
])
const itensCondutas = ref([
    'Alongamento',
    'Fortalecimento',
    'Mobilização',
    'Equilíbrio/propriocepção',
    'Estimulação precoce',
    'Treino de marcha',
    'Coordenação motora fina',
    'Habilidades motoras',
    'Gaiola de habilidades',
    'Psicomotricidade',
    'Bobath',
    'Pediasuit',
    'Pediasuit Baby'



])
const itensEG = ref([
    'Tranquilo',
    'Agitado',
    'Colaborativo',
    'Pouco colaborativo',
    'Não colaborativo',
    'Disperso',
    'Choroso',
    'Sonolento'
])

</script>

<style>

</style>