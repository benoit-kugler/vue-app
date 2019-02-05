<template>
	<v-data-table :headers="header" :items="items" hide-actions >
	</v-data-table>
</template>

<script>
export default {
	// props : ["header"],
	data () {
		return {
			header : [
				{text : "Nom", value : "nom", align : "center", sortable : true},
				{text : "Prénom", value : "prenom", align : "center", sortable : true},
			],
			items : [
				{"id" : 1, "nom" : "EEE", "prenom": "leker"},
				{"id" : 2, "nom" : "EEE", "prenom": "leker"},
			]
		}
	}
}
</script>

<style>

</style>
