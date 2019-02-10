<template>
	<v-card>
		<v-card-title class="headline">Exporter les inscrits</v-card-title>
		<v-card-text>
			<v-select :items="[
				{value : 'details', text : 'Details'},
				{value : 'finances', text : 'Aperçu financier'},
			]" v-model="mode" label="Type de liste" ></v-select>
			<div v-if="mode == 'details'">
				<v-select :items="EDIT.bus" label="Critère de bus" v-model="options.bus"></v-select>
				<v-checkbox v-model="options.with_groupe" label="Trier par groupe"></v-checkbox>
				<v-checkbox v-model="options.with_attente" label="Ajouter la liste d'attente"></v-checkbox>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn @click="$emit('accept', mode, options)" flat class="green--text">Valider</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { MixinEditFields } from "@/fields.js";

export default {
	name: "FormExport",
	mixins: [MixinEditFields],
	data () {
		return {
			mode: null, // type de la liste ("finances" ou "details")
			options: {}
		}
	}
}
</script>

<style>

</style>
