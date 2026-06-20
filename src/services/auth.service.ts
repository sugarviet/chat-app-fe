import api from '@/lib/api';
import type { AuthResponse, LoginForm, RegisterForm } from '@/types/auth.types';

export const authService = {
  login: (data: LoginForm) =>
    api.post<AuthResponse>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterForm) =>
    api.post<AuthResponse>('/auth/register', data).then((r) => r.data),

  logout: () =>
    api.post('/auth/logout'),

  me: () =>
    api.get<AuthResponse['user']>('/auth/me').then((r) => r.data),
};
