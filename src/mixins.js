export { DataTableMixin };

// Mono selection data table
var DataTableMixin = {
    data() {
        return {
            loading: false,
            selected: [],
            items: [],
            loadingHeight: 10,
            showEditDialog: false,
            editedItem: {} // independent copy of the currently edited item
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
        startEdit(item) {
            this.editedItem = JSON.parse(JSON.stringify(item));
            this.showEditDialog = true;
        }
    },
    computed: {
        hasSelection() {
            return this.selected.length >= 1;
        }
    }
};
