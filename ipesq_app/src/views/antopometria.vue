<template>
    <info-paciente/>
    <v-container fluid width="800px">
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        ANTROPOMETRIA
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
    
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">PC </span> 
        <v-text-field
        class="mx-4 "
       
        v-model="formSelecionado.pc"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Triciptal </span> 
        <v-text-field
        class="mx-4 "
       v-model="formSelecionado.triciptal"
        ></v-text-field>
    </v-col>
    
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Sub-escapular </span> 
        <v-text-field
        class="mx-4 "
       v-model="formSelecionado.sub_escapular"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Circunferência Abdominal </span> 
        <v-text-field
        class="mx-4 "
       v-model="formSelecionado.circunferencialAbdominal"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Braço </span> 
        <v-text-field
        class="mx-4 "
       v-model="formSelecionado.braco"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Perna Direita </span> 
        <v-text-field
        class="mx-4 "
       v-model="formSelecionado.perna_direita"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Perna esquerda </span> 
        <v-text-field
        class="mx-4 "
       v-model="formSelecionado.perna_esquerda"
        ></v-text-field>
    </v-col>
   
    <v-col class="d-flex justify-start align-center">
      <span class="mx-2 flex-grow-0">Estatura</span>
      <v-text-field
        class="mx-4"
        v-model="formSelecionado.estatura"
        type="number"
        label="Estatura (m)"
       
      ></v-text-field>
    </v-col>

    <v-col class="d-flex justify-start align-center">
      <span class="mx-2 flex-grow-0">Peso</span>
      <v-text-field
        class="mx-4"
        v-model="formSelecionado.peso"
        type="number"
        label="Peso (kg)"
        
      ></v-text-field>
    </v-col>

    <v-col class="d-flex justify-start align-center">
      <h3>IMC: {{ imc }}</h3>
    </v-col>

  
    <v-col :class="`${resultadoClass} d-flex justify-start align-center green--text` " >
           <v-icon :color="resultadoColor">
            {{ resultadoIcon }}
            </v-icon>
      <span :style="{ color: resultadoColor }">{{ resultadoText }}</span>
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
        nomeForm: "ANTROPOMETRIA",
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
const imc = computed(() => {
  const peso = parseFloat(formSelecionado.value.peso);
  const estatura = parseFloat(formSelecionado.value.estatura);
  
  if (!peso || !estatura || estatura <= 0) return null;
  
  return (peso / (estatura * estatura)).toFixed(2);
});


const resultadoText = computed(() => {
  const valorIMC = parseFloat(imc.value);
  
  if (valorIMC < 18.5) return "Baixo peso";
  if (valorIMC >= 18.5 && valorIMC <= 24.9) return "Peso adequado";
  if (valorIMC > 24.9) return "Sobrepeso";
  return ""; 
});


const resultadoClass = computed(() => {
  const valorIMC = parseFloat(imc.value);
  if (valorIMC < 18.5) return 'red--text';  
  if (valorIMC >= 18.5 && valorIMC <= 24.9) return 'green--text'; 
  if (valorIMC > 24.9) return 'orange--text';  
  return ''; 
});


const resultadoIcon = computed(() => {
  const valorIMC = parseFloat(imc.value);
  
  if (valorIMC < 18.5) return 'mdi-alert-circle';  
  if (valorIMC >= 18.5 && valorIMC <= 24.9) return 'mdi-check-circle';  
  if (valorIMC > 24.9) return 'mdi-alert-circle'; 
  return ''; 
});
const resultadoColor = computed(() => {
  const valorIMC = parseFloat(imc.value);
  if (valorIMC < 18.5) return 'red';
  if (valorIMC >= 18.5 && valorIMC <= 24.9) return 'green';
  if (valorIMC > 24.9) return 'orange';
  return '';
});

</script>

<style>

</style>