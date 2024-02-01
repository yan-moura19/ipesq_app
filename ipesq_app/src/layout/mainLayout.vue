<template>
  <v-app class="notranslate" translate="no">
   
    <v-main class="white notranslate"  translate="no">
      <sidebar v-if="estaAutenticado"/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import sidebar from '../components/sidebar.vue'
export default {
  components: { sidebar },
  computed:{
    estaAutenticado(){
      return this.$route.path != '/';
    }
  },

}
</script>

<style>

</style>