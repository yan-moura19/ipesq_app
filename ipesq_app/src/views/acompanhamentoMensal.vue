<template>
    <info-paciente/>
    <v-container fluid width="800px">
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4 maiuscula">
        Acompanhamento mensal
      </h2>
    </v-card>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Data de aplicação</span> 
        <v-text-field type="date" v-model="formSelecionado.dataAplicacao" label="Data aplicação" outlined></v-text-field>
        
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Medicamentos </span> 
        <v-text-field
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.medicamentos"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Leite</span> 
        <v-select
        class=""
 
        :items="['Sim','Não']"
        v-model="formSelecionado.leite"
        ></v-select>
    </v-col>
    <v-col
    v-if="formSelecionado.leite == 'Sim'"
    class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Tipo (LEITE)</span> 
        <v-select
        class=""
        multiple
        :items="itensLeite"
        v-model="formSelecionado.tipoLeite"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Suplemento</span> 
        <v-select
        class=""
 
        :items="['Sim','Não']"
        v-model="formSelecionado.suplemento"
        ></v-select>
    </v-col>
    <v-col 
    v-if="formSelecionado.suplemento == 'Sim'"
    class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Tipo (Suplemento)</span> 
        <v-select
        class=""
        multiple
        :items="itensSuplemento"
        v-model="formSelecionado.tipoSuplemento"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Espasmos</span> 
        <v-select
        class=""
 
        :items="['Sim','Não']"
        v-model="formSelecionado.espasmos"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Convulsão</span> 
        <v-select
        class=""
 
        :items="['Sim','Não']"
        v-model="formSelecionado.convulsao"
        ></v-select>
    </v-col>
    <v-col
    v-if="formSelecionado.convulsao =='Sim'"
    
    class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Frequência convulsão</span> 
        <v-select
        class=""
 
        :items="['Diária','Semanalmente','Outra']"
        v-model="formSelecionado.frequenciaConvulsao"
        ></v-select>
        
    </v-col>
    <v-col v-if="formSelecionado.frequenciaConvulsao == 'Outra'" class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Outra Frequência</span> 
        <v-text-field
        
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.outraFrequencia"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center ">
        <span class="mx-2 flex-grow-0 pr-2">Intercorrência</span> 
        <v-select
        class=""
 
        :items="['Sim','Não']"
        v-model="formSelecionado.Intercorrencia"
        ></v-select>
    </v-col>
    <v-col
    v-if="formSelecionado.Intercorrencia == 'Sim'"
    class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Tipos (Intercorrência) </span> 
        <v-select
        multiple
        class="mx-4 "
        :items="itensIntercorrencia"
        v-model="formSelecionado.tiposIntecorrencia"
        ></v-select>
       
    </v-col>
    <v-col   v-if="tiposIntecorrencias.includes('Outros')"
     class="d-flex justify-start align-center">
     <span class="mx-2 flex-grow-0">Outros (Intercorrência) </span> 
        <v-text-field
      
        class="mx-4 "
        :items="itensDeUso"
        v-model="formSelecionado.outrosIntecorrencia"
        ></v-text-field>

    </v-col>
    <v-col
    v-if="formSelecionado.Intercorrencia == 'Sim'"
    class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> Detalhes </span> 
        <v-textarea
        class="mx-4 "
      
        v-model="formSelecionado.detalhes"
        ></v-textarea>
    </v-col>
   
    
    <v-col>
        <h4>Responsável: <span>{{ formSelecionado.profissional }}</span> </h4> 
        
    </v-col>
    <v-col cols="12">
        <v-col cols="12">
        <v-row v-if="!!formSelecionado.id && hoje === formSelecionado.dataAplicacao" class="d-flex justify-end">
        <v-btn color="primary" @click="salvar">SALVAR ALTERAÇÕES</v-btn></v-row>
        <v-row v-else-if="!!formSelecionado.id && !(hoje === formSelecionado.dataAplicacao)" class="d-flex justify-end"></v-row>
        <v-row v-else class="d-flex justify-end"><v-btn color="primary" @click="salvar">SALVAR</v-btn></v-row>

    </v-col>

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


const message = ref('')
      const timeout = ref(2000)
      const snackbar = ref(false)
      const loading = ref(false)
      
      const hoje = moment().format("YYYY-MM-DD")

var tiposIntecorrencias = computed(() => {
  return useForm.formSelecionado.tiposIntecorrencia || [];
});

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
        dataAplicacao: hoje,
        nomeForm: "ACOMPANHAMENTO MENSAL",
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
const itensIntercorrencia = ref([
    'Engasgo',
    'Refluxo',
    'Constipação',
    'Resfriado',
    'Otite',
    'Tonsilite',
    'Sinusite',
    'Secretiva',
    'Cansaço respiratório',
    'Pneumonia',
    'Internação',
    'Febre',
    'Infecção urinaria',
    'Infecção intestinal',
    'Pelos pubianos',
    'Outros'
])
const itensSuplemento = ref([
    'Fortini',
    'Pediadure',
    'Neston Jr',
    'Ensure'
])
const itensLeite = ref([
    'Ninho',
    'Nan',
    'Nestogeno',
    'Aptamil',
    'Vaca',
    'Milnutri',
    'Neslac'
])



</script>

<style>

</style>