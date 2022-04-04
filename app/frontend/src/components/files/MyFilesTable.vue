<template>
  <div>
    <p class="my-10">
      <v-icon color="red">mdi-alert-box</v-icon> COMS doesn't support getting
      files for a specific user at the moment so this only works with NO-AUTH
      through the showcase app
    </p>

    <div class="d-flex">
      <div class="flex-grow-1">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="objects"
          item-key="id"
          :loading="loading"
          show-select
          :single-select="true"
        >
          <template #[`item.createdAt`]="{ item }">
            {{ item.createdAt | formatDateLong }}
          </template>
          <template #[`item.updatedAt`]="{ item }">
            {{ item.updatedAt | formatDateLong }}
          </template>
          <template #[`item.public`]>
            <v-switch disabled></v-switch>
          </template>
          <template #[`item.actions`]="{ item }">
            <ActionButtons :tableRow="item" @read-object="readObject(item.id)"/>
          </template>
        </v-data-table>
      </div>
      <div
        v-if="loadingDisplay || displayObject"
        class="flex-shrink-1"
        style="max-width: 33%"
      >
        <TableSide />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import ActionButtons from '@/components/files/ActionButtons.vue';
import TableSide from '@/components/files/TableSide.vue';

export default {
  components: {
    ActionButtons,
    TableSide,
  },
  data() {
    return {
      loading: 'true',
      singleSelect: false,
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'originalName',
        },
        { text: 'Created', value: 'createdAt' },
        { text: 'Updated', value: 'updatedAt' },
        { text: 'Public', value: 'public' },
        { text: 'Actions', value: 'actions', align: 'end' },
      ],
    };
  },
  computed: {
    ...mapGetters('objects', [
      'displayObject',
      'loadingDisplay',
      'objects',
      'selectedObjects',
    ]),
    selected: {
      // Some basic v-model to state mapping. Use vuex-map-fields if this is needed much anywhere else
      get() {
        return this.selectedObjects;
      },
      set(value) {
        this.SET_SELECTED_OBJECTS(value);
      },
    },
  },
  methods: {
    ...mapActions('objects', ['getUserObjects', 'readObject']),
    ...mapMutations('objects', ['SET_SELECTED_OBJECTS']),
  },
  async mounted() {
    await this.getUserObjects();
    this.loading = false;
  },
};
</script>


