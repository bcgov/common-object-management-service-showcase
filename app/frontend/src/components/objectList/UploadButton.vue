<template>
  <v-btn color="primary" :loading="isSelecting" @click="handleFileImport">
    <v-icon left> mdi-upload </v-icon> Upload

    <!-- Create a hidden File Input that is trigged on upload btn -->
    <input ref="uploader" class="d-none" type="file" @change="onFileChanged" />
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UploadButton',
  data() {
    return {
      isSelecting: false,
      selectedFile: null,
    };
  },
  methods: {
    ...mapActions('objects', ['createObject', 'getMyObjects']),
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
      await this.getMyObjects();
    },
  },
};
</script>
