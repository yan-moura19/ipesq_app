<template>
    <v-card>
   
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
  
        <v-app-bar
          color="primary"
          prominent
        >
          <v-app-bar-nav-icon variant="text" @click.stop="rail = !rail"></v-app-bar-nav-icon>
  
          <v-toolbar-title>My files</v-toolbar-title>
  
          <v-spacer></v-spacer>
  
          <v-btn variant="text" icon="mdi-magnify"></v-btn>
  
          <v-btn variant="text" icon="mdi-filter"></v-btn>
  
          <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
        </v-app-bar>
  
        <v-card>
    
      <v-navigation-drawer
        
        :rail="rail"
        permanent
        @click="rail = !rail"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John Leider"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = false"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
    
   
  </v-card>
  
        
     
    </v-card>
  </template>
  <script>
    export default {
      data: () => ({
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
      }),
  
      watch: {
        group () {
          this.drawer = false
        },
      },
    }
  </script>