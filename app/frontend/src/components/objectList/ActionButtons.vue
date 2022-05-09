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
        <span v-bind="attrs" v-on="on">
          <DownloadButton mode="ICON" :objectId="tableRow.id" :objectName="tableRow.originalName" />
        </span>
      </template>
      <span>Download Object</span>
    </v-tooltip>

    <!-- Permissions -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
          <ObjectPermissions :objectId="tableRow.id" :objectName="tableRow.originalName" />
        </span>
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
        <span v-bind="attrs" v-on="on">
          <DeleteButton mode="ICON" :objectId="tableRow.id" />
        </span>
      </template>
      <span>Delete</span>
    </v-tooltip>
  </div>
</template>

<script>
import DeleteButton from '@/components/objectList/DeleteButton.vue';
import DownloadButton from '@/components/objectList/DownloadButton.vue';
import ObjectPermissions from '@/components/objectList/ObjectPermissions.vue';

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
    ObjectPermissions,
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  margin-left: 0.5em;
}
</style>
