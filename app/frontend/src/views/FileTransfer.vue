<template>
  <v-container>
    <BaseSecure>
      <h1 class="my-6">File Transfer</h1>
      <!-- <p>You have had 1 file shared with you</p> -->
      <FileTransferTable :ids="[id]"/>
    </BaseSecure>
  </v-container>
</template>

<script>
import FileTransferTable from '@/components/transfer/FileTransferTable.vue';

export default {
  name: 'FileTransfer',
  components: {
    FileTransferTable,
  },
  props: {
    // todo: handle array params?
    id: {
      type: String,
    },
  },
};
</script>
