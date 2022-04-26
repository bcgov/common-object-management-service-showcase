<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" icon v-bind="attrs" v-on="on" @click="showHistory">
        <v-icon> mdi-file-multiple </v-icon>
        <BaseDialog
          :show="showDialog"
          width="900"
          type="OK"
          @close-dialog="showDialog = false"
        >
          <template #title>
            <v-icon color="primary" class="mr-5"> mdi-file-multiple </v-icon>
            Version history for <br />
            {{ displayObject.guid }}
          </template>
          <template #text>
            <v-data-table
              :headers="headers"
              :items="displayObject.versions.Versions"
              item-key="VersionId"
            >
              <template #[`item.LastModified`]="{ item }">
                {{ item.LastModified | formatDateLong }}
              </template>
              <template #[`item.IsLatest`]="{ item }">
                <v-icon v-if="item.IsLatest">mdi-check</v-icon>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on">
                      <DownloadButton mode="ICON" :objectId="displayObject.guid" :versionId="item.VersionId" />
                    </span>
                  </template>
                  <span>Download Version</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </template>
        </BaseDialog>
      </v-btn>
    </template>
    <span>Version History</span>
  </v-tooltip>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DownloadButton from '@/components/objectList/DownloadButton.vue';

export default {
  name: 'VersionHistory',
  components: {
    DownloadButton,
  },
  data() {
    return {
      headers: [
        {
          text: 'Version Id',
          align: 'start',
          value: 'VersionId',
        },
        { text: 'Last Modified', value: 'LastModified' },
        { text: 'Latest?', value: 'IsLatest' },
        { text: 'Size', value: 'Size' },
        { text: 'Actions', value: 'actions', align: 'end' },
      ],
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters('objects', ['displayObject']),
  },
  methods: {
    ...mapActions('objects', ['deleteObject', 'getMyObjects']),
    async showHistory() {
      this.showDialog = true;
      // reload the main list after
      this.getMyObjects();
    },
  },
};
</script>
