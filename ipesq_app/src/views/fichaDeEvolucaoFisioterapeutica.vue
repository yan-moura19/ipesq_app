<template>
    <info-paciente/>
    <v-container fluid width="800px">
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA
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
        multiple
        :items="itensDeUso"
        v-model="formSelecionado.tala"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Uso de Órtese </span> 
        <v-select
        class="mx-4 "
        multiple
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
        <h4>Responsável: <span>{{ formSelecionado.profissional }}</span> </h4> 
        
    </v-col>
    <v-col cols="12">
        <v-row v-if="!!formSelecionado.id && hoje === formSelecionado.dataAplicacao" class="d-flex justify-end">
            <v-btn color="primary" @click="salvar">SALVAR ALTERAÇÕES</v-btn>
            
        </v-row>
        <v-row v-else-if="!!formSelecionado.id && !(hoje === formSelecionado.dataAplicacao)" class="d-flex justify-end">
            
            
        </v-row>
        <v-row v-else class="d-flex justify-end"><v-btn color="primary" :loading="loading" @click="salvar">SALVAR</v-btn></v-row>

    </v-col>
    <!-- <button class="floating-button-esquerda" @click="voltar"> <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon></button> -->
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

const hoje = moment().format("YYYY-MM-DD")

const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)
      const loading = ref(false)
      


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
    loading.value = true
    
    
    let hoje = moment().format('YYYY-MM-DD');
    let body = {  
        dataAplicacao:  useForm.formSelecionado.dataAplicacao,
        nomeForm: "FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA",
        formJson: formSelecionado.value,
        especialidadeId: 1
    }
    await salvarFormulario(body).then((resp)=>{
        snackbar.value = true
        loading.value = false
      message.value = 'Formulário salvo'

    }).catch(()=>{
        snackbar.value = true
        loading.value = false
        message.value = 'Não foi possivel salvar'
       
    })


    
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