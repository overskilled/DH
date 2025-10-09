import api from "./base/api";

export const AuthService = {
  login: async (email: string, password: string) => {
    const res = await api.post(`/auth/login`, {
      email: email,
      password: password,
    });
    return res.data;
  },
};
