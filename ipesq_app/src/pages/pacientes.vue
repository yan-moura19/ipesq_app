<template>
    <v-container>
        <VAutocomplete>

        </VAutocomplete>
        <router-view></router-view>
        
    </v-container>
  
</template>

<script setup>
import {  onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPacientes } from '../modulos/pacientesMethods'
const router = useRouter();
let pacientes

onMounted(async () => {
      await getPacientes().then((resp)=>{
        pacientes = resp.data

      })
    });

</script>

<style>

</style>