import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestHeaders } from 'axios';
import { jwtAuthInterceptor } from '../interceptors/jwtAuthInterceptor';
import { GenericObject } from '../types/Utility/Helpers';
import { FetchMethod, HttpMethod, RequestBody, Url } from '../types/Utility/Http';

jwtAuthInterceptor();

export function apiService() {
  const { getItem } = useAsyncStorage('user');

  const defaultHeaders: AxiosRequestHeaders = {
    'Content-Type': 'application/json',
  };

  async function fetchData<T>(route: Url, method: FetchMethod, body: RequestBody<any> = null, headers: AxiosRequestHeaders | null = null) {
    if (!route) {
      throw new Error('Route is not defined');
    }

    const user = await getItem();

    if (user) {
      defaultHeaders['Authorization'] = `Bearer ${user}`;
    }

    if (headers) {
      Object.assign(defaultHeaders, headers);
    }

    const response = await axios({
      method,
      url: route,
      headers: defaultHeaders,
      data: body || undefined,
    });

    return (await response.data) as T;
  }

  function GET<T>(route: Url, headers: AxiosRequestHeaders | null = null, body: RequestBody<any> | null = null) {
    return fetchData<T>(route, HttpMethod.GET, body, headers);
  }

  function POST<T, R = Record<string, any>>(route: Url, body: RequestBody<R>) {
    return fetchData<T>(route, HttpMethod.POST, body);
  }

  function PATCH<T, R = Record<string, any>>(route: Url, body: RequestBody<R>, headers: AxiosRequestHeaders | null = null) {
    return fetchData<T>(route, HttpMethod.PATCH, body, headers);
  }

  function PUT<T, R = Record<string, any>>(route: Url, body: RequestBody<R>, headers: AxiosRequestHeaders | null = null) {
    return fetchData<T>(route, HttpMethod.PUT, body, headers);
  }

  return {
    GET,
    PATCH,
    POST,
    PUT,
  };
}
