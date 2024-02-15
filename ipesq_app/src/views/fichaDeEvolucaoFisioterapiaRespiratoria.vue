<template>
    <v-container fluid width="800px">
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA

      </h2>
    </v-card>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Data de aplicação</span> 
        <v-text-field type="date" v-model="formSelecionado.dataAplicacao" label="Data aplicação" outlined></v-text-field>
        
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Estado da criança
                    no início da sessão</span> 
        <v-select
        class=""
        multiple
        :items="itensEG"
        v-model="formSelecionado.estadoCriancaInicio"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Ausculta pulmonar inicial </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.auscultaPulmonarInicial"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <v-row>
            <span class="mx-2 flex-grow-0">Sinais vitais iniciais: </span>
            <v-col>
                <v-row><span class="mt-4">SpO2</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="formSelecionado.sinaisVitaisIniciais.spop2"
                    ></v-text-field><span class="mt-4">%.</span></v-row>
                    <v-row><span class="mt-4">FC</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="formSelecionado.sinaisVitaisIniciais.fc"
                    ></v-text-field><span class="mt-4">bpm.</span></v-row>
                    <v-row><span class="mt-4">FR</span> <v-text-field
                    class="mx-4"
                    :items="itensDeUso"
                    v-model="formSelecionado.sinaisVitaisIniciais.fr"
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
        v-model="formSelecionado.conduta"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Relatos da sessão </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.relato"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Ausculta pulmonar final </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.auscultaPulmonarFinal"
        ></v-text-field>
    </v-col>
    
    
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Estado da criança ao final da sessão:</span> 
        <v-select
        multiple
        class=""
        :items="itensEG"
        v-model="formSelecionado.estadoCriancaFinal"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <v-row>
            <span class="mx-2 flex-grow-0">Sinais vitais finais: </span>
            <v-col>
                <v-row><span class="mt-4">SpO2</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="formSelecionado.sinaisVitaisFinais.spop2"
                    ></v-text-field><span class="mt-4">%.</span></v-row>
                    <v-row><span class="mt-4">FC</span> <v-text-field
                    class="mx-4 "
                    :items="itensDeUso"
                    v-model="formSelecionado.sinaisVitaisFinais.fc"
                    ></v-text-field><span class="mt-4">bpm.</span></v-row>
                    <v-row><span class="mt-4">FR</span> <v-text-field
                    class="mx-4"
                    :items="itensDeUso"
                    v-model="formSelecionado.sinaisVitaisFinais.fr"
                    ></v-text-field> <span class="mt-4">irpm.</span></v-row>
            
            
            </v-col>

        </v-row>
        
        
    </v-col>
    <v-col>
        <h4>Responsável: <span>{{ formSelecionado.profissional }}</span> </h4>
        
    </v-col>
    <v-col cols="12">
        
        <v-row v-if="!!formSelecionado.id" class="d-flex justify-end"><v-btn color="primary" @click="editar">SALVAR ALTERAÇÕES</v-btn></v-row>
        <v-row v-else class="d-flex justify-end"><v-btn color="primary" @click="salvar">SALVAR</v-btn></v-row>

    </v-col>
    
    
    
    <button class="floating-button-esquerda" @click="voltar"> <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon></button>
        <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ message }}

      <template v-slot:actions>
        <v-btn
          color="blue"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>>
    </v-container>
  
</template>

<script setup>
import { ref,computed,onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment'
import {salvarFormulario,getNomeLogin,atualizaFormulario}  from '@/modulos/pacientesMethods'
import  { useMyForm} from '@/stores/form'
const router = useRouter()


const useForm = useMyForm()
const profissional = ref(getNomeLogin())
        const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)


if(!!useForm.formSelecionado.id){

}else{
    useForm.formFisioterapiaRespiratoria()
    useForm.formSelecionado.dataAplicacao = moment().format('YYYY-MM-DD')
    useForm.formSelecionado.profissional = getNomeLogin() 

}

var formSelecionado = computed(() => {
  return useForm.formSelecionado;
});
onBeforeUnmount(()=>{
    useForm.resetForm()
})
const voltar = (()=>{
    router.push({name: 'pacienteList'})
    useForm.resetForm()

})

onMounted(()=>{
    if(!!useForm.formSelecionado.id){

    }else{
        useForm.formSelecionado.dataAplicacao = moment().format('YYYY-MM-DD')
    useForm.formSelecionado.profissional = getNomeLogin() 

    }
})
const editar = (()=>{
    
    atualizaFormulario(formSelecionado.value).then(()=>{
        snackbar.value = true
      message.value = 'Alterações salvas no formulário'

    }).catch(()=>{
        snackbar.value = true
        message.value = 'Não foi possivel salvar as alterações'
       
    })

})
const salvar = (async ()=>{
    
    let hoje = moment().format('YYYY-MM-DD');
    let body = {  
        dataAplicacao: hoje,
        nomeForm: "FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA",
        formJson: formSelecionado.value,
        especialidadeId: 1
    }
    await salvarFormulario(body).then((resp)=>{
        snackbar.value = true
      message.value = 'Formulário salvo'

    }).catch(()=>{
        snackbar.value = true
        message.value = 'Não foi possivel salvar'
       
    })


    
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