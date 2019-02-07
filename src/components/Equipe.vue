<template>
    <v-container fluid>
        <v-dialog v-model="showEditDialog" max-width="1200px" persistent>
            <FormEquipier :editedItem="editedItem" @reject="showEditDialog = !showEditDialog"></FormEquipier>
        </v-dialog>
        <v-toolbar height="45">
            <v-menu open-on-hover bottom offset-y>
                <v-btn slot="activator" icon>
                    <v-icon>info</v-icon>
                </v-btn>
                <v-card>
                    <v-card-text>
                        <b>{{ nbMembres }}</b> équipier(s)
                        <br>
                        <b>{{ nbAnims }}</b> animateur(s)
                    </v-card-text>
                </v-card>
            </v-menu>
            <v-toolbar-title>Liste des équipiers</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat small>
                        <v-icon class="mr-1">add</v-icon>Ajouter un équipier
                    </v-btn>Rechercher et déclarer un nouvel équipier
                </v-tooltip>

                <v-tooltip bottom>
                    <v-btn slot="activator" flat small :disabled="!hasSelection">
                        <v-icon class="mr-1">delete</v-icon>Supprimer
                    </v-btn>Enlever cet équipier de l'équipe
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat small>
                        <v-icon class="mr-1">cloud_download</v-icon>Exporter
                    </v-btn>Télécharger une liste au format Excel
                </v-tooltip>
                <v-tooltip bottom>
                    <v-btn slot="activator" flat small>
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
                    color="error"
                    icon="warning"
                >Aucun membre de l'équipe n'est déclaré pour le moment.
                    <br>
                    <i>(Vous pouvez ajouter un équipier avec le bouton "Ajouter".)</i>
                </v-alert>
            </template>

            <v-progress-linear slot="progress" :height="loadingHeight" indeterminate></v-progress-linear>

            <template slot="items" slot-scope="props">
                <tr
                    :active="props.selected"
                    @click="select(props.item)"
                    @dblclick="startEdit(props.item)"
                >
                    <td>
                        <v-icon small class="mr-2" @click="startEdit(props.item)">edit</v-icon>
                    </td>
                    <td>{{ props.item.nom }}</td>
                    <td>{{ props.item.prenom }}</td>
                    <td>{{ role(props.item.role) }}</td>
                    <td>{{ props.item.is_sb }}</td>
                    <td>{{ diplome(props.item.diplome) }}</td>
                    <td>{{ approfondissement(props.item.appro) }}</td>
                    <td class="text-xs-center">{{ sexe(props.item.sexe) }}</td>
                    <td>{{ props.item.nom_jeune_fille }}</td>
                    <td class="text-xs-center">{{ date(props.item.date_naissance) }}</td>
                    <td>{{ departement(props.item.departement_naissance) }}</td>
                    <td>{{ props.item.ville_naissance }}</td>
                    <td>{{ props.item.mail }}</td>
                    <td>{{ telephones(props.item.tels) }}</td>
                    <td>
                        <div>{{ props.item.adresse }}</div>
                    </td>
                    <td>{{ props.item.code_postal }}</td>
                    <td>{{ props.item.ville }}</td>
                    <td>{{ props.item.securite_sociale }}</td>
                    <td>{{ props.item.profession }}</td>
                    <td>{{ bool(props.item.etudiant) }}</td>
                    <td>{{ bool(props.item.fonctionnaire) }}</td>
                </tr>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import { MixinRenderFields } from "@/fields.js";
import { DataTableMixin } from "@/mixins.js";
import FormEquipier from "@/components/FormEquipier";

export default {
    // props : ["header"],
    mixins: [MixinRenderFields, DataTableMixin],
    components: {
        FormEquipier
    },
    data() {
        return {
            header: [
                { text: "", value: "_action", sortable: false },
                { text: "Nom", value: "nom", align: "center", sortable: true },
                {
                    text: "Prénom",
                    value: "prenom",
                    align: "center",
                    sortable: true
                },
                { text: "Rôle", value: "role", sortable: true },
                {
                    text: "Surveillant de baignade",
                    value: "is_sb",
                    sortable: true
                },
                { text: "Diplôme", value: "diplome", sortable: true },
                { text: "Approfondissement", value: "appro", sortable: true },
                {
                    text: "Sexe",
                    value: "sexe",
                    sortable: true
                },
                {
                    text: "Nom de jeune fille",
                    value: "nom_jeune_fille",
                    sortable: true
                },
                {
                    text: "Date de naissance",
                    value: "date_naissance",
                    sortable: true,
                    align: "center"
                },
                {
                    text: "Département de naissance",
                    value: "departement_naissance",
                    sortable: true,
                    width: "50px"
                },
                {
                    text: "Ville de naissance",
                    value: "ville_naissance",
                    sortable: true
                },
                { text: "Mail", value: "mail", sortable: true },
                { text: "Téléphone(s)", value: "tels", sortable: true },
                {
                    text: "Adresse postale",
                    value: "adresse",
                    sortable: true,
                    width: "100px"
                },
                { text: "Code postal", value: "code_postal", sortable: true },
                { text: "Ville", value: "ville", sortable: true },
                {
                    text: "Sécurité sociale",
                    value: "securite_sociale",
                    sortable: true
                },
                { text: "Profession", value: "profession", sortable: true },
                { text: "Etudiant", value: "etudiant", sortable: true },
                {
                    text: "Fonctionnaire",
                    value: "fonctionnaire",
                    sortable: true
                }
            ],
            items: [
                {
                    adresse: "120 boulevard Yves Farge ",
                    appro: "canoe",
                    code_postal: "69007",
                    date_naissance: {
                        __date__: true,
                        day: 15,
                        month: 1,
                        year: 1970
                    },
                    departement_naissance: "18",
                    diplome: "bafd_stag",
                    etudiant: true,
                    fonctionnaire: null,
                    id_personne: 4816,
                    is_sb: null,
                    is_temporaire: false,
                    mail: "picotfaustine@gmail.com",
                    nom: "PICOT",
                    nom_jeune_fille: null,
                    prenom: "Faustine",
                    profession: null,
                    id: "4816_c2_2018",
                    role: "_anim",
                    securite_sociale: null,
                    sexe: "F",
                    tels: ["06 08 07 96 95"],
                    ville: " LYON",
                    ville_naissance: null
                },
                { nom: "Benoit", id: 45 }
            ]
        };
    },
    computed: {
        nbMembres() {
            return this.items.length;
        },
        nbAnims() {
            return this.items.filter(r => r.role === "_anim").length;
        }
    },
    methods: {}
};
</script>

<style>
table.v-table thead tr {
    height: 45px;
}
</style>


