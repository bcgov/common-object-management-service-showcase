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
    SET_SELECTED_OBJECT(state, obj) {
      state.selectedObject = obj;
    }
  },
  actions: {
    // Upload an object
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

    // Delete a specific object
    async deleteObject({ dispatch }, objectId) {
      try {
        await comsService.deleteObject(objectId);
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while deleting.',
          consoleError: `Error deleting object ${objectId}: ${error}`,
        }, { root: true });
      }
    },

    // Get objects list for the current user token
    async getUserObjects({ dispatch, commit }) {
      try {
        const response = await comsService.listObjects();
        commit('SET_OBJECTS', response.data);
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while fetching the list of objects.',
          consoleError: `Error getting objects: ${error}`,
        }, { root: true });
      }
    },
  }
};
