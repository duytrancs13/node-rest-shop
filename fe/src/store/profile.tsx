import { createSlice } from "@reduxjs/toolkit";

import { AxiosError } from "axios";

import { ProfileI } from "types/profile";

import profile from "service/profile";
import { CODE } from "service/http-common";
import { INVALID_TOKEN } from "constant/number";

interface initialProfileStateI {
  profile: ProfileI | null;
  isLoadingProfile: boolean;
  errorProfile: string | boolean;

  isLoggingOut: boolean;
  errorLoggedOut: boolean;
}

const initialState: initialProfileStateI = {
  profile: null,
  isLoadingProfile: false,
  errorProfile: false,

  // logout
  isLoggingOut: false,
  errorLoggedOut: false,
};

// Slice
const slice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchingProfile: (state) => {
      state.isLoadingProfile = true;
    },
    fetchedSuccessProfile: (
      state,
      action: {
        payload: ProfileI | null;
      }
    ) => {
      state.profile = action.payload;
      state.isLoadingProfile = false;
      state.errorProfile = false;
    },
    fetchedErrorProfile: (
      state,
      action: {
        payload: boolean;
      }
    ) => {
      state.isLoadingProfile = false;
      state.errorProfile = action.payload;
    },
    // logout
    loggingOut: (state) => {
      state.isLoggingOut = true;
    },
    errorLoggedOut: (state) => {
      state.isLoggingOut = false;
    },
  },
});

// Actions
const {
  fetchingProfile,
  fetchedSuccessProfile,
  fetchedErrorProfile,
  loggingOut,
  errorLoggedOut,
} = slice.actions;
export const onFetchProfile =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(fetchingProfile());

      const getUserInfoResp = await profile.getUserInfo();
      if (getUserInfoResp?.error_code !== CODE.SUCCESS) {
        if (getUserInfoResp.error_code === INVALID_TOKEN) {
          // retry
          const retryGetUserInfoResp = await profile.getUserInfo();
          if (retryGetUserInfoResp.error_code !== CODE.SUCCESS) {
            dispatch(fetchedErrorProfile(true));
          }
          dispatch(fetchedSuccessProfile(retryGetUserInfoResp.data));
          return;
        }

        dispatch(fetchedErrorProfile(true));
        return;
      }

      dispatch(fetchedSuccessProfile(getUserInfoResp.data));
      // @ts-ignore
    } catch (error: Error | AxiosError) {
      /* if (error.code === ERR_NETWORK || error.code === ECONNABORTED) {
        console.log("error: ", error);
        dispatch(fetchedError(error.code));
        return;
      } */
      dispatch(fetchedErrorProfile(true));
    }
  };

export const onLogout =
  () =>
  async (dispatch: any): Promise<void> => {
    try {
      dispatch(loggingOut());
      const logoutResp = await profile.logout();

      if (logoutResp?.error_code !== CODE.SUCCESS) {
        // retry
        if (logoutResp.error_code === INVALID_TOKEN) {
          const retryLogoutResp = await profile.logout();
          if (retryLogoutResp?.error_code !== CODE.SUCCESS) {
            dispatch(errorLoggedOut());
            return;
          }

          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = window.location.origin;
          return;
        }

        dispatch(errorLoggedOut());
        return;
      }
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = window.location.origin;
    } catch (error) {
      dispatch(errorLoggedOut());
    }
  };

export default slice.reducer;
