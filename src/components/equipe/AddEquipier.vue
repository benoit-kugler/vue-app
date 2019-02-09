<template>
    <div>
        <form-equipier :withButtons="false" :withDetails="false" @data_changed="launchSearch">
            <template v-slot:title="props">
                <v-layout row>
                    <v-flex xs6 md9>
                        <span class="headline">Ajouter un équipier</span>
                    </v-flex>
                    <v-flex xs6 md3>
                        <div class="text-xs-right">
                            <v-btn @click="creeEquipier(props)">
								<v-icon class="mr-1">add_circle</v-icon>Vers un nouveau profil
							</v-btn>
							<div class="red--text">{{ errorEmptyNomPrenom }}</div>
                        </div>
                    </v-flex>
                </v-layout>
            </template>
        </form-equipier>
        <results-equipier :dataSearch="dataSearch" class="m-5" @rattache="rattacheEquipier"></results-equipier>
    </div>
</template>

<script>
import FormEquipier from "@/components/equipe/FormEquipier";
import ResultsEquipier from "@/components/equipe/ResultsEquipier";

export default {
    name: "AddEquipier",
    components: {
        FormEquipier,
        ResultsEquipier
    },
    data() {
        return {
			dataSearch: null,
			errorEmptyNomPrenom: "",
        };
    },
    methods: {
        launchSearch(dataSearch) {
            this.dataSearch = dataSearch;
            console.log("searcing ! ");
        },
        rattacheEquipier(id) {
			console.log(id)
		},
        creeEquipier(props) {
			if (!props.tmpItem.nom || !props.tmpItem.prenom) {
				this.errorEmptyNomPrenom  = "Nom ou prénom non remplis !"
				setTimeout(() => {
					this.errorEmptyNomPrenom = ""
				}, 2000);
				return
			}
            console.log(props.tmpItem);
        }
    }
};
</script>

<style>
</style>
