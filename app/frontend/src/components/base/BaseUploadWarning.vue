<template>
  <div class="alert-container">
    <v-alert
      v-if="!uploadWarningDismissed"
      border="top"
      colored-border
      elevation="3"
      type="warning"
      dismissible
      @input="alertClosed"
      transition="slide-y-transition"
    >
      Do not upload files that contain personal or private information.<br />
      Files are periodically deleted from the connected object storage bucket and COMS database.
    </v-alert>
  </div>
</template>
<script>
import { mapGetters, mapMutations  } from 'vuex';

export default {
  name: 'BaseNotificationContainer',
  computed: mapGetters('notifications', ['uploadWarningDismissed']),
  methods: {
    ...mapMutations ('notifications', ['dismissUploadWarning']),
    alertClosed() {
      this.dismissUploadWarning();
    },
  }
};
</script>
<style scoped>
.v-alert {
  margin-bottom: 35px;
}
</style>
