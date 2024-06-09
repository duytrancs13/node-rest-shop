import axios, { AxiosResponse } from "axios";
import { INVALID_TOKEN } from "constant/number";

export enum CODE {
  SUCCESS = 0,
}

export interface IResponse {
  error_code: number;
  data: any;
  message: string;
}

const TIMEOUT = 30000;

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-type": "application/json",
    // "Content-Type": "application/x-www-form-urlencoded",
  },
  // withCredentials: true,
});

api.defaults.timeout = TIMEOUT;

let requestTokenRequest: any = null;
let isExpiredToken = false;

const refreshToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const refreshTokenResp = await axios({
        baseURL: `${process.env.REACT_APP_API}/refresh-token`,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
        timeout: TIMEOUT,
      });
      const rawRefreshTokenResp = refreshTokenResp.data;
      if (
        rawRefreshTokenResp &&
        rawRefreshTokenResp.error_code === CODE.SUCCESS
      ) {
        const accessToken = rawRefreshTokenResp.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
      }
      resolve(rawRefreshTokenResp);
    } catch (error) {
      reject(null);
    }
  });
};

api.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (config) => {
    if (config.data.error_code === INVALID_TOKEN) {
      isExpiredToken = true;

      if (isExpiredToken) {
        requestTokenRequest = requestTokenRequest
          ? requestTokenRequest
          : refreshToken();
        await requestTokenRequest;

        requestTokenRequest = null;
        isExpiredToken = false;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
