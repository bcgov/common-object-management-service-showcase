<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <span v-bind="attrs" v-on="on">
        <v-btn
          color="primary"
          icon
          :loading="isSelecting"
          @click="handleFileImport"
        >
          <v-icon> mdi-file-plus </v-icon>

          <!-- Create a hidden File Input that is trigged on upload btn -->
          <input
            ref="uploader"
            class="d-none"
            type="file"
            @change="onFileChanged"
          />
        </v-btn>
      </span>
    </template>
    <span>Upload new version</span>
  </v-tooltip>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AddVersion',
  props: {
    objectId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isSelecting: false,
      selectedFile: null,
    };
  },
  methods: {
    ...mapActions('objects', ['updateObject']),
    handleFileImport() {
      this.isSelecting = true;

      // After obtaining the focus when closing the FilePicker, return the button state to normal
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      // Trigger click on the FileInput
      this.$refs.uploader.click();
    },
    async onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      await this.updateObject({
        objectId: this.objectId,
        object: this.selectedFile,
      });
      this.selectedFile = null;
    },
  },
};
</script>
