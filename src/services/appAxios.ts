import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { i18n } from 'next-i18next';

import cookie, { keyIdToken, keyRefreshToken } from '@/utils/cookie';
import { EErrorCode } from '@/constants/enums';
import { TCustomAxiosRequestConfig } from '@/typings/axios';

const mapEmptyArray = (a: any): any | null[] =>
  Array.isArray(a) && !a.length ? [null] : a;

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  timeout: 60000,
  paramsSerializer: {
    serialize: (params: Record<string, unknown>) =>
      stringify(params, {
        arrayFormat: 'comma',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        filter: (_prefix, v) => mapEmptyArray(v),
      }),
  },
});

let refreshTokenRequest: Promise<InitiateAuthCommandOutput | undefined> | null;

const isClient = typeof window !== 'undefined';

const language: { [key: string]: string } = {
  ja: 'jp',
  en: 'en',
};

instance.interceptors.request.use(
  async ({
    isAuth,
    ...config
  }: InternalAxiosRequestConfig & TCustomAxiosRequestConfig) => {
    config.headers['Accept-Language'] = language[i18n?.language ?? 'ja'];

    if (isClient && isAuth) {
      const idToken = cookie.get(keyIdToken);
      const refreshToken = cookie.get(keyRefreshToken);

      if (idToken) {
        config.headers.Authorization = `Bearer ${idToken}`;
      } else if (refreshToken) {
        refreshTokenRequest = refreshTokenRequest || handleRefreshTokenClient();

        const refreshTokenResponse = await refreshTokenRequest;
        const newIdToken = refreshTokenResponse?.AuthenticationResult?.IdToken;

        refreshTokenRequest = null;

        if (newIdToken) {
          config.headers.Authorization = `Bearer ${newIdToken}`;
        }
      } else {
        const controller = new AbortController();

        controller.abort();

        handleRefreshTokenClientExpired();

        return { ...config, signal: controller.signal };
      }
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  config => config,
  async (error: AxiosError): Promise<AxiosError> => {
    if (isClient && error.response?.status === EErrorCode.Unauthorized) {
      const shouldRefreshToken = await checkShouldRefreshToken();

      if (shouldRefreshToken) {
        refreshTokenRequest = refreshTokenRequest || handleRefreshTokenClient();

        const refreshTokenResponse = await refreshTokenRequest;
        const newIdToken = refreshTokenResponse?.AuthenticationResult?.IdToken;

        refreshTokenRequest = null;

        if (newIdToken && error.response) {
          error.response.config.headers.Authorization = `Bearer ${newIdToken}`;

          return instance(error.response.config);
        }
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
