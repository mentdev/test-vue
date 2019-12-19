<template>
  <v-app>
    <v-app-bar app color="blue">
      <v-toolbar-title>Vue Vuetify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="username===''" color="primary" @click="login">Login</v-btn>

      <div v-else>
        <span>{{ username }}</span>
        <v-btn @click="logout" color="red" class="ml-3">Logout</v-btn>
      </div>
    </v-app-bar>
    
    <v-content>
      <v-container>
        <v-card>
          <v-card-text>
            <v-text-field v-model="newItem" solo label="Item Name"  required append-outer-icon="mdi-plus" @click:append-outer="addItem()" ></v-text-field>
          </v-card-text>

          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-action>
                <v-icon>mdi-checkbox-marked-circle</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{item}}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn @click="deleteItem(index)" color="red">Delete</v-btn>
              </v-list-item-action>          
            </v-list-item>
          </v-list>
        </v-card>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import aad from "./services/azuread";

export default {
  name: 'App',

  data: () => ({
    //
    items: ['Apple', 'Banana', 'Coconut', 'xxx'],
    newItem: '',
    username: ''
  }),

  created(){
    aad.getAuthen().then((account) => {
      if(account !== null){
        this.username = account.userName;
      }
    });
  },

  methods: {
    deleteItem(index){
      this.items.splice(index);
    },
    addItem(){
      
      this.items.push(this.newItem);
      this.newItem = '';
    },
    login(){
      //call login for success
      aad.login().then((account) =>{
        this.username = account.userName;
      });
    },
    logout(){
      aad.logout();
    }
  }
};
</script>
