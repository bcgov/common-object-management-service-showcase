import { comsService } from '@/services';

export default {
  namespaced: true,
  state: {
    idList: [],
    objects: []
  },
  getters: {
    idList: state => state.idList,
    objects: state => state.objects,
  },
  mutations: {
    SET_ID_LIST(state, idList) {
      state.idList = idList;
    },
    SET_OBJECTS(state, objects) {
      state.objects = objects;
    }
  },
  actions: {
    // Get a specific object
    async downloadObject({ dispatch }, objectId) {
      try {
        await comsService.getObject(objectId, undefined, true);
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while downloading your file.',
          consoleError: `Error getting object ${objectId}: ${error}`,
        }, { root: true });
      }
    },

    // Get all the objects specified
    async getObjects({ dispatch, commit, state }) {
      try {
        const searchResponse = await comsService.listObjects({ objId: state.idList });
        commit('SET_OBJECTS', searchResponse.data);
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while fetching the list of objects.',
          consoleError: `Error getting objects: ${error}`,
        }, { root: true });
      }
    }
  }
};
