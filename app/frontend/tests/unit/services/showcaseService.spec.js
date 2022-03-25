import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import showcaseService from '@/services/showcaseService';
import { ApiRoutes } from '@/utils/constants';

const mockInstance = axios.create();

describe('getHello', () => {
  const mockAxios = new MockAdapter(mockInstance);
  
  beforeEach(() => {
    mockAxios.reset();
  });

  it('calls email endpoint', async () => {
    mockAxios.onGet(ApiRoutes.HELLO).reply(200, 'ok');

    const result = await showcaseService.getHello();
    expect(result).toBeTruthy();
    expect(result.data).toEqual('ok');
    expect(mockAxios.history.get.length).toBe(1);
  });
});
