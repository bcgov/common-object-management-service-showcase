import { appAxios } from '@/services/interceptors';
import { ApiRoutes } from '@/utils/constants';

// Calls to the showcase app backend API (nothing to do in here at the moment, might use more later)
// using non-interceptor axios (no tokens)
export default {
  /**
   * @function getHello
   * Fetch the contents of the hello endpoint
   * @returns {Promise} An axios response
   */
  getHello() {
    return appAxios().get(ApiRoutes.HELLO);
  }
};
