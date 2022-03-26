<template>
  <v-container>
    <BaseSecure>
      <h1 class="my-6">My Files</h1>
      <FileButtons />
      <MyFilesTable />
    </BaseSecure>
  </v-container>
</template>

<script>
import FileButtons from '@/components/files/FileButtons.vue';
import MyFilesTable from '@/components/files/MyFilesTable.vue';

export default {
  name: 'MyFiles',
  components: {
    FileButtons,
    MyFilesTable
  }
};
</script>
