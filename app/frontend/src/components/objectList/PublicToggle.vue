<template>
  <v-switch :input-value="isPublic" @change="onToggle" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PublicToggle',
  props: {
    isPublic: {
      required: true,
    },
    objId: {
      required: true,
    },
  },
  methods: {
    ...mapActions('objects', ['togglePublic']),
    onToggle(switchVal) {
      this.togglePublic({ objectId: this.objId, isPublic: switchVal });
    },
  },
};
</script>
