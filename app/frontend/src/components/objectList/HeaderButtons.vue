<template>
  <div>
    <UploadButton />

    <DownloadButton mode="BUTTON" />

    <DeleteButton mode="BUTTON" />
  </div>
</template>

<script>
import DeleteButton from '@/components/objectList/DeleteButton.vue';
import DownloadButton from '@/components/objectList/DownloadButton.vue';
import UploadButton from '@/components/objectList/UploadButton.vue';

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
