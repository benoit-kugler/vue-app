<template>
    <v-card>
        <v-card-title>
            <span class="headline">Modifier la fiche de {{ tmpItem.prenom }} {{ tmpItem.nom }}</span>
			<v-spacer v-if="withButtons"></v-spacer>
			<v-btn v-if="withButtons" @click="reset">
				<v-icon>undo</v-icon>
				Réinitialiser
			</v-btn>
        </v-card-title>
        <v-card-text class="pt-1 pb-1">
            <v-container grid-list-md fluid class="pa-1">
                <v-layout row wrap>
                    <v-flex xs12 sm6 md3>
                        <v-text-field v-model="tmpItem.mail" label="Mail" :rules="[isEmailValid]"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select v-model="tmpItem.id_groupe" :items="$root.editGroupes()" label="Groupe"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select v-model="tmpItem.bus" :items="EDIT.bus" label="Trajet en bus"></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-select
                            v-model="tmpItem.semaine"
                            :items="EDIT.semaine"
                            label="Camp à la semaine"
                        ></v-select>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs12 sm6 md2>
                        <v-select
                            v-model="tmpItem.materiel_ski.need"
                            :items="[
							{ value: '', text: 'Non' }, 
							{ value: 'acve', text: 'Matériel ACVE' }, 
							{ value: 'loueur', text: 'Loueur' }]"
                            label="Matériel de ski demandé"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-select
                            v-model="tmpItem.materiel_ski.mode"
                            :items="[
							{id: 'ski', text: 'Ski' },
						 	{ id: 'surf', text: 'Surf' }
							]"
                            label="Catégorie"
                            :disabled="!materielSkiActif"
                        ></v-select>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-checkbox
                            v-model="tmpItem.materiel_ski.casque"
                            label="Avec un casque"
                            :disabled="!materielSkiActif"
                        ></v-checkbox>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                            v-model.number="tmpItem.materiel_ski.poids"
                            label="Poids"
                            suffix="kg"
                            type="number"
							:rules="[isIntegerValid]"
                            :disabled="!materielSkiActif"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                            v-model.number="tmpItem.materiel_ski.taille"
                            label="Taille"
                            suffix="cm"
                            type="number"
							:rules="[isIntegerValid]"
                            :disabled="!materielSkiActif"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                            v-model.number="tmpItem.materiel_ski.pointure"
                            label="Pointure"
                            type="number"
							:rules="[isIntegerValid]"
                            :disabled="!materielSkiActif"
                        ></v-text-field>
                    </v-flex>
                </v-layout>

                <template v-if="withButtons">
                    <v-layout row justify-space-between>
                        <v-flex xs4 md3>
                            <v-btn @click="$emit('reject')">Retour</v-btn>
                        </v-flex>
                        <v-flex xs0 md6></v-flex>
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
import { ValidatorMixin, EditFormMixin } from "@/mixins.js";

export default {
    name: "FormInscrit",
    mixins: [MixinRenderFields, MixinEditFields, ValidatorMixin, EditFormMixin],
    props: {
        withDetails: Boolean,
		withButtons: Boolean,
		GROUPES: Object
	},
	
    data() {
        return {};
    },
    computed: {
        materielSkiActif() {
            return !!this.tmpItem.materiel_ski.need;
		}
    },
    methods: {
		reset() { // ajout field materiel_ski
			let s = JSON.stringify(this.editedItem)
            this.tmpItem = JSON.parse(s) || {}
			this.tmpItem.materiel_ski = this.tmpItem.materiel_ski || {};
		}
	},
    watch: {}
};
</script>

<style>
</style>

