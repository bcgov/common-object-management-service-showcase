import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

describe('Home.vue', () => {
  let vuetify;
  let store;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store();
  });

  it('renders', () => {

    store.registerModule('auth', {
      namespaced: true,
      getters: {
        authenticated: () => false
      }
    });

    const wrapper = shallowMount(Home, {
      localVue,
      vuetify,
      store
    });

    expect(wrapper.text()).toMatch('COMS Showcase');
  });
});
