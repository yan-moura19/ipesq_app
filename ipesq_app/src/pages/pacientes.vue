<template>
    <v-container>
      <v-row >
        
        <v-col cols="10">
          <VAutocomplete
        :items="pacientes"
        item-title="nome"
        item-value="id"
        v-model="selectedPaciente"
       
        >
        </VAutocomplete>
        
       
       
        
      </v-col>
      <v-col cols="2" > <v-btn size="55" @click="abreModal">
        <v-icon
         
          icon="mdi-account-plus"
        ></v-icon></v-btn></v-col>
     
        

      </v-row>
      
      <info-paciente/>
      
      <v-card class="mt-3 ml-2 mr-2 align-center text-center " v-if="!!paciente.pacienteSelecionado.nome && !semForm && countFormularios>1">
       
      <h3 class="text-h6">
        Este mês, sob os cuidados do IPESQ,
        <span class="font-weight-bold">{{ paciente.pacienteSelecionado.nome }}</span>
        voltou para casa em um estado tranquilo e colaborativo em
        <span class="font-weight-bold">{{ countSaiuBem }}</span> das {{ countFormularios }} sessões.
      </h3>
    
       <!-- <h2>Tipos de Formulários Preenchidos</h2>
    <ul>
      <li v-for="(count, tipo) in tiposDeFormularios" :key="tipo">
        {{ tipo }}: {{ count }}
      </li>
    </ul> -->
    <!-- <div v-if="!!paciente.pacienteSelecionado.nome">
                        <canvas id="myChart" ></canvas>
                    </div> -->
                    <v-divider></v-divider>
                    <grafico-paciente :chart-data="chartData" />
                    <div  v-if="!!paciente.pacienteSelecionado.nome">
        
      </div>
   
      </v-card>
      
      <v-card v-else-if="!!paciente.pacienteSelecionado.nome && semForm" class="mt-2 ml-2 mr-2">
        <h3 class="text-h6 pa-2 mt-2">
          Este mês, o paciente ainda não passou por nenhuma sessão, impossibilitando a geração do gráfico.
      </h3>
      </v-card>
      
      
      <modal-cadastrar-paciente
      
      v-model="modal"
      @close="closeModal"
      />
      <ModalHistoricoPaciente
      v-model="modalHistorico"
      @close="closeModalHistorico"
      />
       
    </v-container>
  
</template>

<script setup>
import {  ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPacientes, getPacientePorId , getFormulariosMes} from '../modulos/pacientesMethods'
import { useMyPaciente} from '@/stores/paciente'
import ModalHistoricoPaciente from '@/components/modal/modalHistoricoPaciente.vue';
import Chart from 'chart.js/auto';


var pacienteSelecionado = ref(null)
const modalHistorico = ref(false);
const modal = ref(false);
const paciente = useMyPaciente()
pacienteSelecionado.value = paciente.pacienteSelecionado

const rotas = ref(
  [
    'FICHA DE EVOLUÇÃO FISIOTERAPIA RESPIRATÓRIA',
    'FICHA DE EVOLUÇÃO FISIOTERAPÊUTICA',
     'FICHA DE EVOLUÇÃO PSICOPEDAGOGIA',
     'FICHA DE EVOLUÇÃO FISIOTERAPIA/PSICOMOTRICIDADE',
     'FICHA DE EVOLUÇÃO FONOAUDIOLOGIA',
     'ACOMPANHAMENTO MENSAL'
    ]
)
const countSaiuBem = ref(0)
const tiposDeFormularios  = ref({})

const resetPaciente = (()=>{
  paciente.resetPacienteSelecionado()
})
const router = useRouter();
var pacientes = ref([]);
var formulario = ref(null)
var countFormularios = ref(0)


const chartData = ref({}); // Coloque seus dados de gráfico aqui
const chartOptions = ref({}); // Coloque suas opções de gráfico aqui
watch(formulario, (novoValor, valorAntigo) => {
 
  var rota =novoValor.trim().toLowerCase()
  rota = rota.replace(/\s/g, "")
  rota = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (rota === 'fichadeevolucaofisioterapia/psicomotricidade'){
    rota = 'fichadeevolucaofisioterapiapsicomotricidade'
  }
 
  
 
  
  router.push({name: rota})
  
 
});
const selectedPaciente = ref(null);


