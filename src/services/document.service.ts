import api from "./base/api";

export const DocumentsService = {
  // Document CRUD Operations
  create: async (createDocumentDto: any) => {
    const res = await api.post(`/documents`, createDocumentDto);
    return res.data;
  },

  getAll: async (paginationDto: any, filters?: { status?: string; departmentId?: string }) => {
    const params = new URLSearchParams();
    
    // Add pagination params
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());
    
    // Add filter params
    if (filters?.status) params.append('status', filters.status);
    if (filters?.departmentId) params.append('departmentId', filters.departmentId);

    const res = await api.get(`/documents?${params.toString()}`);
    return res.data;
  },

  search: async (search: string, paginationDto: any, filters?: { status?: string; departmentId?: string }) => {
    const params = new URLSearchParams();
    
    // Add search param
    params.append('search', search);
    
    // Add pagination params
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());
    
    // Add filter params
    if (filters?.status) params.append('status', filters.status);
    if (filters?.departmentId) params.append('departmentId', filters.departmentId);

    const res = await api.get(`/documents/search?${params.toString()}`);
    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get(`/documents/${id}`);
    return res.data;
  },

  update: async (id: string, updateDocumentDto: any) => {
    const res = await api.put(`/documents/${id}`, updateDocumentDto);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/documents/${id}`);
    return res.data;
  },

  // List Management
  getDocumentLists: async (documentId: string, paginationDto: any) => {
    const params = new URLSearchParams();
    
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());

    const res = await api.get(`/documents/${documentId}/lists?${params.toString()}`);
    return res.data;
  },

  createList: async (createListDto: any) => {
    const res = await api.post(`/documents/lists`, createListDto);
    return res.data;
  },

  updateListStatus: async (listId: string, status: string) => {
    const res = await api.put(`/documents/lists/${listId}/status`, { status });
    return res.data;
  },

  // Task Management
  getListTasks: async (listId: string, paginationDto: any, filters?: { status?: string; assigneeId?: string }) => {
    const params = new URLSearchParams();
    
    // Add pagination params
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());
    
    // Add filter params
    if (filters?.status) params.append('status', filters.status);
    if (filters?.assigneeId) params.append('assigneeId', filters.assigneeId);

    const res = await api.get(`/documents/lists/${listId}/tasks?${params.toString()}`);
    return res.data;
  },

  createTask: async (createTaskDto: any) => {
    const res = await api.post(`/documents/tasks`, createTaskDto);
    return res.data;
  },

  updateTask: async (taskId: string, updateTaskDto: any) => {
    const res = await api.put(`/documents/tasks/${taskId}`, updateTaskDto);
    return res.data;
  },

  assignTask: async (taskId: string, assigneeId: string) => {
    const res = await api.put(`/documents/tasks/${taskId}/assign`, { assigneeId });
    return res.data;
  },

  // Time Entry Management
  getTaskTimeEntries: async (taskId: string, paginationDto: any) => {
    const params = new URLSearchParams();
    
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());

    const res = await api.get(`/documents/tasks/${taskId}/time-entries?${params.toString()}`);
    return res.data;
  },

  createTimeEntry: async (createTimeEntryDto: any) => {
    const res = await api.post(`/documents/time-entries`, createTimeEntryDto);
    return res.data;
  },

  // User-specific endpoints
  getMyTasks: async (paginationDto: any, status?: string) => {
    const params = new URLSearchParams();
    
    // Add pagination params
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());
    
    // Add status filter
    if (status) params.append('status', status);

    const res = await api.get(`/documents/my/tasks?${params.toString()}`);
    return res.data;
  },

  getDepartmentTasks: async (paginationDto: any, departmentId?: string) => {
    const params = new URLSearchParams();
    
    // Add pagination params
    if (paginationDto.page) params.append('page', paginationDto.page.toString());
    if (paginationDto.limit) params.append('limit', paginationDto.limit.toString());
    
    // Add department filter
    if (departmentId) params.append('departmentId', departmentId);

    const res = await api.get(`/documents/department/tasks?${params.toString()}`);
    return res.data;
  }
};