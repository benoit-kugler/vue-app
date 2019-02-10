<template>
    <div>
		<v-dialog v-model="showEditDialog" lazy>
			<form-groupe :editedItem="editedItem"
				@reject="editedItem = null"
				@accept="updateItem"
			></form-groupe>
		</v-dialog>

		<v-dialog v-model="showAppliqueGroupes" max-width="800px" lazy>
			<v-card>
				<v-card-title class="headline">Appliquer les groupes</v-card-title>
				<v-card-text>Vous pouvez seulement <b>enregistrer</b> les groupes courants sur le serveur, 
					ou les enregistrer et les appliquer aux participants courants. <br>
					Si vous appliquez les groupes, vous pouvez <b>réattribuer</b> un groupe aux participants en ayant déjà un, 
					ou <b>ne pas modifier</b> les participants ayant déjà un groupe.
				</v-card-text>
				<v-card-actions>
					<v-btn @click="save('save')" flat>Sauvegarder seulement</v-btn>
					<v-spacer></v-spacer>
					<v-btn @click="save('save_apply')" flat>Conserver les attributions</v-btn>
					<v-btn @click="save('save_apply_erase')" flat>Ecraser les attributions</v-btn> 
				</v-card-actions>
			</v-card>
		</v-dialog>

        <v-toolbar dense>
            <v-toolbar-title>Groupes</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn @click="ajouteGroupe" icon>
                            <v-icon>add</v-icon>
                        </v-btn>
                    </template>Ajouter un nouveau groupe
                </v-tooltip>

                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn icon @click="supprimeGroupe" :disabled="!hasSelection">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </template>Supprimer ce groupe
                </v-tooltip>
                <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn @click="showAppliqueGroupes=true" icon>
                            <v-icon>save</v-icon>
                        </v-btn>
                    </template>Sauvegarder les groupes courants
                </v-tooltip>
				 <v-tooltip bottom>
                    <template slot="activator">
                        <v-btn @click="$emit('reject')" icon>
                            <v-icon>cancel</v-icon>
                        </v-btn>
                    </template>Quitter et annuler les changements courants
                </v-tooltip>
            </v-toolbar-items>
        </v-toolbar>

        <v-data-table :items="items" :headers="headers" hide-actions v-model="selected"
				:custom-sort="sort">
            <template slot="no-data">
                <v-alert :value="true" class="warning">Aucun groupe enregistré.</v-alert>
            </template>

            <template slot="items" slot-scope="props">
                <tr
                    :active="props.selected"
                    @click="select(props.item)"
                    @dblclick="editedItem = props.item"
                >
                    <td>{{ props.item.nom }}</td>
                    <td class="text-xs-center">{{ date(props.item.date_debut) }}</td>
                    <td class="text-xs-center">{{ date(props.item.date_fin) }}</td>
                    <td class="text-xs-center">{{ bool(props.item.need_aisance_aquatique) }}</td>
					<td class="text-xs-center">{{ tailleGroupe(props.item.id) }}  </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { DataTableMixin } from "@/mixins.js";
import { MixinRenderFields } from "@/fields.js";
import FormGroupe from "@/components/inscrits/FormGroupe.vue"

function compare_date(d1, d2) {
	if (!d1 || !d2) return false
    return d1.year < d2.year || (d1.year === d2.year && (d1.month < d2.month || (d1.month === d2.month && d1.day <= d2.day)));
}

function is_in_groupe(groupe, date_naissance) {
    if (!date_naissance) {
        return false;
    }
    let is_supp = compare_date(groupe.date_debut, date_naissance);
	let is_inf = compare_date(date_naissance, groupe.date_fin);
    return is_supp && is_inf;
}


export default {
    name: "ListeGroupes",
	mixins: [DataTableMixin, MixinRenderFields],
	components: {FormGroupe},
	props: {
		attributions: Array
	},
    data() {
        return {
			showAppliqueGroupes: false,
            headers: [
                { text: "Nom", value: "nom", sortable: true },
                {
                    text: "Né du",
                    value: "date_debut",
                    sortable: true,
                    align: "center"
                },
                {
                    text: "au",
                    value: "date_fin",
                    sortable: true,
                    align: "center"
                },
                {
                    text: "Aisance aquatique requise",
                    value: "need_aisance_aquatique",
                    sortable: true,
                    align: "center"
				},
				{text : "Taille du groupe", value: "_taille", sortable : false, align : "center"}
            ],
            items: [
                {
                    date_debut: {
                        __date__: true,
                        day: 1,
                        month: 1,
                        year: 2000
                    },
                    date_fin: { __date__: true, day: 22, month: 1, year: 2010 },
                    need_aisance_aquatique: true,
                    nom: "Groupe 4",
                    id: "1"
                },
                {
                    date_debut: {
                        __date__: true,
                        day: 23,
                        month: 1,
                        year: 2010
                    },
                    date_fin: { __date__: true, day: 1, month: 1, year: 2015 },
                    need_aisance_aquatique: false,
                    nom: "Groupe 3",
                    id: "2"
                },
                {
                    date_debut: {
                        __date__: true,
                        day: 1,
                        month: 1,
                        year: 2000
                    },
                    date_fin: { __date__: true, day: 1, month: 1, year: 2000 },
                    need_aisance_aquatique: false,
                    nom: "AAh",
                    id: "3"
                }
            ]
        };
	},
	methods: {
		tailleGroupe(id_groupe){
			let attribue_groupe = part => {
				var g
				for (g of this.items) {
					if (is_in_groupe(g, part.date_naissance)) {
						return g.id
					}
				}
				return part.id_groupe // on n'a pas trouvé de groupe 
			}
			const new_attributions = this.attributions.map(attribue_groupe)
			return new_attributions.filter(r => r == id_groupe).length
		},
		updateItem(item) { // changement local seulement
			const index = this.items.findIndex(r => (r.id == item.id))
			let field
			for (field in item) {
				this.items[index][field] = item[field]
			}
			this.editedItem = null
		},
		ajouteGroupe() {
			const newId = this.newId(false)
			const newItem = { id: newId }
			this.items.push(newItem)
			this.editedItem = newItem
		},
		supprimeGroupe() {
			const id_to_delete = this.currentSelection.id
			this.items = this.items.filter(r => !(r.id == id_to_delete))
			this.selected = []
		},
		save(mode){ //sauvegarde sur le serveur la liste courante et l'applique (option)
			// mode vaut 'save' 'save_apply' 'save_apply_erase'
			console.log(mode)
			this.loading = true
			this.showAppliqueGroupes = false
		}
 	}
};
</script>

<style>
</style>
