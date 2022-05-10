<template>
  <v-btn
    color="primary"
    :disabled="mode === 'BUTTON' && !selectedObjects.length"
    :icon="mode === 'ICON'"
    :outlined="mode === 'BUTTON'"
    @click="dlMethodDialog = true"
  >
    <v-icon> mdi-download </v-icon>
    <span v-if="mode === 'BUTTON'">Download</span>

    <!-- Download method dialog  -->
    <BaseDialog
      :show="dlMethodDialog"
      width="800"
      type="OK"
      @close-dialog="dlMethodDialog = false"
    >
      <template #title>
        <v-icon color="primary" class="mr-5"> mdi-download </v-icon>
        Download {{ displayName }}
        <span v-if="versionId" class="ml-2">(Version ID: {{ versionId }})</span>
      </template>
      <template #text>
        <div class="d-flex mb-6">
          <div>
            <v-icon class="mr-2"> mdi-information-outline </v-icon>
          </div>
          <div>
            <p class="mb-1">
              COMS supports 2 ways of downloading a file <br />
              Once the call to COMS has permissions verrified, the response can
              either:
            </p>
            <ol>
              <li>Stream the file through the COMS API</li>
              <li>
                Redirect the response directly to the S3 Object Store link,
                unlocked for the caller
              </li>
            </ol>
          </div>
        </div>

        <v-btn color="primary" outlined @click="download(true)">
          <v-icon> mdi-download </v-icon>
          <span>Download through COMS</span>
        </v-btn>

        <v-btn class="mt-5" color="primary" outlined @click="download(false)">
          <v-icon> mdi-open-in-new </v-icon>
          <span>Download directly from S3 (via temporary link)</span>
        </v-btn>
      </template>
      <template #button-text> CLOSE </template>
    </BaseDialog>
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
    objectName: {
      type: String,
    },
    objectId: {
      type: String,
    },
    versionId: {
      type: String,
    },
  },
  data() {
    return {
      dlMethodDialog: false,
    };
  },
  computed: {
    ...mapGetters('objects', ['selectedObjects']),
    displayName: function () {
      if (this.objectName) {
        return this.objectName;
      } else {
        return this.selectedObjects[0]
          ? this.selectedObjects[0].originalName
          : '';
      }
    },
  },
  methods: {
    ...mapActions('objects', ['downloadObject']),
    async download(dlStream) {
      // Download the object (either the selected one from the checkbox, or the specified one from the row)
      await this.downloadObject({
        objectId: this.objectId ? this.objectId : this.selectedObjects[0].id,
        versionId: this.versionId,
        download: dlStream,
      });
    },
  },
};
</script>
