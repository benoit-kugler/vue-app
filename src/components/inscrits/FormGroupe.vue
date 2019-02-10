<template>
    <v-card>
        <v-card-title>
            <span class="headline">Modifier le groupe{{ tmpItem.nom }}</span>
            <v-spacer></v-spacer>
            <v-btn @click="reset">
                <v-icon>undo</v-icon>Réinitialiser
            </v-btn>
        </v-card-title>
        <v-card-text class="pt-1 pb-1">
            <v-container grid-list-md fluid class="pa-1">
                <v-layout row wrap>
                    <v-flex xs12 sm6 md3>
                        <v-text-field v-model="tmpItem.nom" label="Nom"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <date-field v-model="tmpItem.date_debut" label="Né du"></date-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <date-field v-model="tmpItem.date_fin" label="Au"></date-field>
                    </v-flex>
                    <v-flex xs12 sm6 md3>
                        <v-checkbox
                            v-model="tmpItem.need_aisance_aquatique"
                            label="Aisance aquatique demandée"
                        ></v-checkbox>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-layout row justify-space-between>
                <v-flex xs4 md3>
                    <v-btn @click="$emit('reject')">Retour</v-btn>
                </v-flex>
                <v-flex xs0 md6></v-flex>
                <v-flex xs4 md3>
                    <div class="text-xs-right">
                        <v-btn @click="$emit('accept', tmpItem)">Sauvegarder</v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>
import { MixinRenderFields, MixinEditFields } from "@/fields.js";
import { ValidatorMixin, EditFormMixin } from "@/mixins.js";
import DateField from "@/components/DateField.vue";

export default {
    name: "FormInscrit",
    mixins: [MixinRenderFields, MixinEditFields, ValidatorMixin, EditFormMixin],
    components: { DateField },
    data() {
        return {};
    },
};
</script>

<style>
</style>

