import axios from "axios";

// Création d'une instance axios avec la configuration de base
const api = axios.create({
  baseURL: "https://api-staging.supmanagement.ml",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 0000-8432-3244-0923",
  },
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Types
export interface Program {
  id: string;
  name: string;
  acronym: string;
  type: ProgramType;
  levels?: Level[];
  createdAt: string;
  updatedAt: string;
}

export interface ProgramType {
  id: string;
  name: string;
}

export interface Level {
  id: string;
  name: string;
  acronym: string;
  index: number;
  programs?: Program[];
  updatedAt: string;
  createdAt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  level?: Level;
  program?: Program;
  registrationDate: string;
}

// Services API
export const programsApi = {
  getAll: () => api.get<Program[]>("/v2/programs"),
  getById: (id: string) => api.get<Program>(`/v2/programs/${id}`),
  create: (data: Partial<Program>) => api.post<Program>("/v2/programs", data),
  update: (id: string, data: Partial<Program>) =>
    api.patch<Program>(`/v2/programs/${id}`, data),
  delete: (id: string) => api.delete(`/v2/programs/${id}`),
};

export const programTypesApi = {
  getAll: () => api.get<ProgramType[]>("/v2/program-types"),
};

export const levelsApi = {
  getAll: () => api.get<Level[]>("/v2/levels"),
  getById: (id: string) => api.get<Level>(`/v2/levels/${id}`),
  create: (data: Partial<Level>) => api.post<Level>("/v2/levels", data),
  update: (id: string, data: Partial<Level>) =>
    api.patch<Level>(`/v2/levels/${id}`, data),
  delete: (id: string) => api.delete(`/v2/levels/${id}`),
};

// Pour la page étudiants, nous allons simuler les données car les endpoints ne sont pas spécifiés
export const studentsApi = {
  getAll: () =>
    Promise.resolve({
      data: [
        {
          id: "1",
          firstName: "Jean",
          lastName: "Dupont",
          email: "jean.dupont@example.com",
          level: { id: "1", name: "Licence 1", acronym: "L1" },
          program: { id: "1", name: "Informatique", acronym: "INFO" },
          registrationDate: "2023-09-01T00:00:00.000Z",
        },
        {
          id: "2",
          firstName: "Marie",
          lastName: "Martin",
          email: "marie.martin@example.com",
          level: { id: "2", name: "Licence 2", acronym: "L2" },
          program: { id: "2", name: "Gestion", acronym: "GEST" },
          registrationDate: "2023-09-02T00:00:00.000Z",
        },
        {
          id: "3",
          firstName: "Pierre",
          lastName: "Durand",
          email: "pierre.durand@example.com",
          level: { id: "3", name: "Licence 3", acronym: "L3" },
          program: { id: "1", name: "Informatique", acronym: "INFO" },
          registrationDate: "2023-09-03T00:00:00.000Z",
        },
        {
          id: "4",
          firstName: "Sophie",
          lastName: "Leroy",
          email: "sophie.leroy@example.com",
          level: { id: "4", name: "Master 1", acronym: "M1" },
          program: { id: "3", name: "Marketing", acronym: "MKT" },
          registrationDate: "2023-09-04T00:00:00.000Z",
        },
        {
          id: "5",
          firstName: "Thomas",
          lastName: "Moreau",
          email: "thomas.moreau@example.com",
          level: { id: "5", name: "Master 2", acronym: "M2" },
          program: { id: "2", name: "Gestion", acronym: "GEST" },
          registrationDate: "2023-09-05T00:00:00.000Z",
        },
      ],
    }),
};

export default api;
