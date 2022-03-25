import axios from 'axios';
import Vue from 'vue';

/**
 * @function comsAxios
 * Returns an Axios instance with auth header and preconfiguration to call the COMS api
 * @param {integer} [timeout=10000] Number of milliseconds before timing out the request
 * @returns {object} An axios instance
 */
export function comsAxios(timeout = 10000) {
  const axiosOptions = { timeout: timeout };
  if (Vue.prototype.$config) {
    const config = Vue.prototype.$config;
    axiosOptions.baseURL = `${config.coms.endpoint}`;
  }

  const instance = axios.create(axiosOptions);

  instance.interceptors.request.use(cfg => {
    if (Vue.prototype.$keycloak &&
      Vue.prototype.$keycloak.ready &&
      Vue.prototype.$keycloak.authenticated) {
      cfg.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`;
    }
    return Promise.resolve(cfg);
  }, error => {
    return Promise.reject(error);
  });

  return instance;
}
