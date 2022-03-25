import { comsAxios } from '@/services/interceptors';

// Calls to the COMS API
export default {
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
  }
};
