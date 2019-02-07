export {DataTableMixin}

// Mono selection data table
var DataTableMixin = {
	data () {
		return {
			loading : false,
			selected : [],
			items: [],
			loadingHeight: 10
		}
	},
	methods : {
		select(selectedItem) {
			this.selected = this.items.filter(item => item.id == selectedItem.id)
		},
		load (url) {
			this.loading = true
			// axios request here
			// this.items = axios_result
			this.loading = false
		}
	},
	computed : {
		hasSelection () {
			console.log(this.selected.length)
			return this.selected.length >= 1
		}
	}
}