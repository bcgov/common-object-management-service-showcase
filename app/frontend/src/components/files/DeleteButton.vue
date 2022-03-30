<template>
  <v-btn
    color="error"
    outlined
    :disabled="!selectedObject"
    @click="showDialog = true"
    class="ml-3"
  >
    <v-icon left> mdi-delete </v-icon> Delete

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
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    ...mapGetters('objects', ['selectedObject']),
  },
  methods: {
    ...mapActions('objects', ['deleteObject', 'getUserObjects']),
    async confirmDelete() {
      await this.deleteObject(this.selectedObject.id);
      this.showDialog = false; 
      // reload the main list after
      this.getUserObjects();
    },
  },
};
</script>
