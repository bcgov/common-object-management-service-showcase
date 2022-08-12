<template>
  <div>
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="objects"
      item-key="id"
      :loading="loading"
    >
      <template #[`item.actions`]="{ item }">
        <v-btn color="primary" @click="downloadObject(item.id)">
          <v-icon> mdi-download </v-icon>
          <span>Download</span>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  props: {
    ids: {
      type: Array,
    },
  },
  data() {
    return {
      loading: 'true',
      headers: [
        {
          text: 'Object ID',
          align: 'start',
          value: 'id',
        },
        { text: '', value: 'actions', align: 'end' },
      ],
    };
  },
  computed: {
    ...mapGetters('transfer', ['objects', 'idList']),
  },
  methods: {
    ...mapActions('transfer', ['downloadObject', 'getObjects']),
    ...mapMutations('transfer', ['SET_ID_LIST']),
  },
  async mounted() {
    await this.SET_ID_LIST(this.ids);
    await this.getObjects();
    this.loading = false;
  },
};
</script>


