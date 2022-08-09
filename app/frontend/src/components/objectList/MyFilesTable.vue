<template>
  <div>
    <div class="d-flex mt-12">
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
          <template #[`item.public`]="{ item }">
            <PublicToggle :isPublic="item.public" :objId="item.id" />
          </template>
          <template #[`item.actions`]="{ item }">
            <ActionButtons :tableRow="item" @read-object="readObject(item.id)"/>
          </template>
        </v-data-table>
      </div>
      <div
        v-if="loadingDisplay || displayObject"
        class="flex-shrink-1"
        style="max-width: 33%; min-width: 33%">
        <TableSide />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import ActionButtons from '@/components/objectList/ActionButtons.vue';
import PublicToggle from '@/components/objectList/PublicToggle.vue';
import TableSide from '@/components/objectList/TableSide.vue';

export default {
  components: {
    ActionButtons,
    PublicToggle,
    TableSide,
  },
  data() {
    return {
      loading: 'true',
      singleSelect: false,
      headers: [
        {
          text: 'Object ID',
          align: 'start',
          value: 'id',
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
    ...mapActions('objects', ['getMyObjects', 'readObject']),
    ...mapMutations('objects', ['SET_SELECTED_OBJECTS']),
  },
  async mounted() {
    await this.getMyObjects();
    this.loading = false;
  },
};
</script>


