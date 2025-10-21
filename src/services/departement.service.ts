import api from "./base/api";

export const DepartmentService = {
  getById: async (id: string) => {
    const res = await api.get(`/departements/${id}`);
    return res.data;
  },

  getAll: async () => {
    const res = await api.get(`/departements`);
    return res.data;
  },

  getByName: async (name: string) => {
    const res = await api.get(`/departements/name/${name}`);
    return res.data;
  },

  getStats: async (id: string) => {
    const res = await api.get(`/departements/${id}/stats`);
    return res.data;
  },

  getUsers: async (id: string) => {
    const res = await api.get(`/departements/${id}/users`);
    return res.data;
  },

  getDocuments: async (id: string) => {
    const res = await api.get(`/departements/${id}/documents`);
    return res.data;
  },

  create: async (createDepartmentDto: any) => {
    const res = await api.post(`/departements`, createDepartmentDto);
    return res.data;
  },

  update: async (id: string, updateDepartmentDto: any) => {
    const res = await api.patch(`/departements/${id}`, updateDepartmentDto);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/departements/${id}`);
    return res.data;
  }
};