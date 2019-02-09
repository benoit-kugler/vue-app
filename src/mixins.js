export { DataTableMixin };

// Mono selection data table
var DataTableMixin = {
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
