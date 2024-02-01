<template>
  <v-app class="notranslate" translate="no">
   
    <v-main class="white notranslate"  translate="no">
      <sidebar/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import sidebar from '../components/sidebar.vue'
export default {
  components: { sidebar },

}
</script>

<style>

</style>