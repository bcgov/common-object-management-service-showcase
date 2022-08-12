<template>
  <v-container class="text-left">
    <div>
      <h1 class="mt-6">COMS Showcase</h1>

      <p>Demonstrating document management using <a href="https://bcgov.github.io/common-service-showcase/services/coms.html" target="_balnk">Common Object Management Service</a><p>

      <h4>Suggested Workflow:</h4>
      <ol>
        <li>Log in to acquire a SSO access token.</li>
        <li>Go to the My Files tab and upload a file to object storage</li>
        <li>Grant permissions to other users, allowing them to view, edit and manage files</li>
        <li>Generate a download link to your files</li>
      </ol>



    </div>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
};
</script>
