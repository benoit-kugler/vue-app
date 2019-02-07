<template>
    <v-card>
        <v-card-title>
            <span class="headline">Modifier la fiche de {{ editedItem.prenom }} {{ editedItem.nom }}</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
                <v-layout row>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                            v-model="editedItem.nom_jeune_fille"
                            label="Nom de jeune fille"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-select v-model="editedItem.sexe" :items="EDIT.sexe" label="Sexe"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-menu :close-on-content-click="false">
                            <v-text-field
								readonly
                                slot="activator"
                                :value="date(editedItem.date_naissance)"
                                label="Date de naissance"
                            ></v-text-field>
                            <v-date-picker locale="fr-fr" v-model="IsoDate" no-title></v-date-picker>
                        </v-menu>
                    </v-flex>
                </v-layout>
				<v-layout row justify-space-between>
					<v-flex xs6 md3> <v-btn @click="$emit('reject')">Annuler</v-btn> </v-flex>
					<v-flex xs0 md6> </v-flex>
					<v-flex xs6 md3> <div class="text-xs-right"><v-btn @click="$emit('accept')">Sauvegarder</v-btn> </div></v-flex>
				</v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { MixinRenderFields, MixinEditFields } from "@/fields.js"

export default {
	name: "FormEquipier",
	mixins : [ MixinRenderFields, MixinEditFields ],
    props: {
		editedItem: Object
	},
    data() {
        return {
            IsoDate: ""
        };
    },
    methods: {
        toDateObject(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return { __date__ : true, day, month, year }
        }
	},
	watch : {
		IsoDate (val) {
			console.log(this.IsoDate)
			this.editedItem.date_naissance = this.toDateObject(this.IsoDate)
		}
	}
};
</script>

<style>
</style>
