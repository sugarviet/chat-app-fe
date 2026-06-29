import api from '@/lib/api';
import type { AuthResponse, LoginForm, RegisterForm } from '@/types/auth.types';
import type { User } from '@/types/user.types';

type BackendAuthResponse = {
  success: boolean;
  data: User;
  accessToken: string;
};

type BackendMeResponse = {
  success: boolean;
  data: User;
};

export const authService = {
  login: (data: LoginForm) =>
    api.post<BackendAuthResponse>('/auth/login', data).then((r): AuthResponse => ({
      accessToken: r.data.accessToken,
      user: { ...r.data.data, avatar: r.data.data.avatar ?? null },
    })),

  register: (data: RegisterForm) =>
    api.post<BackendAuthResponse>('/auth/register', data).then((r): AuthResponse => ({
      accessToken: r.data.accessToken,
      user: { ...r.data.data, avatar: r.data.data.avatar ?? null },
    })),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get<BackendMeResponse>('/auth/me').then((r) => r.data.data),
};
