import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import { StoreBundle } from 'store';
import { RESPONSE_MESSAGES } from '../config';
import { AxiosResponseGeneric } from 'types';

export type HttpClient = {
  get: <T = any>(url: string, params?: any, options?: any) => AxiosPromise<T>;
  put: <T = any>(url: string, payload?: any, options?: any) => AxiosPromise<T>;
  post: <T = any>(url: string, payload?: any, options?: any) => Promise<AxiosResponseGeneric<T>>;
  delete: <T = any>(url: string, payload?: any, options?: any) => AxiosPromise<T>;
};

let store: StoreBundle;
export const initHttpClientService = (storeBundle: StoreBundle): void => {
  store = storeBundle;
};

export const httpClient: HttpClient = {
  get: function(url: string, params?: any, options?: any) {
    let config: AxiosRequestConfig = {
      method: 'GET' as Method,
      url: url,
      params: params,
    };
    config = Object.assign(config, options);
    return axios(config)
      .then(function(response) {
        if (response.headers['x-access-token']) {
          updateTokensFromHeaders(response.headers);
        }
        return response;
      })
      .catch(function(error) {
        if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
          store.storeDispatch(store.useRefreshToken());
          return httpClient.get(url, params, options);
        } else {
          throw error;
        }
      });
  },

  put: function(url: string, payload?: any, options?: any) {
    let config: AxiosRequestConfig = {
      method: 'PUT' as Method,
      url: url,
      data: payload,
    };
    config = Object.assign(config, options);
    return axios(config)
      .then(function(response) {
        if (response.headers['x-access-token']) {
          updateTokensFromHeaders(response.headers);
        }
        return response;
      })
      .catch(function(error) {
        if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
          store.storeDispatch(store.useRefreshToken());
          return httpClient.put(url, payload, options);
        } else {
          throw error;
        }
      });
  },

  post: function(url: string, payload?: any, options?: any) {
    let config: AxiosRequestConfig = {
      method: 'POST' as Method,
      url: url,
      data: payload,
    };
    config = Object.assign(config, options);
    return axios(config)
      .then(function(response) {
        if (response.headers['x-access-token']) {
          updateTokensFromHeaders(response.headers);
        }
        return response;
      })
      .catch(function(error) {
        if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
          store.storeDispatch(store.useRefreshToken());
          return httpClient.post(url, payload, options);
        } else {
          throw error;
        }
      });
  },

  delete: function(url: string, payload?: any, options?: any) {
    let config: AxiosRequestConfig = {
      method: 'DELETE' as Method,
      url: url,
      data: payload,
    };
    config = Object.assign(config, options);
    return axios(config)
      .then(function(response) {
        if (response.headers['x-access-token']) {
          updateTokensFromHeaders(response.headers);
        }
        return response;
      })
      .catch(function(error) {
        if (error === RESPONSE_MESSAGES.EXPIRED_ACCESS_TOKEN) {
          store.storeDispatch(store.useRefreshToken());
          return httpClient.delete(url, payload, options);
        } else {
          throw error;
        }
      });
  },
};

const updateTokensFromHeaders = (headers: any) => {
  const accessToken = headers['x-access-token'];
  const refreshToken = headers['x-refresh-token'];

  if (accessToken && refreshToken) {
    const tokens = {
      accessToken,
      refreshToken,
    };
    store.storeDispatch(store.updateTokens(tokens));
  }
};

export default httpClient;
