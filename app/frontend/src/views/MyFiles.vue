<template>
  <v-container>
    <BaseSecure>
      <h1 class="my-6">My Files</h1>
      <FileButtons />
      <MyFilesTable />




      <HelloCall />
    </BaseSecure>
  </v-container>
</template>

<script>
import FileButtons from '@/components/files/FileButtons.vue';
import HelloCall from '@/components/HelloCall';
import MyFilesTable from '@/components/files/MyFilesTable.vue';

export default {
  name: 'MyFiles',
  components: {
    FileButtons,
    HelloCall,
    MyFilesTable
  }
};
</script>
