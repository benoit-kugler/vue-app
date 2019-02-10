<template>
    <v-menu :close-on-content-click="false">
        <v-text-field
            readonly
            slot="activator"
            :value="date(currentDate)"
            :label="label"
        ></v-text-field>
        <v-date-picker locale="fr-fr" v-model="isoDate" no-title></v-date-picker>
    </v-menu>
</template>

<script>
import { MixinRenderFields } from "@/fields.js";

export default {
    name: "DateField",
	mixins: [MixinRenderFields],
	model: {
		prop: "currentDate",
		event: "dateChanged"
	},
	props: {
		currentDate: Object,
		label: String
	},
    data() {
        return {
            isoDate: ""
        };
	},
	methods : {
        toDateObject(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return { __date__: true, day: Number(day), month:Number(month), year: Number(year) };
        },
	},
    watch: {
        isoDate(val) {
            const currentDate = this.toDateObject(this.isoDate);
            this.$emit("dateChanged", currentDate);
        }
    }
};
</script>

<style>
</style>
