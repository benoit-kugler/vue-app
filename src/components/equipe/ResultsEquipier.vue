<template>
    <div class="ma-2">
        <v-data-table
            :headers="header"
            :items="items"
            hide-actions
            :loading="loading"
            v-model="selected"
        >
            <template slot="no-data">
                <v-alert
                    :value="true"
                    color="warning"
                    icon="warning"
                >Aucun profil ne correspond à votre recherche.
                    <br>
                    <i>(Votre recherche est peut-être trop exigente ? Essayez de reduire les champs requis.)</i>
                </v-alert>
            </template>
            <template slot="items" slot-scope="props">
                <tr :active="props.selected" @click="select(props.item)">
                    <td
                        :style="`background-color: ${pertinenceColor(props.item.pertinence)}`"
                    >{{ props.item.pertinence }}%</td>
                    <td>{{ props.item.nom }}</td>
                    <td>{{ props.item.prenom }}</td>
                    <td class="text-xs-center">{{ date(props.item.date_naissance) }}</td>
                    <td class="text-xs-center">
                        <v-icon small class="mr-2" @click="$emit('rattache', props.item.id)">link</v-icon>
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import { MixinRenderFields } from "@/fields.js";
import { DataTableMixin } from "@/mixins.js";

export default {
    name: "ResultsEquipier",
    mixins: [MixinRenderFields, DataTableMixin],
    props: {
        dataSearch: Object || null
    },
    data() {
        return {
            header: [
                {
                    text: "Pertinence",
                    value: "pertinence",
                    sortable: true,
                    width: "30"
                },
                { text: "Nom", value: "nom", sortable: true },
                { text: "Prénom", value: "prenom", sortable: true },
                {
                    text: "Date de naissance",
                    value: "date_naissance",
                    sortable: true, align: "center"
                },
                { text: "Rattacher au profil", value: "rattacher", sortable: false, align: "center"}
            ],
            items: [
                {
                    id: 1,
                    pertinence: 30,
                    nom: "KUGLER",
                    prenom: "Benoit",
                    date_naissance: {
                        __date__: true,
                        day: 15,
                        month: 1,
                        year: 1970
                    }
                },
                { id: 2, pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" },
                { pertinence: 90, nom: "KIGLER" }
            ]
        };
    },
    watch: {
        dataSearch(val) {
            this.loading = val != null;
        }
    },
    methods: {
        pertinenceColor(pertinence) {
            const red_level = Math.floor((pertinence * 200) / 100);
            const color = `rgb(${255 - red_level},${red_level}, 15)`;
            return color;
        }
    }
};
</script>

<style>
</style>
