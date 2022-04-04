<template>
  <v-container>
    <BaseSecure>
      <h1 class="my-6">My Files</h1>
      <HeaderButtons />
      <MyFilesTable />
    </BaseSecure>
  </v-container>
</template>

<script>
import HeaderButtons from '@/components/files/HeaderButtons.vue';
import MyFilesTable from '@/components/files/MyFilesTable.vue';

export default {
  name: 'MyFiles',
  components: {
    HeaderButtons,
    MyFilesTable
  }
};
</script>
