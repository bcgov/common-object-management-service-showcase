<template>
  <div>
    <UploadButton />

    <DownloadButton />

    <DeleteButton />
  </div>
</template>

<script>
import DeleteButton from '@/components/files/DeleteButton.vue';
import DownloadButton from '@/components/files/DownloadButton.vue';
import UploadButton from '@/components/files/UploadButton.vue';

export default {
  name: 'FileButtons',
  components: {
    DeleteButton,
    DownloadButton,
    UploadButton,
  },
};
</script>
