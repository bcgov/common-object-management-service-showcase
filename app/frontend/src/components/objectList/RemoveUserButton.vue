<template>
  <v-btn color="error" icon @click="showDialog = true">
    <v-icon> mdi-account-remove </v-icon>

    <!-- Delete Permission -->
    <BaseDialog
      :show="showDialog"
      type="CONTINUE"
      @close-dialog="showDialog = false"
      @continue-dialog="confirmDelete"
    >
      <template #title> Remove User </template>
      <template #text>
        Please confirm that you want remove all permissions for this user
      </template>
      <template #button-text-continue> Remove </template>
    </BaseDialog>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RemovePermissionButton',
  props: {
    objectId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    ...mapActions('objects', ['deleteUserPermissions', 'getObjectUsers']),
    async confirmDelete() {
      await this.deleteUserPermissions({
        objectId: this.objectId,
        userId: this.userId,
        permissions: ['READ', 'CREATE', 'UPDATE', 'DELETE', 'MANAGE'],
      });
      this.showDialog = false;
      // reload the list after
      await this.getObjectUsers(this.objectId);
    },
  },
};
</script>
