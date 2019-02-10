<template>
    <v-container fluid>
		<v-dialog v-model="showEditDialog" max-width="1200px" persistent lazy>
            <form-inscrit
                :editedItem="editedItem"
                withButtons
                @reject="editedItem = null"
                @accept="updateItem"
            ></form-inscrit>
        </v-dialog>

        <v-toolbar height="45">
            <v-menu open-on-hover bottom offset-y>
                <v-btn slot="activator" icon>
                    <v-icon>info</v-icon>
                </v-btn>
                <v-card>
                    <v-card-text>
                        <b>{{ nbInscrits }}</b> inscrit(s)
                        <br>
                        <span :style="{color : COULEUR_ATTENTE}">
                            <b>{{ nbAttente }}</b> en liste d'attente
                        </span>
                        <br>
                        <span :style="{color : COULEUR_ANNIVERSAIRE}">
                            <b>{{ nbAnniversaires }}</b> anniversaire(s) pendant le séjour
                        </span>
                    </v-card-text>
                </v-card>
            </v-menu>
            <v-toolbar-title>Liste des inscrits</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn @click="addEquipier = true" slot="activator" flat small>
                        <v-icon class="mr-1">cloud_download</v-icon>Exporter
                    </v-btn>Exporter une liste des inscrits.
                </v-tooltip>

                <v-tooltip bottom>
                    <v-btn
                        slot="activator"
                        flat
                        small
                        :disabled="!hasSelection"
                        @click="confirmeSupprime = true"
                    >
                        <v-icon class="mr-1">delete</v-icon>Supprimer
                    </v-btn>Enlever cet équipier de l'équipe
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat small>
                        <v-icon class="mr-1">cloud_download</v-icon>Exporter
                    </v-btn>Télécharger une liste au format Excel
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat small @click="showDocuments = true">
                        <v-icon class="mr-1">folder</v-icon>Documents
                    </v-btn>Afficher les pièces justificatives des membres de l'équipe
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>
        <v-data-table
            :headers="header"
            :items="items"
            hide-actions
            v-model="selected"
            :loading="loading"
        >
            <template slot="no-data">
                <v-alert
                    :value="true"
                    color="warning"
                    icon="warning"
                >Aucun participant n'est encore inscrit.
                    <br>
                    <i>(Certaines inscriptions n'ont peut-être pas encore été validées par le centre d'inscriptions.)</i>
                </v-alert>
            </template>

            <v-progress-linear slot="progress" :height="loadingHeight" indeterminate></v-progress-linear>

            <template slot="items" slot-scope="props">
                <tr
                    :active="props.selected"
                    @click="select(props.item)"
                    @dblclick="editedItem = props.item"
					:style="{color: renderRowColor(props.item)}"
                >
                    <td>
                        <v-icon small class="mr-2" @click="editedItem = props.item">edit</v-icon>
                    </td>
                    <td>{{ props.item.nom }}</td>
                    <td>{{ props.item.prenom }}</td>
                    <td class="text-xs-center">{{ sexe(props.item.sexe) }}</td>
                    <td class="text-xs-center">{{ props.item.age_debut_camp }}</td>
                    <td class="text-xs-center">{{ date(props.item.date_naissance) }}</td>
                    <td>{{ date_heure(props.item.date_heure) }}</td>
                    <td>{{ props.item.mail }}</td>
                    <td class="text-xs-center">{{ groupe(props.item.id_groupe) }}</td>
                    <td class="text-xs-center">{{ bus(props.item.bus) }}</td>
                    <td class="text-xs-center">{{ semaine(props.item.semaine) }}</td>
                    <td class="text-xs-center">{{ materiel_ski(props.item.materiel_ski) }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { MixinRenderFields } from "@/fields.js";
import { DataTableMixin } from "@/mixins.js";
import FormInscrit from "@/components/inscrits/FormInscrit"

export default {
	name: "Inscrits",
	mixins: [MixinRenderFields, DataTableMixin],
	components: {
		FormInscrit
	},
    data() {
        return {
            COULEUR_ATTENTE: "#FF610F",
            COULEUR_ANNIVERSAIRE: "#dcb920",
            items: [
                {
                    age_debut_camp: 16,
                    bus: null,
                    categorie: "inscrits",
                    date_heure: null,
                    date_naissance: {
                        __date__: true,
                        day: 18,
                        month: 7,
                        year: 2002
                    },
                    has_anniversaire: true,
                    id_groupe: null,
                    info: null,
                    mail: "",
                    materiel_ski: {need : "loueur"},
                    nom: "BROCKENBROUGH",
                    prenom: "Zoé",
                    id: "5708_a1_2018",
                    responsable: {
                        adresse: "455 Carolina Circle\r\n\n",
                        code_postal: "NC27104",
                        facture_acquite: true,
                        info: "",
                        mail: "valerie@zoeborganic.com",
                        nom: "BROCKENBROUGH",
                        prenom: "Valérie",
                        tels: ["13367039255", "13366245115"],
                        ville: "WINTSON SALEM"
                    },
                    semaine: 2,
                    sexe: "F",
                    w2ui: { style: "background-color: #dcb920" }
                },
                {
                    age_debut_camp: 16,
                    bus: [true, false],
                    categorie: "attente",
                    date_heure: {
                        __dateheure__: true,
                        day: 14,
                        month: 11,
						year: 2002,
						hour: 20,
						minute: 25
                    },
                    date_naissance: {
                        __date__: true,
                        day: 14,
                        month: 11,
                        year: 2002
                    },
                    has_anniversaire: false,
                    id_groupe: null,
                    info: null,
                    mail: "",
                    materiel_ski: {},
                    nom: "POUJOL",
                    prenom: "Simon",
                    id: "3242_a1_2018",
                    responsable: {
                        adresse: "110 avenue du Général de Gaulle",
                        code_postal: "84510",
                        facture_acquite: false,
                        info: "",
                        mail: "vdpoujol@wanadoo.fr",
                        nom: "POUJOL",
                        prenom: "David",
                        tels: ["0432610568", "0609710606"],
                        ville: "CAUMONT/DURANCE"
                    },
                    semaine: null,
                    sexe: "M"
                },
                {
                    age_debut_camp: 16,
                    bus: [true, true],
                    categorie: "inscrits",
                    date_heure: null,
                    date_naissance: {
                        __date__: true,
                        day: 13,
                        month: 12,
                        year: 2002
                    },
                    has_anniversaire: false,
                    id_groupe: null,
                    info: null,
                    mail: "",
                    materiel_ski: null,
                    nom: "MURAND",
                    prenom: "Lucas",
                    id: "2116_a1_2018",
                    responsable: {
                        adresse: "11 le Vallon Ensoleillé\r\n\n",
                        code_postal: "26600",
                        facture_acquite: false,
                        info: "",
                        mail: "virginiedaniel.m@gmail.com",
                        nom: "MURAND",
                        prenom: "Daniel",
                        tels: ["0475846809", "0621325158", "0475793623"],
                        ville: "PONT DE L'ISERE"
                    },
                    semaine: null,
                    sexe: "M"
                }
			],
			header: [
				{ text: "", value: "_action", sortable: false },
                { text: "Nom", value: "nom", align: "center", sortable: true },
                {
                    text: "Prénom",
                    value: "prenom",
                    align: "center",
                    sortable: true
                },
                {
                    text: "Sexe",
                    value: "sexe",
                    sortable: true
				},
				{ text : "Age (début du camp)", value : "age_debut_camp", "sortable" : true, align: "center"},
                {
                    text: "Date de naissance",
                    value: "date_naissance",
                    sortable: true,
                    align: "center"
				},
				{ text : "Moment d'inscription", value : "date_heure", sortable : true},
                { text: "Mail du participant", value: "mail", sortable: true },
				{ text : "Groupe", value : "id_groupe", sortable : true, align: "center"},
				{ text : "Bus", value : "bus", sortable : true, align: "center"},
				{ text : "A la semaine", value : "semaine", sortable : true, align: "center"},
                { text: "Matériel de ski", value: "materiel_ski", sortable: true },
			]
        };
	},
	computed: {
		nbInscrits () {
			return this.items.filter(r => r.categorie == "inscrits").length
		},
		nbAttente () {
			return this.items.filter(r => r.categorie == "attente").length
		},
		nbAnniversaires () {
			return this.items.filter(r => r.has_anniversaire).length
		},
	},
	methods: {
		renderRowColor (item) {
			if (item.categorie == "attente") {
				return this.COULEUR_ATTENTE
			} else if (item.has_anniversaire) {
				return this.COULEUR_ANNIVERSAIRE
			} else {
				return null
			}
		},
	}
};
</script>

<style>
</style>
