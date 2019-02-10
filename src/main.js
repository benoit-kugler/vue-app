import Vue from "vue";
import "@/plugins/vuetify";
import VueRouter from "vue-router";
import App from "@/App.vue";
import { routes } from "@/routes";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes
});

		 

new Vue({
	render: h => h(App),
	data: {
		GROUPES: {}, 
	},
	methods: {
		editGroupes() {
            let gp = this.GROUPES;
            return Object.keys(gp)
                .map(k => ({ value: k, text: gp[k].nom }))
                .concat([{ value: "0", text: "Groupe par défaut" }]); // dynamique en fonction des groupes
		},
		groupe(value) {
			if (!value) return "-"
			if (value == "0") return "Groupe par défaut"
            return (this.GROUPES[value] || { nom: "Groupe invalide" }).nom
        }
	},
	router
}).$mount("#app");
