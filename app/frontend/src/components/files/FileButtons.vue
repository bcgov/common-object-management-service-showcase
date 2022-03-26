<template>
  <div>
    <v-btn color="primary" :loading="isSelecting" @click="handleFileImport">
      <v-icon left> mdi-upload </v-icon> Upload
    </v-btn>
    <v-btn color="primary" disabled class="ml-3">
      <v-icon left> mdi-download </v-icon> Download
    </v-btn>
    <v-btn color="primary" disabled class="ml-3">
      <v-icon left> mdi-delete </v-icon> Delete
    </v-btn>

    <!-- Create a hidden File Input that is trigged on upload btn -->
    <input ref="uploader" class="d-none" type="file" @change="onFileChanged" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FileButtons',
  data() {
    return {
      isSelecting: false,
      selectedFile: null,
    };
  },
  methods: {
    ...mapActions('objects', ['createObject', 'getUserObjects']),
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
      await this.createObject(this.selectedFile);
      this.selectedFile = null;
      await this.getUserObjects();
    },
  },
};
</script>
