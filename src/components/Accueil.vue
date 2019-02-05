<template>
<v-container>
	<v-card>
	<v-card-text>
		<h4>Bienvenue sur le portail des directeurs !</h4>

		Vous touverez ici toutes les informations relatives à votre camp.
	</v-card-text>
	</v-card>
	
	<div class="mt-2">
	<v-layout v-for="link in links" :key="link.path" row justify-center wrap>
		<v-flex xs8 md6>
		<v-card-text>
			{{ link.description }} 
		</v-card-text>
		</v-flex>
		<v-flex xs6 md3>
			<div class="text-xs-right">
				<v-btn :to="link.path">{{ link.title }}</v-btn>
			</div>
		</v-flex>
	</v-layout>
	</div>
</v-container>
</template>

<script>

export default {
	name : "Acceuil",
	props : {
		links : Object
	},
	data () {
		return {
		}
	},
	methods : {
	}

}
</script>

<style>

</style>
