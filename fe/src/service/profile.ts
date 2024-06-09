import api, { IResponse } from "./http-common";

class ProfileService {
  signUp = async (payload: { email: string; password: string }) => {
    const res = await api.post<IResponse>(`/sign-up`, JSON.stringify(payload));
    return res.data;
  };

  signIn = async (payload: { email: string; password: string }) => {
    const res = await api.post<IResponse>(`/sign-in`, JSON.stringify(payload));
    return res.data;
  };

  getUserInfo = async () => {
    const res = await api.get<IResponse>(`/get-user-info`);
    return res.data;
  };

  logout = async () => {
    const res = await api.delete<IResponse>(`/sign-out`, {
      data: { refreshToken: localStorage.getItem("refreshToken") },
    });
    return res.data;
  };

  verifyEmail = async (email: string) => {
    const res = await api.post<IResponse>(
      `/verify-email`,
      JSON.stringify({ email })
    );
    return res.data;
  };

  resetPassword = async (payload: {
    userId: string;
    token: string;
    newPassword: string;
  }) => {
    const res = await api.post<IResponse>(
      `/reset-password`,
      JSON.stringify(payload)
    );
    return res.data;
  };
}

const profileService = new ProfileService();

export default profileService;
