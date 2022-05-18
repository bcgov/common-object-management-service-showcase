<template>
  <div>
    <span v-for="element in itemArray" :key="element" class="item">
      <span>{{ element }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseCommaList',
  props: {
    itemArray: {
      required: true,
      type: Array,
    },
  },
};
</script>

<style scoped>
.item + .item:before {
  content: ', ';
}
</style>
