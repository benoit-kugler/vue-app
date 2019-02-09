<template>
    <div>
		<v-dialog v-model="showUploadFile" max-width="400">
			<v-card>
				<v-card-title class="headline">Ajouter un document sur le serveur</v-card-title>
				<v-card-text>
				<v-select v-model="uploadedFile.categorie" label="Catégorie"></v-select>
				<v-text-field v-model="uploadedFile.description" label="Description"></v-text-field>
				<v-text-field label="Fichier"></v-text-field>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="uploadFile">Ajouter</v-btn>
				</v-card-actions>
				</v-card-text>
			</v-card>
		</v-dialog>
        <v-toolbar height="45">
            <v-toolbar-title>Documents de l'équipe</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon @click="showUploadFile = true" :disabled="!hasSelection">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </template>Ajouter un document
                </v-tooltip>

                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon @click="save">
                            <v-icon>save</v-icon>
                        </v-btn>
                    </template>Sauvegarder
                </v-tooltip>
                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon>
                            <v-icon>refresh</v-icon>
                        </v-btn>
                    </template>Rafraichir
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
						<v-menu left>
							<template slot="activator">
					    		<v-btn icon>
                            		<v-icon>folder</v-icon>
                        		</v-btn>
							</template>
							<v-list>
								<v-list-tile @click="downloadAll(true)">Uniquement les documents requis</v-list-tile>
								<v-list-tile @click="downloadAll(false)">Tous les documents</v-list-tile>
							</v-list>
						</v-menu>
                    </template>Télécharger plusieurs documents
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
                    <td
                        v-for="docCat in docCats"
                        :key="docCat"
                        :style="`background:${renderCell(props.item[docCat])[0]}`"
                    >
                        <v-checkbox
                            hide-details
                            :label="renderCell(props.item[docCat])[1]"
                            v-model="props.item[docCat].need"
                        ></v-checkbox>
                        <v-menu>
                            <v-btn
                                slot="activator"
                                icon
                                v-if="props.item[docCat].docs.length > 0"
                            >
                                <v-icon>download</v-icon>
                            </v-btn>
                            <v-list>
                                <v-list-tile
                                    v-for="doc in props.item[docCat].docs"
                                    :key="doc.id"
									@click="downloadDoc(doc.id)"
                                >{{ renderDocumentName(doc) }}</v-list-tile>
                            </v-list>
                        </v-menu>
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
			showUploadFile : false,
			uploadedFile: {},
            docCats: Object.keys(DOCUMENTS),
            items: [
                {
                    autre: { docs: [], need: false },
                    bafa: { docs: [], need: false },
                    bafa_equiv: { docs: [], need: false },
                    bafd: { docs: [], need: false },
                    bafd_equiv: { docs: [], need: false },
                    carte_vitale: { docs: [], need: false },
                    fiche_sanitaire: { docs: [], need: false },
                    haccp: { docs: [], need: false },
                    id_personne: 1449,
                    is_temporaire: false,
                    nom: "GUILHOT",
                    permis: {
                        docs: [
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
                        need: true
                    },
                    prenom: "Thomas",
                    id: "1449_a1_2018",
                    vaccin: { docs: [], need: false },
                    sb: { docs: [], need: false },
                    secour: { docs: [], need: false },
                    test_nautique: { docs: [], need: false }
                },
                {
                    autre: { docs: [], need: false },
                    bafa: { docs: [], need: false },
                    bafa_equiv: { docs: [], need: false },
                    bafd: { docs: [], need: false },
                    bafd_equiv: { docs: [], need: false },
                    carte_vitale: { docs: [], need: false },
                    fiche_sanitaire: { docs: [], need: false },
                    haccp: { docs: [], need: false },
                    id_personne: 7550,
                    is_temporaire: false,
                    nom: "PENZ",
                    permis: { docs: [], need: false },
                    prenom: "Anastasia",
                    id: "7550_a1_2018",
                    sb: { docs: [], need: false },
                    secour: { docs: [], need: false },
                    test_nautique: { docs: [], need: false },
                    vaccin: { docs: [], need: false }
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
    methods: {
        renderCell(value) {
            if (!value) return ["none", ""];
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
            return [c, t];
        },
        renderDocumentName(doc) {
            return `${doc.nom_client} (du ${doc.date_heure_modif.day}/
											${doc.date_heure_modif.month}/
											${doc.date_heure_modif.year})`;
        },
        save() {
            // enregistre les modifications sur le serveur
            var ft = r => {
                var docCat,
                    out = {};
                for (docCat of this.docCats) {
                    out[docCat] = r[docCat].need;
                }
                out.id = r.id;
                out.is_temporaire = r.is_temporaire;
                return out;
            };
            const data = this.items.map(ft);
            // send to server
		},
		downloadDoc(docId) {
			console.log(docId)
		},
		downloadAll(only_requis) {
			console.log(only_requis)
		},
		uploadFile() {
			var [id, is_temporaire]= [this.currentSelection.id, this.currentSelection.is_temporaire]
			// requete
		}
    }
};
</script>

<style>
</style>
