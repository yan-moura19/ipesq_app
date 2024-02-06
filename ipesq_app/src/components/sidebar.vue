<template> 
  <v-card>
      <v-app-bar
        color="primary"
        
        floating
      >
        <v-app-bar-nav-icon variant="text" @click="tamanho = !tamanho"></v-app-bar-nav-icon>
        <v-toolbar-title>IPESQ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-logout" @click="sair"></v-btn>
      </v-app-bar>
      <v-navigation-drawer
        :width="tamanho? 200: 200"
        
      >
        <v-list>
          <v-list-item
            
            title="Sandra Adams"
          
          ></v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
          <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
          <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
        </v-list>
      </v-navigation-drawer>
 
  </v-card>
  
  
  </template>

  
<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


    const drawer = ref(true);
    const group = ref(null);
    const tamanho = ref(true);
    const rail = ref(true);
    const router = useRouter();

    const sair = () => {
      
       router.push('/');
    };

    watch(group, () => {
      drawer.value = false;
    });

    onMounted(() => {
      
    });

   

//
</script>
