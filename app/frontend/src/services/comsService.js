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
   * @param versionId An optional versionId
   */
  getObject(objectId, versionId, download) {
    if (download) {
      comsAxios().get(`/object/${objectId}`, {
        responseType: 'blob',
        params: {
          versionId: versionId,
          download: 'proxy'
        }
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', response.headers['x-amz-meta-name']);
        document.body.appendChild(link);
        link.click();
      });
    } else {
      // Get just the link to the unlocked object store entity and open it
      comsAxios().get(`/object/${objectId}`, {
        params: {
          versionId: versionId,
          download: 'url'
        }
      }).then((response) => {
        const url = response.data;
        const link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click();
      });
    }
  },

  /**
   * @function listObjects
   * List and search for all objects
   * @returns {Promise} An axios response
   */
  listObjects(params = {}) {
    // remove objId array if its first element is undefined
    if (params.objId && params.objId[0] === undefined) delete params.objId;
    return comsAxios().get('/object', { params: params });
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

  /**
   * @function updateObject
   * Update the object record (will add new version)
   * @returns {Promise} An axios response
   */
  updateObject(objectId, object) {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    let fd = new FormData();
    fd.append('file', object);
    return comsAxios().post(`/object/${objectId}`, fd, config);
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
    return comsAxios().get(`/object/${objectId}/version`);
  },
  // -----------------------------------------------------/version


  // ------------------------------------------------------------
  // Permission
  // ------------------------------------------------------------
  /**
   * @function addUserPermission
   * Add an object permission
   * @param objectId The id for the object to delete perms for
   * @param userId The id for the user to delete perms for
   * @param permission The perm to add
   * @returns {Promise} An axios response
   */
  addUserPermission(objectId, userId, permission) {
    return comsAxios().put(`/permission/${objectId}`,
      [{
        userId: userId,
        permCode: permission
      }]);
  },

  /**
   * @function deleteUserPermissions
   * Delete object permissions
   * @param objectId The id for the object to delete perms for
   * @param userId The id for the user to delete perms for
   * @returns {Promise} An axios response
   */
  deleteUserPermissions(objectId, userId, permissions) {
    return comsAxios().delete(`/permission/${objectId}`, {
      params: {
        userId: userId,
        permCode: permissions
      }
    });
  },


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


  // ------------------------------------------------------------
  // Users
  // ------------------------------------------------------------
  /**
   * @function getUsers
   * Search for users
   * @param params The search params (see COMS spec for all options)
   * @returns {Promise} An axios response
   */
  getUsers(params) {
    return comsAxios().get('/user', { params: params });
  },
  // -------------------------------------------------/Users
};
