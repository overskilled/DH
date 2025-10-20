import api from "./base/api";

export const DepartmentService = {
  getById: async (id: string) => {
    const res = await api.get(`/departements/${id}`);
    return res.data;
  },

  getAll: async () => {
    const res = await api.get(`/departements`);
    return res.data
  }
};