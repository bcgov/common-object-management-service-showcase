<template>
  <v-btn
    color="error"
    :disabled="mode === 'BUTTON' && !selectedObjects.length"
    :icon="mode === 'ICON'"
    :outlined="mode === 'BUTTON'"
    @click="showDialog = true"
  >
    <v-icon> mdi-delete </v-icon>
    <span v-if="mode === 'BUTTON'">Delete</span>

    <!-- Delete File -->
    <BaseDialog
      :show="showDialog"
      type="CONTINUE"
      @close-dialog="showDialog = false"
      @continue-dialog="confirmDelete"
    >
      <template #title> Delete item </template>
      <template #text>
        Please confirm that you want to delete this file.
      </template>
      <template #button-text-continue> Delete </template>
    </BaseDialog>
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DeleteButton',
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
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters('objects', ['selectedObjects']),
  },
  methods: {
    ...mapActions('objects', ['deleteObject', 'getMyObjects']),
    async confirmDelete() {
      await this.deleteObject(
        this.objectId ? this.objectId : this.selectedObjects[0].id
      );
      this.showDialog = false;
      // reload the main list after
      this.getMyObjects();
    },
  },
};
</script>
