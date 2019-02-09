<template>
<div>
	<form-equipier :withButtons="false" :withDetails="false" @data_changed="launchSearch">
		<template slot="title">
			<v-layout row>
				<v-flex xs6 md9>
					<span class="headline">Ajouter un équipier</span> 
				</v-flex>
				<v-flex xs6 md3>
					<div class="text-xs-right">
						<v-btn>Nouveau profil</v-btn>
					</div>
				</v-flex>
			</v-layout>
		</template>
	</form-equipier>
	<results-equipier :dataSearch="dataSearch" class="m-5"></results-equipier>
	</div>
</template>

<script>
import FormEquipier from "@/components/equipe/FormEquipier";
import ResultsEquipier from "@/components/equipe/ResultsEquipier";

export default {
	name: "AddEquipier",
	components: {
		FormEquipier,
		ResultsEquipier
	},
	data() {
		return {
			dataSearch: null
		}
	},
	methods: {
		launchSearch(dataSearch) {
			this.dataSearch = dataSearch;
			console.log("searcing ! ")
		}
	}
}
</script>

<style>

</style>
