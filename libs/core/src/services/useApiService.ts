import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestHeaders } from "axios";
import {
  FetchMethod,
  HttpMethod,
  RequestBody,
  Url,
} from "../types/Utility/Http";

export function useApi() {
  const { getItem } = useAsyncStorage("user");

  const defaultHeaders: AxiosRequestHeaders = {
    "Content-Type": "application/json",
  };

  async function fetchData<T>(
    route: Url,
    method: FetchMethod,
    body: RequestBody<any> = null,
    headers: AxiosRequestHeaders | null = null
  ) {
    if (!route) {
      throw new Error("Route is not defined");
    }

    const user = await getItem();

    if (user) {
      defaultHeaders["Authorization"] = `Bearer ${user}`;
    }

    if (headers) {
      Object.assign(defaultHeaders, headers);
    }

    const response = await axios({
      method,
      url: route,
      headers: defaultHeaders,
      data: body,
    });

    return (await response.data) as T;
  }

  function GET<T>(
    route: Url,
    headers: AxiosRequestHeaders | null = null,
    body: RequestBody<any> | null = null
  ) {
    return fetchData<T>(route, HttpMethod.GET, body, headers);
  }

  function POST<T>(route: Url, body: RequestBody<any>) {
    return fetchData<T>(route, HttpMethod.POST, body);
  }

  function PATCH<T>(
    route: Url,
    body: RequestBody<any>,
    headers: AxiosRequestHeaders | null = null
  ) {
    return fetchData<T>(route, HttpMethod.PATCH, body, headers);
  }

  return {
    GET,
    PATCH,
    POST,
  };
}
