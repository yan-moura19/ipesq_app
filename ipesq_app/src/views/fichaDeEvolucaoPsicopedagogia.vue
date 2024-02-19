<template>
    <info-paciente/>
    <v-container fluid >
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        FICHA DE EVOLUÇÃO PSICOPEDAGOGIA
      </h2>
    </v-card>
    
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Data de aplicação</span> 
        <v-text-field type="date" v-model="formSelecionado.dataAplicacao" label="Data aplicação" outlined></v-text-field>
        
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Faltou?</span> 
        <v-select
        class=""
 
        :items="['Sim','Não']"
        v-model="formSelecionado.falta"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Estado da criança no
                início da sessão</span> 
        <v-select
        class=""
        multiple
        :items="itensEG"
        v-model="formSelecionado.estadoCriancaInicio"
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
        <span class="mx-2 flex-grow-0">Recursos pedagógicos utilizados </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.recursoPedagogicosUtilizados"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Relato da sessão </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.relato"
        ></v-text-field>
    </v-col>
    
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Estado da criança ao
final da sessão</span> 
        <v-select
        multiple
        class=""
        :items="itensEG"
        v-model="formSelecionado.estadoCriancaFinal"
        ></v-select>
    </v-col>
    <v-col>
        <h4>Responsável: <span>{{ formSelecionado.profissional }}</span> </h4> 
        
    </v-col>
    <v-col cols="12">
        <v-row v-if="!!formSelecionado.id" class="d-flex justify-end"></v-row>
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
    </v-snackbar>
   
    </v-container>
  
</template>

<script setup>
import { ref, computed, onBeforeUnmount,onMounted} from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment'
import {salvarFormulario,atualizaFormulario, getNomeLogin}  from '@/modulos/pacientesMethods'
import  { useMyForm} from '@/stores/form'

const router = useRouter()
const useForm = useMyForm()
const data = ref()

const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)


var formSelecionado = computed(() => {
  return useForm.formSelecionado;
});
onBeforeUnmount(()=>{
    useForm.resetForm()
})
onMounted(()=>{
   
    if(!!useForm.formSelecionado.id){
       

    }else{
        useForm.formSelecionado.dataAplicacao = moment().format('YYYY-MM-DD')
        useForm.formSelecionado.profissional = getNomeLogin() 
     
    }
   
   
})

const voltar = (()=>{
    router.push({name: 'pacienteList'})
    useForm.resetForm()

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
        nomeForm: "FICHA DE EVOLUÇÃO PSICOPEDAGOGIA",
        formJson: formSelecionado.value,
        especialidadeId: 3
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
    'Treino de coordenação motora fina',
    'Treino de memória',
    'Treino de raciocínio lógico',
    'Treino de sequência lógica',
    'Treino de foco',
    'Treino de atenção e concentração',
    'Treino de cognição',
    'Treino de linguagem',
    'Treino de escrita',
   



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