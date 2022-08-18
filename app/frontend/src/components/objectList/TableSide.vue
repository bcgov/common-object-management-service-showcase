<template>
  <div class="object-details pb-5">
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
          <v-col cols="4">Object ID:</v-col>
          <v-col cols="8"> {{ displayObject.guid }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Size:</v-col>
          <v-col cols="8"> {{ displayObject.size }} bytes</v-col>
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
          <v-col cols="4">Modified:</v-col>
          <v-col cols="8"> {{ displayObject.modified | formatDateLong }}</v-col>
        </v-row>
        <v-row>
          <v-col cols="4">Uploaded By:</v-col>
          <v-col cols="8"> {{ displayObject.uploadedBy }}</v-col>
        </v-row>
        <v-row class="pb-3">
          <v-col cols="12">Metadata:</v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-row v-for="(v, k) in displayObject.meta" :key="k" class="text-caption">
              <v-col cols="4">{{ k }}: </v-col><v-col cols="8">{{ v }}</v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-skeleton-loader>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import AddVersion from '@/components/objectList/AddVersion.vue';
import VersionHistory from '@/components/objectList/VersionHistory.vue';

export default {
  components: {
    AddVersion,
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
