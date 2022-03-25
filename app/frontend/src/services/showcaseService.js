import axios from 'axios';
import { ApiRoutes } from '@/utils/constants';

// Calls to the showcase app backend API (nothing to do in here at the moment, might use more later)
// using non-interceptor axios (no tokens used in )
export default {
  /**
   * @function getHello
   * Fetch the contents of the hello endpoint
   * @returns {Promise} An axios response
   */
  getHello() {
    return axios.get(ApiRoutes.HELLO);
  }
};
