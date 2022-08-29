<template>
  <v-btn color="primary" icon @click="showPermissions">
    <v-icon>mdi-account-group</v-icon>
    <BaseDialog
      :show="permDialog"
      width="900"
      type="OK"
      @close-dialog="permDialog = false"
    >
      <template #title>
        <v-icon color="primary" class="mr-5"> mdi-account-group </v-icon>
        Permissions for object: <span class="ml-1 font-weight-bold">{{ objectName }}</span>
      </template>
      <template #text>
        <!-- Add a new user -->
        <div v-if="showAddUser">
          <v-row>
            <v-col>
              <v-select
                outlined
                dense
                v-model="userToAdd"
                :items="allOtherUsers"
                item-text="fullName"
                item-value="userId"
                label="Add User"
                return-object
                single-line
              />
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                depressed
                :disabled="!userToAdd"
                @click="addUser"
              >
                Add
              </v-btn>
              <v-btn
                class="ml-6"
                color="primary"
                outlined
                @click="showAddUser = false"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-btn color="primary" depressed @click="showAddUser = true">
            <v-icon> mdi-download </v-icon> Add User
          </v-btn>
        </div>

        <!-- User/roles table -->
        <v-data-table
          :headers="headers"
          :items="displayUsers"
          item-key="user.id"
          :loading="loading"
          class="mt-6"
        >
          <template #[`item.read`]="{ item }">
            <v-checkbox
              :input-value="hasPermission(item, 'READ')"
              @change="togglePerm($event, item, 'READ')"
            />
          </template>
          <template #[`item.update`]="{ item }">
            <v-checkbox
              :input-value="hasPermission(item, 'UPDATE')"
              @change="togglePerm($event, item, 'UPDATE')"
            />
          </template>
          <template #[`item.delete`]="{ item }">
            <v-checkbox
              :input-value="hasPermission(item, 'DELETE')"
              @change="togglePerm($event, item, 'DELETE')"
            />
          </template>
          <template #[`item.manage`]="{ item }">
            <v-checkbox
              :input-value="hasPermission(item, 'MANAGE')"
              @change="togglePerm($event, item, 'MANAGE')"
            />
          </template>
          <template #[`item.actions`]="{ item }">
            <RemoveUserButton :userId="item.user.userId" :objectId="objectId" />
          </template>
        </v-data-table>
      </template>
    </BaseDialog>
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import RemoveUserButton from '@/components/objectList/RemoveUserButton.vue';

export default {
  name: 'ObjectPermissions',
  components: {
    RemoveUserButton,
  },
  props: {
    objectId: {
      type: String,
      required: true,
    },
    objectName: {
      type: String,
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'user.fullName',
        },
        { text: 'Username', value: 'user.username' },
        { text: 'Read', value: 'read' },
        { text: 'Update', value: 'update' },
        { text: 'Delete', value: 'delete' },
        { text: 'Manage', value: 'manage' },
        { text: 'Remove', value: 'actions', align: 'end' },
      ],
      loading: true,
      permDialog: false,
      showAddUser: false,
      userToAdd: null,
    };
  },
  computed: {
    ...mapGetters('objects', ['allUsers', 'displayUsers']),
    ...mapGetters('auth', ['userName']),
    allOtherUsers: function () {
      return this.allUsers
        .filter( user =>
          user.username !== 'system' &&
          user.username !== this.userName);
    }
  },
  methods: {
    ...mapActions('objects', [
      'addUserPermissions',
      'deleteUserPermissions',
      'getAllUsers',
      'getObjectUsers',
    ]),
    addUser() {
      this.addUserPermissions({
        objectId: this.objectId,
        userId: this.userToAdd.userId,
        permission: 'READ',
      });
      // reload the list after
      this.getObjectUsers(this.objectId);
      this.showAddUser = false;
    },
    hasPermission(tableRow, role) {
      return tableRow.roles.some((r) => r.permCode === role);
    },
    async showPermissions() {
      this.showAddUser = false;
      this.permDialog = true;
      this.loading = true;
      await this.getAllUsers();
      await this.getObjectUsers(this.objectId);
      this.loading = false;
    },
    togglePerm(newValue, tableRow, role) {
      if (newValue) {
        this.addUserPermissions({
          objectId: this.objectId,
          userId: tableRow.user.userId,
          permission: role,
        });
      } else {
        this.deleteUserPermissions({
          objectId: this.objectId,
          userId: tableRow.user.userId,
          permissions: [role],
        });
      }
      // reload the list after
      this.getObjectUsers(this.objectId);
    },
  },
};
</script>
