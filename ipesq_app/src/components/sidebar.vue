<template> 
  <v-card class="sobrepor">
      <v-app-bar
        color="primary"
        
        floating
      >
        <v-app-bar-nav-icon variant="text" @click="tamanho = !tamanho"></v-app-bar-nav-icon>
        <v-toolbar-title>IPESQ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-logout" @click="sair"></v-btn>
      </v-app-bar>
      
 
  </v-card>
  <v-bottom-navigation>
   
  
  <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
          value="Novo forms"
        >
        <v-icon>mdi-file-document-plus-outline</v-icon>
        <span>Novo formulário</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in rotas"
          :key="index"
          :value="index"
          @click="irParaNovoFormulario(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn value="home" @click="inicio">
    <v-icon>mdi-home</v-icon>

    <span>Inicio</span>
  </v-btn>

  <v-btn value="favorites" @click="abreModalHistorico">
    <v-icon>mdi-account-details</v-icon>

    <span>Historico</span>
  </v-btn>
  

  
</v-bottom-navigation>
<modal-historico-paciente

      v-model="modalHistorico"
      @close="closeModalHistorico"
      />
  </template>

  
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


    const drawer = ref(true);
    const group = ref(null);
    const tamanho = ref(true);
    const modalHistorico = ref(false);
    const rail = ref(true);
    const router = useRouter();
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

const closeModalHistorico = (()=>{
  modalHistorico.value = false
  
})
const abreModalHistorico = (()=>{
  modalHistorico.value =true
})
function irParaNovoFormulario(item) {
  var rota =item.trim().toLowerCase()
  rota = rota.replace(/\s/g, "")
  rota = rota.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (rota === 'fichadeevolucaofisioterapia/psicomotricidade'){
    rota = 'fichadeevolucaofisioterapiapsicomotricidade'
  }
 
  
 
  
  router.push({name: rota})
}
    const sair = () => {
      
       router.push('/');
    };
    const inicio = () => {
      
      router.push('/paciente');
   };

    watch(group, () => {
      drawer.value = false;
    });

    onMounted(() => {
      
    });

   

//
</script>
