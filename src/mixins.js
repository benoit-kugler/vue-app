export { DataTableMixin, ValidatorMixin, EditFormMixin};

// Mono selection data table
let DataTableMixin = {
    data() {
        return {
            loading: false,
			selected: [],
			headers: [],
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
			old_item = old_item || {}
			let key, diff = {}
			for (key in new_item) {
				if (JSON.stringify(new_item[key]) != JSON.stringify(old_item[key])) {
					diff[key] = new_item[key]
				}
			}	
			delete diff.id 
			return diff
		},
		updateItem (item) { // compare given item with edited item and modify changing content
			const diff = this.diff_(item, this.editedItem)
			this.editedItem = null
			if (diff === {}) return 
			this.loading = true
			console.log(diff) // connexion to serveur + notification result
			const index = this.items.findIndex(r => r.id == item.id)
			for (var g in diff) {
				this.items[index][g] = diff[g]
			}
			this.loading = false
		},
		sort(items, attr, isDescending) {
			if (!attr) return items
			if (isDescending === null) return items
			let reducer = function(r) {
				let value = r[attr]
				if (!value) return ""
				if (value.__date__) {
					return JSON.stringify([value.year, value.month, value.day])
				} else if (value.__datetime__){
					return JSON.stringify([value.year, value.month, value.day, value.hour, value.minute, value.second])
				} else {
					return JSON.stringify(value)
				}
			}
			const reduced = items.map((r,i) => [reducer(r), i])
			let comparateur = function(a,b) {
				if (a[0] < b[0]) {
					return isDescending ? -1 : 1
				} else if (a[0] > b[0]) {
					return isDescending ? 1 : -1
				} else {
					return 0
				}
			}
			const sorted_reduced = reduced.sort(comparateur)
			return sorted_reduced.map( r => items[r[1]])
		},
		newId(asInt) {
			const currentIds = new Set(this.items.map(r => r.id))
			let isIn, i = 1
			while (true) {
				isIn = asInt ? currentIds.has(i) : currentIds.has(String(i))
				if (!isIn) break
				i++
			}
			return asInt ? i : String(i)
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