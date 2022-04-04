<template>
  <v-btn
    color="primary"
    :disabled="mode === 'BUTTON' && !selectedObjects.length"
    :icon="mode === 'ICON'"
    :outlined="mode === 'BUTTON'"
    @click="download"
  >
    <v-icon> mdi-download </v-icon>
    <span v-if="mode === 'BUTTON'">Download</span>
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DownloadButton',
  props: {
    // either BUTTON or ICON
    mode: {
      type: String,
      required: true,
    },
    objectId: {
      type: String,
    },
  },
  computed: {
    ...mapGetters('objects', ['selectedObjects']),
  },
  methods: {
    ...mapActions('objects', ['downloadObject']),
    async download() {
      // Download the object (either the selected one from the checkbox, or the specified one from the row)
      await this.downloadObject(
        this.objectId ? this.objectId : this.selectedObjects[0].id
      );
    },
  },
};
</script>
