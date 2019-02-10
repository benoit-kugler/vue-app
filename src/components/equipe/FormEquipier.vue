<template>
    <v-card>
        <v-card-title>
			<slot name="title" :tmpItem="tmpItem">
				<span class="headline">Modifier la fiche de {{ tmpItem.prenom }} {{ tmpItem.nom }}</span>
			</slot>
			
			<v-spacer v-if="withButtons"></v-spacer>
			<v-btn v-if="withButtons" @click="reset">
				<v-icon>undo</v-icon>
				Réinitialiser
			</v-btn>
        </v-card-title>
        <v-card-text class="pt-1 pb-1">
            <v-container grid-list-md fluid class="pa-1">
                <v-layout row>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="tmpItem.nom" label="Nom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="tmpItem.prenom" label="Prénom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md1>
                        <v-select v-model="tmpItem.sexe" :items="EDIT.sexe" label="Sexe"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-menu :close-on-content-click="false">
                            <v-text-field
                                readonly
                                slot="activator"
                                :value="date(tmpItem.date_naissance)"
                                label="Date de naissance"
                            ></v-text-field>
                            <v-date-picker locale="fr-fr" v-model="IsoDate" no-title></v-date-picker>
                        </v-menu>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-text-field v-model="tmpItem.mail" label="Mail" :rules="[isEmailValid]"></v-text-field>
                    </v-flex>
					<v-flex xs12 sm6 md2 v-if="withDetails">
						<v-select v-model="tmpItem.role" :items="EDIT.role" label="Rôle"></v-select>
					</v-flex>
                </v-layout>
				<template v-if="withDetails">
                <v-layout>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                            v-model="tmpItem.nom_jeune_fille"
                            label="Nom de jeune fille"
                        ></v-text-field>
                    </v-flex>
					<v-flex xs12 sm6 md3>
						<v-combobox small-chips deletable-chips multiple v-model="tmpItem.tels" label="Téléphones">
						</v-combobox>
					</v-flex>
					<v-flex xs12 sm6 md3>
						<v-textarea v-model="tmpItem.adresse" label="Adresse" height="50" ></v-textarea>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="tmpItem.code_postal" label="Code postal"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="tmpItem.ville" label="Ville"></v-text-field>
					</v-flex>
                </v-layout>
                <v-layout row>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="tmpItem.securite_sociale" label="Sécurité sociale"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="tmpItem.ville_naissance" label="Ville de naissance"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-select v-model="tmpItem.departement_naissance" :items="EDIT.departement" label="Département de naissance"></v-select>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="tmpItem.profession" label="Profession"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-switch v-model="tmpItem.etudiant" label="Etudiant"></v-switch>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-switch v-model="tmpItem.fonctionnaire" label="Fonctionnaire"></v-switch>
					</v-flex>
                </v-layout>
				</template>
				<template v-if="withButtons">
                <v-layout row justify-space-between>
                    <v-flex xs4 md3>
                        <v-btn @click="$emit('reject')">Retour</v-btn>
                    </v-flex>
                    <v-flex xs4 md6></v-flex>
                    <v-flex xs4 md3>
                        <div class="text-xs-right">
                            <v-btn @click="$emit('accept', tmpItem)">Sauvegarder</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
				</template>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { MixinRenderFields, MixinEditFields } from "@/fields.js";
import { ValidatorMixin, EditFormMixin } from "@/mixins.js"

export default {
    name: "FormEquipier",
	mixins: [MixinRenderFields, MixinEditFields, ValidatorMixin,
			EditFormMixin],
    props: {
		withDetails: Boolean,
		withButtons: Boolean,
    },
    data() {
        return {
			IsoDate: "",
        };
	},
    methods: {
    },
    watch: {
        IsoDate(val) {
			this.tmpItem.date_naissance = this.toDateObject(this.IsoDate);
			this.$emit('data_changed', this.tmpItem)
		},
    }
};
</script>

<style>
</style>
