<template>
  <v-container class="text-left">
    <div>
      <h1 class="mt-6">COMS Showcase</h1>

      <p>This website demonstrates some of the features of the <a href="https://bcgov.github.io/common-service-showcase/services/coms.html" target="_balnk">COMS</a> document management API<p>

      <p>COMS is a secure REST API that allows your application, and its users, to manage documents stored in S3-compatible object storage. With COMS you can organize your files, images, and documents and share them with co-workers, partners, or the public.</p>

      <h4>Things to try in the Showcase app</h4>
      <ol class="my-3">
        <li v-if="!authenticated" ><router-link :to="{ name: 'MyFiles' }">Log in</router-link> to acquire a SSO access token.</li>
        <li>Go to the <router-link :to="{ name: 'MyFiles' }">My Files</router-link> tab and upload a file to object storage</li>
        <li>Grant permissions on a file to other SSO users</li>
        <li>Generate a download link to your files</li>
      </ol>

      <p>If you would like to use the code from this showcase app to expedite development of your own front-end, the code can be found on <a href="https://github.com/bcgov/common-object-management-service-showcase" target="_blank">github</a></p>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Home',
  computed: mapGetters('auth', ['authenticated']),
};
</script>
