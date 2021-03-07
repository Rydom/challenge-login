<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Challenge </v-list-item-title>
          <v-list-item-subtitle> For obtain the next level </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item 
        v-for="item in items"
         :key="item.title"
         :to="item.to"
         link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app elevation="2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Aplication</v-toolbar-title>
    
    </v-app-bar> -->
    <v-main>
        <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import Login from "./views/Login";

export default {
  name: "App",

  components: {
    // Login,
  },

  data: () => ({
    drawer: false,
    items: [
      { title: "Dashboard", icon: "mdi-format-list-checks", to: "/" },
      { title: "Fotos", icon: "mdi-image-multiple", to: "/fotos" },
      { title: "Sobre", icon: "mdi-help-box", to: "/about" },
    ],
    right: null,
  }),
};
</script>
