<template>
	<v-container fluid>
        <v-toolbar height="45">
            <v-menu open-on-hover bottom offset-y>
					<v-btn slot="activator" icon>
						<v-icon>info</v-icon>
					</v-btn>
					<v-card>
						<v-card-text>

							 Nombre d'inscrits : <b>${insc}</b> <br/>
                    <span style='color:${ListeParticipants.COULEUR_ATTENTE};'>Nombre en attente : <b>${att}</b></span><br/>
                    <span style='color:${ListeParticipants.COULEUR_ANNIVERSAIRE};'>Nombre d'anniversaires : <b>${ann}</b></span><br/>
                
							<b>{{ nbMembres }}</b> inscrit(s)
							<br>
							<b>{{ nbAnims }}</b> en liste d'attente
<br>	
							<b>{{ nbAnims }}</b> anniversaires pendant le séjour
						</v-card-text>
					</v-card>
            </v-menu>
            <v-toolbar-title>Liste des éinscrits</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <v-tooltip bottom>
                    <v-btn @click="addEquipier = true" slot="activator" flat small>
                        <v-icon class="mr-1">add</v-icon>Ajouter un équipier
                    </v-btn>Rechercher et déclarer un nouvel équipier
                </v-tooltip>

                <v-tooltip bottom>
                    <v-btn slot="activator" flat small :disabled="!hasSelection" @click="confirmeSupprime = true">
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
                    @dblclick="editedItem = props.item"
                >
                    <td>
                        <v-icon small class="mr-2" @click="editedItem = props.item">edit</v-icon>
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
export default {
	name: "Inscrits",
}
</script>

<style>

</style>
