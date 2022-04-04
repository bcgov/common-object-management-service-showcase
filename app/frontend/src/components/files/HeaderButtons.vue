<template>
  <div>
    <UploadButton />

    <DownloadButton mode="BUTTON" />

    <DeleteButton mode="BUTTON" />
  </div>
</template>

<script>
import DeleteButton from '@/components/files/DeleteButton.vue';
import DownloadButton from '@/components/files/DownloadButton.vue';
import UploadButton from '@/components/files/UploadButton.vue';

export default {
  name: 'HeaderButtons',
  components: {
    DeleteButton,
    DownloadButton,
    UploadButton,
  },
};
</script>

<style lang="scss" scoped>
.v-btn {
  margin-right: 1em;
}
</style>
