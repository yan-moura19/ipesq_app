<template>
    <info-paciente/>
    <v-container fluid >
        <v-card class="my-2 py-4 text-center teal darken-4">
      <h2 class="grey--text text--lighten-4">
        FICHA DE EVOLUÇÃO FONOAUDIOLOGIA
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
        <span class="mx-2 flex-grow-0">Asculta cervical Inicial </span> 
        <v-select
       
        class="mx-4 "
        :items="itensAsculta"
        v-model="formSelecionado.ascultaCervicalInicial"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> SpO² inicial  </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.spoInicial"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> FC inicial  </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.fcInicial"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0" cols="6">Sinais Clínicos de penetração/aspiração </span> 
        <v-select
        class=""
        :items="itensSinaisClinicos"
        v-model="formSelecionado.sinaisClinicos"
        ></v-select>
    </v-col>

    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Fotobiomodulação </span> 
        <v-select
        class="mx-4 "
        :items="['Realizado','Não realizado']"
        v-model="formSelecionado.fotobiomodulacao"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center" v-if="formSelecionado.fotobiomodulacao == 'Realizado'">
        <span class="mx-2 flex-grow-0">Fotobiomodulação </span> 
        <v-textarea
        class="mx-4 "
       
        v-model="formSelecionado.fotobiomodulacaoText"
        ></v-textarea>
    </v-col>
    <v-col class="d-flex justify-start align-center" >
        <span class="mx-2 flex-grow-0">objetivo </span> 
        <v-textarea
        class="mx-4 "
       
        v-model="formSelecionado.objetivoText"
        ></v-textarea>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Comprimento de onda  </span> 
        <v-select
        class="mx-4 "
        :items="['vermelho','infravermelho']"
        v-model="formSelecionado.comprimentoDeOnda"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> Ept </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.ept"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> Et </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.et"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Fluência </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.fluencia"
        ></v-text-field>
        <span class="mx-2 flex-grow-0">cm² </span> 
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Tempo </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.tempo"
        ></v-text-field>
        
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">f </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.tempoF"
        ></v-text-field>
        <span class="mx-2 flex-grow-0">Hz </span> 
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">ILIB </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.ilib"
        ></v-text-field>
        <span class="mx-2 flex-grow-0">Hz </span> 
    </v-col>
    <v-col class="d-flex justify-start align-center" >
        <span class="mx-2 flex-grow-0">Observações </span> 
        <v-textarea
        class="mx-4 "
       
        v-model="formSelecionado.objetivoText"
        ></v-textarea>
    </v-col>

    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Bandagem  </span> 
        <v-select
        class="mx-4 "
        :items="['Elástica','Hiperelástica', 'Não realizado']"
        v-model="formSelecionado.bandagem"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Tensão Utilizada  </span> 
        <v-select
        class="mx-4 "
        :items="['Papper off','10%', '20%', '30%', '50%', '75%']"
        v-model="formSelecionado.tensaoUtilizada"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center" >
        <span class="mx-2 flex-grow-0">Relato da sessão </span> 
        <v-textarea
        class="mx-4 "
       
        v-model="formSelecionado.relato"
        ></v-textarea>
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

    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0">Asculta cervical final </span> 
        <v-select
       
        class="mx-4 "
        :items="itensAsculta"
        v-model="formSelecionado.ascultaCervicalFinal"
        ></v-select>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> SpO² final  </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.spoFinal"
        ></v-text-field>
    </v-col>
    <v-col class="d-flex justify-start align-center">
        <span class="mx-2 flex-grow-0"> FC final  </span> 
        <v-text-field
        class="mx-4 "
        
        v-model="formSelecionado.fcFinal"
        ></v-text-field>
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
      const itensAsculta = ref([
        'Ruidosa',
        'sem alterações'
    ])

const itensSinaisClinicos = ref([
    'Tosse',
    'Pigarro',
    'Febre',
    'Cianose',
    'Engasgos',
    'diminuição de SpO2%',
    'aumento da FC',
    'sem sinais',
    'voz molhada'

])

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
        nomeForm: "FICHA DE EVOLUÇÃO FONOAUDIOLOGIA",
        formJson: formSelecionado.value,
        especialidadeId: 2
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