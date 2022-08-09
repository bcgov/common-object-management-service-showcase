<template>
  <v-btn color="primary" icon @click="openShareDialog">
    <v-icon>mdi-share-variant</v-icon>
    <BaseDialog
      :show="shareDialog"
      width="900"
      type="OK"
      @close-dialog="shareDialog = false"
    >
      <template #title>
        <v-icon color="primary" class="mr-5"> mdi-share-variant </v-icon>
        Share <span class="ml-1 font-weight-bold"> {{ objectName }}</span>
      </template>
      <template #text>
        <v-radio-group v-model="shareMode">
          <v-radio
            label="Get public link that anyone can download"
            value="public"
          />
          <v-radio
            label="Make a link for a specific user that they can use to come back to this app and access the file"
            value="user"
          />
        </v-radio-group>

        <!-- Invite a specific user -->
        <div v-if="shareMode === 'user'">
          <h2>Invite</h2>
          <v-row class="mt-2">
            <v-col md="6">
              <v-select
                outlined
                dense
                v-model="userToAdd"
                :items="allOtherUsers"
                item-text="email"
                item-value="userId"
                label="Add User"
                return-object
                single-line
              />
            </v-col>
          </v-row>
          <div>Note: This will not trigger any notifications.</div>

          <v-btn
            color="primary"
            class="mt-1"
            depressed
            :disabled="!userToAdd"
            @click="addUser"
          >
            Invite
          </v-btn>

          <div v-if="sharedWithUser">
            <h2 class="mt-8 mb-3">Share</h2>
            <v-text-field
              outlined
              readonly
              label="Link to file"
              append-outer-icon="mdi-content-copy"
              :value="showcasePageRoute"
            ></v-text-field>

            <h2 class="mb-3">QR Code</h2>
            <qrcode-vue
              :value="showcasePageRoute"
              size="250"
              level="H"
            ></qrcode-vue>
          </div>
        </div>

        <!-- Share with public annonymous link -->
        <div v-else-if="shareMode === 'public'">
          <div class="d-flex align-center">
            <div class="mr-6">Make file public</div>
            <div>
              <PublicToggle :isPublic="isPublic" :objId="objectId" />
            </div>
          </div>

          <div v-if="isPublic">
            <h2 class="mb-3">Share</h2>
            <v-text-field
              outlined
              readonly
              label="Link to file"
              append-outer-icon="mdi-content-copy"
              :value="comsApiRoute"
            ></v-text-field>

            <h2 class="mb-3">QR Code</h2>
            <qrcode-vue :value="comsApiRoute" size="250" level="H"></qrcode-vue>
          </div>
        </div>
      </template>
      <template #button-text> CLOSE </template>
    </BaseDialog>
  </v-btn>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import QrcodeVue from 'qrcode.vue';

import { comsAxios } from '@/services/interceptors';
import PublicToggle from '@/components/objectList/PublicToggle.vue';

export default {
  name: 'ShareObject',
  components: {
    PublicToggle,
    QrcodeVue,
  },
  props: {
    isPublic: {
      type: Boolean,
      required: true,
    },
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
      shareDialog: false,
      sharedWithUser: false,
      shareMode: undefined,
      userToAdd: null,
    };
  },
  computed: {
    ...mapGetters('objects', ['allUsers', 'displayUsers']),
    ...mapGetters('auth', ['userName']),
    comsApiRoute: function () {
      return `${comsAxios().defaults.baseURL}/object/${this.objectId}`;
    },
    showcasePageRoute: function () {
      return `${window.location.origin}/app/fileTransfer?id=${this.objectId}`;
    },
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
    async addUser() {
      await this.addUserPermissions({
        objectId: this.objectId,
        userId: this.userToAdd.userId,
        permission: 'READ',
      });
      this.sharedWithUser = true;
    },
    openShareDialog() {
      this.shareMode = undefined;
      this.shareDialog = true;
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
