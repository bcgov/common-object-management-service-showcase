import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

import MyFiles from '@/views/MyFiles.vue';

describe('MyFiles.vue', () => {
  let vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
  });

  it('renders', () => {
    const wrapper = shallowMount(MyFiles, {
      vuetify,
      stubs: ['BaseSecure', 'BaseUploadWarning']
    });

    expect(wrapper.text()).toMatch('');
  });
});
