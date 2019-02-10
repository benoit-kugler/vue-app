<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon v-on:click="menuVisible = !menuVisible"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>ACVE - Portail des Directeurs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="http://acve.asso.fr" target="_blank">
        <span class="mr-2">Site de l'association</span>
      </v-btn>
      <v-btn flat href="http://www.agora.acve.asso.fr/" target="_blank">
        <span class="mr-2">Intranet</span>
      </v-btn>
      <v-btn flat href="mailto:x.ben.x@free.fr?subject=[Portail Directeurs]">
        <span class="mr-2">Aide</span>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer app v-model="menuVisible">
    <v-layout align-center justify-center row>
    <v-avatar size=100>
      <v-img margin="auto" src="/logo.png"/>
      </v-avatar>
    </v-layout>
      <v-list>
        <v-list-tile v-for="route in routes" router :key="route.meta.title" :to="route.path">
          <v-list-tile-content>{{ route.meta.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-content>
		<keep-alive>
      		<router-view></router-view>
		</keep-alive>
    </v-content>

    <v-footer app height="auto">
      <v-card-text>
        <span class="footer-titre"> <b>A</b>ssociation <b>C</b>hrétienne de <b>V</b>acances et de <b>L</b>oisirs
        </span>
        <br>
        <span class="footer-details">
          Siège social : La Maison du Rocher - 26150 Chamaloc - tél. 04 75 22 13 88 - www.acve.asso.fr - email: contact@acve.asso.fr
          <br>Association loi 1901 - N° Siret: 781 875 851 00037 - code APE: 552EB - Agréments : Centre de Vacances 26 069 1003 - Jeunesse et Sport : 026ORG0163
        </span>
      </v-card-text>
    </v-footer>
	
  </v-app>
</template>

<script>
import { routes } from "@/routes";


export default {
  name: "App",
  components: {
  },
  data() {
    return {
	  menuVisible: false,
	  routes
    };
  },
  methods: {}
};
</script>

<style>
.footer-titre {
  font-style: italic;
  font-size: 90%;
}

.footer-details {
  font-size: 70%;
}
</style>

