import { comsAxios } from '@/services/interceptors';

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
   * @returns {Promise} An axios response
   */
  getObject(objectId) {
    return comsAxios().get(`/object/${objectId}`);
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
