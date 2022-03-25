import { comsService } from '@/services';
import { NotificationTypes } from '@/utils/constants';

// The store module to hold the "Acme" tenant components
export default {
  namespaced: true,
  state: {
    objects: [],
    selectedObject: null
  },
  getters: {
    objects: state => state.objects,
    selectedObject: state => state.selectedObject
  },
  mutations: {
    SET_OBJECTS(state, objects) {
      state.objects = objects;
    },
    SET_SELECTED_OBJECTS(state, obj) {
      state.selectedObject = obj;
    }
  },
  actions: {
    // Upload a file
    async createObject({ dispatch }, object) {
      try {
        const response = await comsService.createObject(object);
        if (response) {
          dispatch('notifications/addNotification', {
            message: 'Uploaded an object',
            type: NotificationTypes.SUCCESS
          }, { root: true });
        }
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while uploading.',
          consoleError: `Error uploading: ${error}`,
        }, { root: true });
      }
    },
    // Get objects list
    async getObjects({ dispatch, commit }) {
      try {
        const response = await comsService.getObjects();
        commit('SET_OBJECTS', response.data);
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while fetching the list of objects.',
          consoleError: `Error getting objects: ${error}`,
        }, { root: true });
      }
    },

    // Re-get the relevant info for the Acme page
    // async refreshLob({ commit, dispatch }) {
    //   commit('SET_SELECTED_APPLICANT', null);
    //   await dispatch('sandbox/refreshCurrentSandbox', {}, { root: true });
    //   await dispatch('getApplicants');
    // },
  }
};
