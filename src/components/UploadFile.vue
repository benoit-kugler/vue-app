```
<template>
    <div>
        <v-text-field
            prepend-icon="attach_file"
            single-line
            readonly
            v-model="filename"
            :label="label"
            :rules="required && [rules.required] || []"
            @click.native="onFocus"
            ref="fileTextField"
        ></v-text-field>
        <input type="file" :accept="accept" multiple="false" ref="fileInput" @change="onFileChange">
    </div>
</template>

<script>
export default {
	name: "UploadFile",
	model : {
		prop : "file",
		event: "fileData"
	},
    props: {
        value: {
            type: [Array, String]
        },
        accept: {
            type: String,
            default: "*"
        },
        label: {
            type: String,
            default: "Please choose..."
        },
        required: {
            type: Boolean,
            default: false
		},
		file : File ||  null
    },
    data() {
        return {
            filename: "",
            rules: {
                required(val) {
                    return !!val || "Requis !";
                }
            }
        };
    },
    watch: {
        value(v) {
            this.filename = v;
        }
    },
    mounted() {
        this.filename = this.value;
    },

    methods: {
        // getFormData(files) {
        //     const data = new FormData();
        //     [...files].forEach(file => {
        //         data.append("data", file, file.name); // currently only one file at a time
        //     });
        //     return data;
        // },
        onFocus() {
            this.$refs.fileInput.click();
        },
        onFileChange($event) {
            const files = $event.target.files || $event.dataTransfer.files;
            // const form = this.getFormData(files);
			let fileData = null
			if (files) {
                if (files.length > 0) {
					fileData = files[0]					
					this.filename = fileData.name
                } else {
                    this.filename = null;
                }
            } else {
				console.log(files)
				fileData = files
				this.filename = $event.target.value.split("\\").pop();
            }
            this.$emit("input", this.filename);
			// this.$emit("formData", form);
			this.$emit("fileData", fileData)

        }
    }
};
</script>


<style scoped>
input[type="file"] {
    position: absolute;
    left: -99999px;
}
</style>