const closeModal = (()=>{
  modal.value = false
  getNomesPacientes();
})
const abreModal = (()=>{
  modal.value =true
})
const closeModalHistorico = (()=>{
  modalHistorico.value = false
  
})
const abreModalHistorico = (()=>{
  modalHistorico.value =true
})

const onSelectedPacienteChange =  (idPaciente) => {
     
      getPacientePorId(idPaciente).then(()=>{
        
      }) 
}




watch(selectedPaciente, (novoValor, valorAntigo) => {
  if (novoValor == null) return;
  
  getPacientePorId(novoValor).then(async () => {
    pacienteSelecionado.value = paciente.pacienteSelecionado;
    
    try {
        const resp = await getFormulariosMes(novoValor);
        pacienteSelecionado.value = paciente.pacienteSelecionado;
        contarFormulariosComEstadoInicialRuimEFinalBom(paciente.pacienteSelecionado.formulariosMes);
        semForm.value = false;
        console.log("temForms");
        console.log(resp);
    } catch (err) {
        console.error(err.message); // Exibe a mensagem de erro no console
        semForm.value = true;
        console.log("não temForms");
        chartData.value = {};
    }
  }); 
});

const semForm = ref(false)
const getNomesPacientes = (()=>{
  getPacientes().then((resp)=>{
        pacientes.value = resp.data

      })
});
function contarFormulariosComEstadoInicialRuimEFinalBom(formularios) {
    tiposDeFormularios.value = {}
  
  if (typeof formularios == undefined) return
  if (formularios == undefined) return
  
    let contador = 0;
    let lenght = 0
    
    // Iterar sobre cada formulário
    formularios.forEach(formulario => {
    lenght++
      const nomeFormulario = formulario.nomeForm;
      if (tiposDeFormularios.value[nomeFormulario]) {
        tiposDeFormularios.value[nomeFormulario]++;
    } else { // Caso contrário, inicializar o contador
        tiposDeFormularios.value[nomeFormulario] = 1;
    }
  
      
      let formFormatado = JSON.parse(formulario.form)
     
      
        const estadoInicial = formFormatado.estadoCriancaInicio || formFormatado.egi || [];
        const estadoFinal = formFormatado.estadoCriancaFinal || formFormatado.egf || [];
       
        
        if (estadoInicial.some(estado => ['Agitado', 'Pouco colaborativo', 'Não colaborativo', 'Disperso', 'Choroso', 'Sonolento'].includes(estado)) && estadoFinal.some(estado => ['Tranquilo', 'Colaborativo'].includes(estado))) {
            contador++;
        }
    });
    let dados = Object.entries(tiposDeFormularios.value).map(([chave, valor]) => `${valor}`)
    let labels = Object.entries(tiposDeFormularios.value).map(([chave, valor]) => `${chave}`)
    console.log(dados)
   
    

    chartOptions.value = {scales: {
                y: {
                    beginAtZero: true
                }
            },
            legend: {
          display: true,
          position: 'bottom' // Defina a posição da legenda como 'bottom'
        }
      }
        chartData.value = {
            labels: labels,
          
            datasets: [{
                label: 'Sessões',
                data: dados,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                
            }]}
    
    // criaGrafico(labels, dados)
    countFormularios.value = lenght
    countSaiuBem.value = contador
    return contador;
}
function criaGrafico(labels, dados){
  const ctx = document.getElementById('myChart');

    const myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Sessões',
                data: dados,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


onMounted(async () => {
    await getNomesPacientes();
    if(!!paciente.pacienteSelecionado.nome){
      contarFormulariosComEstadoInicialRuimEFinalBom(paciente.pacienteSelecionado.formulariosMes)
    }
    
      
    });

</script>

<style>

</style>