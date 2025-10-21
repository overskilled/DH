import api from "./base/api";

export const ClientService = {
  getAll: async (paginationDto?: any) => {
    const params = new URLSearchParams();
    
    if (paginationDto?.page) params.append('page', paginationDto.page.toString());
    if (paginationDto?.limit) params.append('limit', paginationDto.limit.toString());

    const url = paginationDto ? `/clients?${params.toString()}` : '/clients';
    const res = await api.get(url);
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/clients/${id}`);
    return res.data;
  },

  create: async (createClientDto: any) => {
    const res = await api.post(`/clients`, createClientDto);
    return res.data;
  },

  update: async (id: string, updateClientDto: any) => {
    const res = await api.put(`/clients/${id}`, updateClientDto);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/clients/${id}`);
    return res.data;
  },

  search: async (search: string) => {
    const res = await api.get(`/clients/search?search=${search}`);
    return res.data;
  }
};