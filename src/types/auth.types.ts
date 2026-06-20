import type { z } from 'zod';
import type { loginSchema, registerSchema } from '@/lib/validations/auth';

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;

export type AuthResponse = {
  accessToken: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatar: string | null;
  };
};
