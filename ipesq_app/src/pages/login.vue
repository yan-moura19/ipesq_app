<template>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card>
            <v-card-title class="headline text-center">Login</v-card-title>
            <v-card-text>
              <v-form @submit.prevent="login">
                <v-text-field v-model="usuario" label="Usuário" outlined></v-text-field>
                <v-text-field v-model="senha" label="Senha" type="password" outlined></v-text-field>
                <v-btn type="submit" color="primary" block>Entrar</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        usuario: "",
        senha: "",
      };
    },
    methods: {
      login() {
        
        console.log("Usuário:", this.usuario, "Senha:", this.senha);
        this.$router.push('/index');
      },
    },
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100%;
  }
  
  .text-center {
    text-align: center;
  }
  </style>