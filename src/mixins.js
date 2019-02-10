export { DataTableMixin, ValidatorMixin, EditFormMixin};

// Mono selection data table
let DataTableMixin = {
    data() {
        return {
            loading: false,
            selected: [],
            items: [],
            loadingHeight: 10,
            editedItem: null // referene to the currently edited item
        };
    },
    methods: {
        select(selectedItem) {
            this.selected = this.items.filter(
                item => item.id == selectedItem.id
            );
        },
        load(url) {
            this.loading = true;
            // axios request here
            // this.items = axios_result
            this.loading = false;
		},
		diff_ (new_item, old_item) {
			let key, diff = {}
			for (key in new_item) {
				if (JSON.stringify(new_item[key]) != JSON.stringify(old_item[key])) {
					diff[key] = new_item[key]
				}
			}	
			return diff
		},
		updateItem (item) { // compare given item with edited item and modify changing content
			const diff = this.diff_(item, this.editedItem)
			this.editedItem = null
			if (diff === {}) return 
			this.loading = true
			console.log(diff) // connexion to serveur + notification result
			this.loading = false
		}
    },
    computed: {
        hasSelection() {
            return this.selected.length >= 1;
		},
		currentSelection() {
			return this.selected[0] || {}
		},
		showEditDialog () {
			return this.editedItem != null
		}
    }
};

let ValidatorMixin = {
	methods : {
		isEmailValid(value) {
			const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || "Mail invalide.";
		},
		isIntegerValid(value) {
			return Number.isInteger(Number(value)) || "Requiert un nombre entier"
		}
	}
}

let EditFormMixin = {
	props: {
		editedItem: Object,
	},
	data () {
		return {
			tmpItem: {}
		}
	},
	created () {
		this.reset()
	},
	methods: {
        toDateObject(date) {
            if (!date) return null;
            const [year, month, day] = date.split("-");
            return { __date__: true, day, month, year };
        },
        reset() { // attention au cas undefined
            this.tmpItem = JSON.parse(JSON.stringify(this.editedItem || {}));
        }
    },
    watch: {
		editedItem() { // if outside current item changes
			this.reset()
		},
        tmpItem(val) {
            this.$emit("data_changed", val); // fix no repeition
        }
    }
}