import Vue from 'vue';
import Vuex from 'vuex';

import notifications from '@/store/modules/notifications.js';
import objects from '@/store/modules/objects.js';
import transfer from '@/store/modules/transfer.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { notifications, objects, transfer },
  state: {},
  mutations: {},
  actions: {}
});
