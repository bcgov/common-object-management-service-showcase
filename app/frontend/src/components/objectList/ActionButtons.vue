<template>
  <div>
    <!-- Share -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
      </template>
      <span>Share</span>
    </v-tooltip>

    <!-- Download -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <DownloadButton
          mode="ICON"
          :objectId="tableRow.id"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <span>File details</span>
    </v-tooltip>

    <!-- Permissions -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account-group</v-icon>
        </v-btn>
      </template>
      <span>Permissions</span>
    </v-tooltip>

    <!-- File Details -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          icon
          v-bind="attrs"
          v-on="on"
          @click="$emit('read-object')"
        >
          <v-icon>mdi-information</v-icon>
        </v-btn>
      </template>
      <span>File details</span>
    </v-tooltip>

    <!-- Delete -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <DeleteButton
          mode="ICON"
          :objectId="tableRow.id"
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <span>Delete</span>
    </v-tooltip>
  </div>
</template>

<script>
import DeleteButton from '@/components/objectList/DeleteButton.vue';
import DownloadButton from '@/components/objectList/DownloadButton.vue';

export default {
  name: 'ActionButtons',
  props: {
    tableRow: {
      type: Object,
      required: true,
    },
  },
  components: {
    DeleteButton,
    DownloadButton,
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  margin-left: .5em;
}
</style>
