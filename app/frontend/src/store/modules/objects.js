import { comsService } from '@/services';
import { NotificationTypes } from '@/utils/constants';

export default {
  namespaced: true,
  state: {
    displayObject: null,
    loadingDisplay: false,
    objects: [],
    selectedObjects: []
  },
  getters: {
    displayObject: state => state.displayObject,
    loadingDisplay: state => state.loadingDisplay,
    objects: state => state.objects,
    selectedObjects: state => state.selectedObjects
  },
  mutations: {
    SET_DISPLAY_OBJECT(state, obj) {
      state.displayObject = obj;
    },
    SET_LOADING_DISPLAY(state, obj) {
      state.loadingDisplay = obj;
    },
    SET_OBJECTS(state, objects) {
      state.objects = objects;
    },
    SET_SELECTED_OBJECTS(state, obj) {
      state.selectedObjects = obj;
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

    // Get a specific object
    async downloadObject({ dispatch }, objectId) {
      try {
        debugger;
        await comsService.getObject(objectId);
        debugger;
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while getting the object.',
          consoleError: `Error getting object ${objectId}: ${error}`,
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

    // Read a specific object
    async readObject({ commit, dispatch, state }, objectId) {
      try {
        commit('SET_LOADING_DISPLAY', true);
        const hResponse = await comsService.readObject(objectId);
        const vResponse = await comsService.listObjectVersions(objectId);
        const pResponse = await comsService.listPermissions(objectId);

        // Get some data about the object out of the list (since there's no API calls to get this)
        const objFromList = state.objects.find(o => o.id === objectId);
        
        debugger;
        // TODO: extract to some transform util rather than here?
        const toDisplay = {
          name: hResponse.headers['x-amz-meta-name'],
          size: hResponse.headers['content-length'],
          // type:
          uploaded: objFromList.createdAt,
          uploadedBy: objFromList.createdBy,
          modified: hResponse.headers['last-modified'],
          // modifiedBy
          // public:
          versions: vResponse.data,
          permissions: {
            create: pResponse.data.filter(p => p.permCode === 'CREATE').map(p => p.oidcId),
            read: pResponse.data.filter(p => p.permCode === 'READ').map(p => p.oidcId),
            update: pResponse.data.filter(p => p.permCode === 'UPDATE').map(p => p.oidcId),
            delete: pResponse.data.filter(p => p.permCode === 'DELETE').map(p => p.oidcId),
            manage: pResponse.data.filter(p => p.permCode === 'MANAGE').map(p => p.oidcId)
          }
        };
        commit('SET_DISPLAY_OBJECT', toDisplay);
      } catch (error) {
        dispatch('notifications/addNotification', {
          message: 'An error occurred while reading the object.',
          consoleError: `Error reading object ${objectId}: ${error}`,
        }, { root: true });
      } finally {
        commit('SET_LOADING_DISPLAY', false);
      }
    },
  }
};
