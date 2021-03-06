<template>
  <div class="object-details">
    <v-skeleton-loader :loading="loadingDisplay" type="card" min-width="400">
      <v-row>
        <v-col cols="12" sm="6"><h3 class="mb-8">Properties</h3></v-col>
        <v-col cols="12" sm="6" class="text-right">
          <AddVersion :objectId="displayObject.guid" v-if="displayObject" />
          <VersionHistory />

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="ml-3"
                color="primary"
                icon
                v-bind="attrs"
                v-on="on"
                @click="closeSidebar"
              >
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </template>
            <span>Close sidebar</span>
          </v-tooltip>
        </v-col>
      </v-row>

      <div v-if="displayObject">
        <v-row>
          <v-col cols="4">File name:</v-col>
          <v-col cols="8"> {{ displayObject.name }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">GUID:</v-col>
          <v-col cols="8"> {{ displayObject.guid }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Size (content-length):</v-col>
          <v-col cols="8"> {{ displayObject.size }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Type:</v-col>
          <v-col cols="8"> {{ displayObject.type }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Uploaded:</v-col>
          <v-col cols="8"> {{ displayObject.uploaded | formatDateLong }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">UploadedBy:</v-col>
          <v-col cols="8"> {{ displayObject.uploadedBy }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Modified:</v-col>
          <v-col cols="8"> {{ displayObject.modified }}</v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="4">Make file public:</v-col>
          <v-col cols="8">
            <PublicToggle
              :isPublic="displayObject.public"
              :objId="displayObject.guid"
            />
          </v-col>
        </v-row>
        <h3 class="mt-4 mb-8">Who has access</h3>
        <v-row>
          <v-col cols="4">Create:</v-col>
          <v-col cols="8">
            <BaseCommaList :itemArray="displayObject.permissions.create" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Read:</v-col>
          <v-col cols="8">
            <BaseCommaList :itemArray="displayObject.permissions.read" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Update:</v-col>
          <v-col cols="8">
            <BaseCommaList :itemArray="displayObject.permissions.update" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Delete:</v-col>
          <v-col cols="8">
            <BaseCommaList :itemArray="displayObject.permissions.delete" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Manage:</v-col>
          <v-col cols="8">
            <BaseCommaList :itemArray="displayObject.permissions.manage" />
          </v-col>
        </v-row>
      </div>
    </v-skeleton-loader>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AddVersion from '@/components/objectList/AddVersion.vue';
import PublicToggle from '@/components/objectList/PublicToggle.vue';
import VersionHistory from '@/components/objectList/VersionHistory.vue';

export default {
  components: {
    AddVersion,
    PublicToggle,
    VersionHistory,
  },
  computed: {
    ...mapGetters('objects', ['displayObject', 'loadingDisplay']),
  },
  methods: {
    ...mapMutations('objects', ['SET_DISPLAY_OBJECT']),
    closeSidebar() {
      this.SET_DISPLAY_OBJECT(null);
    },
  },
};
</script>

<style lang="scss" scoped>
.object-details {
  margin-top: 59px;
  padding: 0 2em;
  border-left: 1px lightgray solid;
  .row > .col {
    padding-top: 0;
    padding-bottom: 0.5em;
  }
}
</style>
