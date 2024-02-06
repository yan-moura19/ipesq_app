<template>
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
        v-model="form.egi"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Conduta </span> 
        <v-select
        multiple
        class="mx-4 "
        :items="itensCondutas"
        v-model="form.conduta"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Uso de Tala </span> 
        <v-select
        class="mx-4 "
        :items="itensDeUso"
        v-model="form.tala"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Uso de Órtese </span> 
        <v-select
        class="mx-4 "
        :items="itensDeUso"
        v-model="form.ortese"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Relato </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="form.relato"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">EGF</span> 
        <v-select
        multiple
        class=""
        :items="itensEG"
        v-model="form.egf"
        ></v-select>
    </v-col>
    <v-btn class="primary">SALVAR</v-btn>
    
    <button class="floating-button-direita" @click="voltar"> <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon></button>
    <!-- <v-card>
        <v-btn class="primary">SALVAR</v-btn>
    </v-card> -->
    </v-container>
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()


const voltar = (()=>{
    router.push('/paciente')

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