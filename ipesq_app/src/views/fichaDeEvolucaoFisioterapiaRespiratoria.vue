<template>
    <v-container fluid width="800px">
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA

      </h2>
    </v-card>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Estado da criança
                    no início da sessão</span> 
        <v-select
        class=""
        multiple
        :items="itensEG"
        v-model="form.estadoCriancaInicio"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Ausculta pulmonar inicial </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="form.auscultaPulmonarInicial"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <v-row>
            <span class="mx-2 flex-grow-0">Sinais vitais iniciais: </span>
            <v-col>
                <v-row><span class="mt-4">SpO2</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="form.sinaisVitaisIniciais.spop2"
                    ></v-text-field><span class="mt-4">%.</span></v-row>
                    <v-row><span class="mt-4">FC</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="form.sinaisVitaisIniciais.fc"
                    ></v-text-field><span class="mt-4">bpm.</span></v-row>
                    <v-row><span class="mt-4">FR</span> <v-text-field
                    class="mx-4"
                    :items="itensDeUso"
                    v-model="form.sinaisVitaisIniciais.fr"
                    ></v-text-field> <span class="mt-4">irpm.</span></v-row>
            
            
            </v-col>

        </v-row>
        
        
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Condutas </span> 
        <v-select
        multiple
        class="mx-4 "
        :items="itensCondutas"
        v-model="form.conduta"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Relatos da sessão </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="form.relato"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Ausculta pulmonar final </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="form.auscultaPulmonarFinal"
        ></v-text-field>
    </v-col>
    
    
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Estado da criança ao final da sessão:</span> 
        <v-select
        multiple
        class=""
        :items="itensEG"
        v-model="form.estadoCriancaFinal"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <v-row>
            <span class="mx-2 flex-grow-0">Sinais vitais finais: </span>
            <v-col>
                <v-row><span class="mt-4">SpO2</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="form.sinaisVitaisFinais.spop2"
                    ></v-text-field><span class="mt-4">%.</span></v-row>
                    <v-row><span class="mt-4">FC</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="form.sinaisVitaisFinais.fc"
                    ></v-text-field><span class="mt-4">bpm.</span></v-row>
                    <v-row><span class="mt-4">FR</span> <v-text-field
                    class="mx-4"
                    :items="itensDeUso"
                    v-model="form.sinaisVitaisFinais.fr"
                    ></v-text-field> <span class="mt-4">irpm.</span></v-row>
            
            
            </v-col>

        </v-row>
        
        
    </v-col>
    <v-btn class="primary" @click="salvar">SALVAR</v-btn>
    
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
import moment from 'moment'
import {salvarFormulario}  from '@/modulos/pacientesMethods'

const router = useRouter()


const voltar = (()=>{
    router.go(-1)

})
const salvar = (async ()=>{
    let hoje = moment().format('YYYY-MM-DD');
    let body = {  
        dataAplicacao: hoje,
        nomeForm: "FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA",
        formJson: form.value,
    }
    await salvarFormulario(body).then((resp)=>{
        alert("salvo")

    }).catch(()=>{
        alert("não foi possivel salvar")
    })


    
})

var form = ref({
    estadoCriancaInicio: [],
    auscultaPulmonarInicial: '',
    sinaisVitaisIniciais: { 
        spop2: '',
        fc: '',
        fr: ''
    },
    conduta: '',
    relato: '',
    auscultaPulmonarFinal: '',
    estadoCriancaFinal: [],
    sinaisVitaisFinais: { 
        spop2: '',
        fc: '',
        fr: ''
    },



})
const itensDeUso = ref([
    'MMSS',
    'MMII'
])
const itensCondutas = ref([
    'Alongamentos de MMSS',
    'Alongamento de MMII',
    'Mobilidade de MMSS',
    'Mobilidade de MMII',
    'Método RTA',
    'Técnicas de expansão pulmonar',
    'Técnicas de remoção de secreções manuais',
    'Técnicas de remoção de secreções instrumentais',
    'Treinamento muscular inspiratório',
    'Treinamento aeróbico',
    'Lavagem nasal',
    'Aspiração de VAS',
    'Aspiração nasotraqueal/endotraqueal',
    'Higiene de endocânula',
    'Oxigenoterapia',
    'Aerossolterapia',
    'VNI',
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
<style scoped>

</style>