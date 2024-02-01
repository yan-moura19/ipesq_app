<template> 
  <v-card>
      <v-app-bar
        color="primary"
        prominent
      >
        <v-app-bar-nav-icon variant="text" ></v-app-bar-nav-icon>
        <v-toolbar-title>IPESQ</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-logout" @click="sair"></v-btn>
      </v-app-bar>
      <v-navigation-drawer
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
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

  
<script >
export default {
  data() {
    return {
      drawer: true,
      group: null,
      rail: true,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    };
  },
  mounted(){
   console.log(this.$route.path == '/')

  },
  methods:{
    sair(){
      this.$router.push('/')
    }

  },

  watch: {
    group: function () {
      this.drawer = false;
    },
  },
};
//
</script>
