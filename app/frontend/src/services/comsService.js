import { comsAxios } from '@/services/interceptors';
import Vue from 'vue';

// Calls to the COMS API
export default {

  // ------------------------------------------------------------
  // Object
  // ------------------------------------------------------------
  /**
   * @function createObject
   * Post an object
   * @returns {Promise} An axios response
   */
  createObject(object) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    fd.append('file', object);
    return comsAxios().post('/object', fd, config);
  },

  /**
   * @function deleteObject
   * Delete an object
   * @returns {Promise} An axios response
   */
  deleteObject(objectId) {
    return comsAxios().delete(`/object/${objectId}`);
  },

  /**
   * @function getObject
   * Get an object
   * @param objectId The id for the object to get
   */
  getObject(objectId) {
    // Not sure how to do opaqueredirect with axios so leaning back to fetch for this one
    // https://github.com/axios/axios/issues/932
    const url = comsAxios();
    const auth = `Bearer ${Vue.prototype.$keycloak.token}`;
    return fetch(`${url.defaults.baseURL}/object/${objectId}`, {
      redirect: 'manual',
      headers: {
        'Authorization': auth
      }
    }).then((res) => {
      if (res.type === 'opaqueredirect') {
        window.open(
          res.url,
          '_blank'
        );
      } else {
        throw new Error(`Not a redirect. Status: ${res.status}`);
      }
    });
  },

  /**
   * @function listObjects
   * List and search for all objects
   * @returns {Promise} An axios response
   */
  listObjects() {
    return comsAxios().get('/object');
  },

  /**
   * @function readObject
   * Get an object details (head call)
   * @param objectId The id for the object to get
   * @returns {Promise} An axios response
   */
  readObject(objectId) {
    return comsAxios().head(`/object/${objectId}`);
  },

  /**
   * @function togglePublic
   * Toggles the public property for an object
   * @param objectId The id for the object 
   * @param isPublic Boolean on public status 
   * @returns {Promise} An axios response
   */
  togglePublic(objectId, isPublic) {
    return comsAxios().patch(`/object/${objectId}/public`, null, {
      params: {
        public: isPublic
      }
    });
  },
  // -----------------------------------------------------/object


  // ------------------------------------------------------------
  // Version
  // ------------------------------------------------------------
  /**
   * @function listObjectVersions
   * Get the versions for an object
   * @param objectId The id for the object to get versions for
   * @returns {Promise} An axios response
   */
  listObjectVersions(objectId) {
    return comsAxios().get(`/object/${objectId}/versions`);
  },
  // -----------------------------------------------------/version


  // ------------------------------------------------------------
  // Permission
  // ------------------------------------------------------------
  /**
   * @function listPermissions
   * Get the object permissions
   * @param objectId The id for the object to get perms for
   * @returns {Promise} An axios response
   */
  listPermissions(objectId) {
    return comsAxios().get(`/permission/${objectId}`);
  },
  // -------------------------------------------------/permission
};
