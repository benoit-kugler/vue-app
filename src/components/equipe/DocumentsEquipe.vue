<template>
    <div>
        <v-toolbar height="45">
            <v-toolbar-title>Documents de l'équipe</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon>
                            <v-icon>add</v-icon>
                        </v-btn>
                    </template>Ajouter un document
                </v-tooltip>

                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon>
                            <v-icon>done</v-icon>
                        </v-btn>
                    </template>Marquer comme requis
                </v-tooltip>

                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon>
                            <v-icon>insert_drive_file</v-icon>
                        </v-btn>
                    </template>Télécharger
                </v-tooltip>

                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon>
                            <v-icon>folder</v-icon>
                        </v-btn>
                    </template>Tout télécharger
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>

        <v-data-table :items="items" :headers="headers" hide-actions v-model="selected">
            <template slot="no-data">
                <v-alert :value="true" class="warning">Aucun équipier enregistré</v-alert>
            </template>

            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="select(props.item)">
                    <td>{{ props.item.nom }}</td>
                    <td>{{ props.item.prenom }}</td>
					<td v-for="docCat in docCats" :key="docCat" 
						:style="`background:${renderCell(props.item[docCat])[0]}`"
						>
						<v-checkbox hide-details :label="renderCell(props.item[docCat])[1]"></v-checkbox>
					</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { DataTableMixin } from "@/mixins.js";
import { DOCUMENTS } from "@/fields.js";

export default {
    name: "DocumentsEquipe",
    mixins: [DataTableMixin],
    data() {
        return {
			docCats: Object.keys(DOCUMENTS),
            items: [
                {
                    autre: {docs:[], need:false},
                    bafa: {docs:[], need:false},
                    bafa_equiv: {docs:[], need:false},
                    bafd: {docs:[], need:false},
                    bafd_equiv: {docs:[], need:false},
                    carte_vitale: {docs:[], need:false},
                    fiche_sanitaire: {docs:[], need:false},
                    haccp: {docs:[1], need:false},
                    id_personne: 1449,
                    is_temporaire: false,
                    nom: "GUILHOT",
                    permis: { docs :  [
                            {
                                date_heure_modif: {
                                    __datetime__: true,
                                    day: 1,
                                    hour: 9,
                                    minute: 54,
                                    month: 12,
                                    second: 14,
                                    year: 2018
                                },
                                id: 82,
                                nom_client: "map (1).png"
                            }
						],
						need : true
					},
                    prenom: "Thomas",
                    id: "1449_a1_2018",
                    vaccin: {docs:[], need:false}
                },
                {
                    id_personne: 7532,
                    is_temporaire: false,
                    nom: "JUSTON",
                    prenom: "Alicia2",
                    id: "7532_a1_2018",
                    sb: {docs:[], need:true},
                    secour: {docs:[], need:true},
                },
                {
                    autre: {docs:[], need:false},
                    bafa: {docs:[], need:false},
                    bafa_equiv: {docs:[], need:false},
                    bafd: {docs:[], need:false},
                    bafd_equiv: {docs:[], need:false},
                    carte_vitale: {docs:[], need:false},
                    fiche_sanitaire: {docs:[], need:false},
                    haccp: {docs:[], need:false},
                    id_personne: 7550,
                    is_temporaire: false,
                    nom: "PENZ",
                    permis: {docs:[], need:false},
                    prenom: "Anastasia",
                    id: "7550_a1_2018",
                    sb: {docs:[], need:false},
                    secour: {docs:[], need:false},
                    test_nautique: {docs:[], need:false},
                    vaccin: {docs:[], need:false}
                }
            ],
            headers: [
                { text: "Nom", value: "nom", sortable: true },
                { text: "Prénom", value: "prenom", sortable: true }
            ].concat(
                Object.keys(DOCUMENTS).map(k => ({
                    text: DOCUMENTS[k],
                    value: k,
                    align: "center",
                    width: 30
                }))
            )
        };
	},
	methods : {
		renderCell (value) {
			if (!value) return ["none", ""]
			var t, c;
            const has = value.docs.length > 0;
            if (has && value.need) {
                c = "green";
                t = "Ok";
            } else if (has) {
                c = "yellow";
                t = "Non requis";
            } else if (value.need) {
                c = "red";
                t = "Manquant";
            } else {
                c = "none";
                t = "";
			}
			console.log(c, t)
            return [c, t]
		}
	}
};
</script>

<style>
</style>
