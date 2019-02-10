<template>
    <v-container>
        <v-expansion-panel :value="1">
            <v-expansion-panel-content>
                <template slot="header">
                    <h3>Caractéristiques du camp</h3>
                </template>
                <v-progress-linear indeterminate :active="loading_details"></v-progress-linear>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 md3>
                                <v-text-field v-model="camp.nom" label="Nom"></v-text-field>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-text-field v-model="camp.lieu" label="Lieu"></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2>
                                <date-field v-model="camp.date_debut" label="Date de début"></date-field>
                            </v-flex>
                            <v-flex xs12 md2>
                                <date-field v-model="camp.date_fin" label="Date de fin"></date-field>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-text-field
                                    v-model.number="camp.nb_places"
                                    type="number"
                                    label="Nombre de places"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap justify-space-between>
                            <v-flex xs12 md2>
                                <v-tooltip bottom>
                                    <template slot="activator">
                                        <v-checkbox
                                            label="Navette proposée"
                                            v-model="camp.option_bus"
                                        ></v-checkbox>
                                    </template>En cas de sélection, une option
                                    <i>Navette</i> est proposée sur le formulaire d'inscription.
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-text-field
                                    :disabled="!camp.option_bus"
                                    label="Départ de la navette"
                                    v-model="camp.depart_bus"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-tooltip bottom>
                                    <template slot="activator">
                                        <v-checkbox
                                            label="Matériel de ski proposé"
                                            v-model="camp.option_materiel_ski"
                                        ></v-checkbox>
                                    </template>En cas de sélection, une option
                                    <i>Prêt de matériel</i> est proposée sur le formulaire d'inscription.
                                </v-tooltip>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-text-field
                                    :disabled="!camp.option_materiel_ski"
                                    suffix="€"
                                    type="number"
                                    label="Prix demandé par le loueur"
                                    v-model.number="camp.prix_loueur"
                                    hint="Prix indicatif de la location pour un participant, chez un loueur professionnel."
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-text-field
                                    :disabled="!camp.option_materiel_ski"
                                    suffix="€"
                                    type="number"
                                    label="Prix du matériel ACVE"
                                    v-model.number="camp.prix_acve"
                                    hint="Participation à l'entretion du matériel prété par l'ACVE."
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout>
                            <v-flex xs12 md6>
                                <v-tooltip bottom>
                                    <template slot="activator">
                                        <v-checkbox
                                            v-model="camp.need_equilibre_gf"
                                            label="Equilibre garçons/fille souhaité"
                                        ></v-checkbox>
                                    </template>En cas de sélection, le centre d'inscription sera averti.
                                    Ce n'est pas une garantie d'un équilibre effectif.
                                </v-tooltip>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="saveDetails" class="green--text">Sauvegarder</v-btn>
                    </v-card-actions>
                </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
                <template slot="header">
                    <h3>Envois aux familles</h3>
                </template>
                <v-progress-linear :active="loading_envois"></v-progress-linear>
                <v-card>
                    <v-alert v-model="lockAlert" :type="envois.__locked__ ? 'warning' : 'success'">
                        <span v-html="lockInfo"></span>
                    </v-alert>
                    <v-card-text>
                        <p>
                            Vous pouvez indiquer ici vos préférences pour le choix des documents à
                            envoyer aux parents.
                        </p>
                        <v-layout row justify-space-between>
                            <v-flex xs12 md3>
                                <v-checkbox
                                    v-model="envois.fiche_sanitaire"
                                    label="Envoyer la fiche sanitaire"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-checkbox
                                    v-model="envois.lettre_directeur"
                                    label="Envoyer la lettre du directeur"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-checkbox
                                    v-model="envois.liste_participants"
                                    label="Envoyer une liste des participants"
                                ></v-checkbox>
                            </v-flex>
                            <v-flex xs12 md3>
                                <v-checkbox
                                    v-model="envois.liste_vetements"
                                    label="Envoyer la liste de vêtements"
                                ></v-checkbox>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="saveEnvois">
                            <v-icon v-if="envois.__locked__">lock_open</v-icon>
                            {{ envois.__locked__ ? "Sauvegarder et dévérouiller" : "Sauvegarder" }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-container>
</template>

<script>
import DateField from "@/components/DateField.vue";

export default {
    name: "Details",
    components: { DateField },
    data() {
        return {
            loading_details: false,
            loading_envois: false,
            lockAlert: true,
            camp: {
                date_debut: { __date__: true, year: 2018, month: 10, day: 2 },
                date_fin: { __date__: true, year: 2018, month: 10, day: 2 },
                depart_bus: "LA behue de mazenc",
                lieu: "Maison du Rocher",
                nb_places: 92,
                need_equilibre_gf: false,
                nom: "C2",
                option_bus: true,
                option_materiel_ski: false,
                prix_acve: 0,
                prix_loueur: 0
            },
            envois: {
                __locked__: true,
                fiche_sanitaire: true,
                lettre_directeur: true,
                liste_participants: false,
                liste_vetements: false
            }
        };
    },
    methods: {
        saveDetails() {
            this.loading_details = true;
            // send post request with this.camp as arg
		},
		saveEnvois() {
			this.loading_envois = true
			//send pos request with this.envois as arg
		}
    },
    computed: {
        lockInfo() {
            if (this.envois.__locked__) {
                return `L'envoi des documents est vérouillé. Une fois vos documents prêts, 
						penser à en notifier le centre d'inscriptions à l'aide du bouton <b>Dévérouiller</b>.`;
            } else {
                return "L'envoi des documents est dévérouillé.";
            }
        }
    }
};
</script>

<style>
</style>
