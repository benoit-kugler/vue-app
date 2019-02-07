<template>
    <v-card>
        <v-card-title>
            <span class="headline">Modifier la fiche de {{ editedItem.prenom }} {{ editedItem.nom }}</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md fluid>
                <v-layout row>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="editedItem.nom" label="Nom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md2>
                        <v-text-field v-model="editedItem.prenom" label="Prénom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md1>
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
                    <v-flex xs12 sm6 md3>
                        <v-text-field v-model="editedItem.mail" label="Mail" :rules="[isEmailValid]"></v-text-field>
                    </v-flex>
					<v-flex xs12 sm6 md2>
						<v-select v-model="editedItem.role" :items="EDIT.role" label="Rôle"></v-select>
					</v-flex>
                </v-layout>
                <v-layout>
                    <v-flex xs12 sm6 md2>
                        <v-text-field
                            v-model="editedItem.nom_jeune_fille"
                            label="Nom de jeune fille"
                        ></v-text-field>
                    </v-flex>
					<v-flex xs12 sm6 md3>
						<v-combobox small-chips deletable-chips multiple v-model="editedItem.tels" label="Téléphones">
						</v-combobox>
					</v-flex>
					<v-flex xs12 sm6 md3>
						<v-textarea v-model="editedItem.adresse" label="Adresse" height="50" ></v-textarea>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="editedItem.code_postal" label="Code postal"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="editedItem.ville" label="Ville"></v-text-field>
					</v-flex>
                </v-layout>
                <v-layout row>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="editedItem.securite_sociale" label="Sécurité sociale"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="editedItem.ville_naissance" label="Ville de naissance"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-select v-model="editedItem.departement_naissance" :items="EDIT.departement" label="Département de naissance"></v-select>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-text-field v-model="editedItem.profession" label="Profession"></v-text-field>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-switch v-model="editedItem.etudiant" label="Etudiant"></v-switch>
					</v-flex>
					<v-flex xs12 sm6 md2>
						<v-switch v-model="editedItem.fonctionnaire" label="Fonctionnaire"></v-switch>
					</v-flex>
                </v-layout>

                <v-layout row justify-space-between>
                    <v-flex xs6 md3>
                        <v-btn @click="$emit('reject')">Annuler</v-btn>
                    </v-flex>
                    <v-flex xs0 md6></v-flex>
                    <v-flex xs6 md3>
                        <div class="text-xs-right">
                            <v-btn @click="$emit('accept')">Sauvegarder</v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
import { MixinRenderFields, MixinEditFields } from "@/fields.js";

export default {
    name: "FormEquipier",
    mixins: [MixinRenderFields, MixinEditFields],
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
            return { __date__: true, day, month, year };
        },
        isEmailValid(value) {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Mail invalide.";
        }
    },
    watch: {
        IsoDate(val) {
            console.log(this.IsoDate);
            this.editedItem.date_naissance = this.toDateObject(this.IsoDate);
        }
    }
};
</script>

<style>
</style>
