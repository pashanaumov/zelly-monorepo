export type Url = string;
export type BaseUrl = Url;
export type RequestRoute = Url;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
}

export type FetchMethod<T = HttpMethod, K = string> = { [K in keyof T]: T[K] };

export type RequestBody<T extends {}> = T & {};
