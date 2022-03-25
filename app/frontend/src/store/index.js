import Vue from 'vue';
import Vuex from 'vuex';

import notifications from '@/store/modules/notifications.js';
import objects from '@/store/modules/objects.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { notifications, objects },
  state: {},
  mutations: {},
  actions: {}
});
