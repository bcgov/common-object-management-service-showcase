<template>
  <v-container>
    <BaseSecure>
      <h2 class="my-4">Developer Resources</h2>
      <v-row no-gutters>
        <v-col cols="12">
          <h3>Keycloak</h3>
          <br />
          <h4>Current User</h4>
          <strong>Name:</strong>
          {{ fullName }}
          <br />
          <strong>Email:</strong>
          {{ email }}
          <br />
          <v-row class="mt-4">
            <v-col cols="6">
              <h4>
                JWT Contents
                <BaseCopyToClipboard
                  :copyText="JSON.stringify(tokenParsed)"
                  snackBarText="JWT Contents copied to clipboard"
                  tooltipText="Copy JWT Contents to clipboard"
                />
              </h4>
              <vue-json-pretty :data="tokenParsed" />
            </v-col>
            <v-col cols="6">
              <h4>
                JWT Token
                <BaseCopyToClipboard
                  :copyText="token"
                  snackBarText="JWT Token copied to clipboard"
                  tooltipText="Copy JWT Token to clipboard"
                />
              </h4>
              <div style="word-break: break-all">{{ token }}</div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </BaseSecure>
  </v-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import { mapGetters } from 'vuex';

export default {
  name: 'Developer',
  components: {
    VueJsonPretty,
  },
  computed: {
    ...mapGetters('auth', ['fullName', 'token', 'tokenParsed', 'email']),
  }
};
</script>
