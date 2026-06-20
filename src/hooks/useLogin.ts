'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { setAccessToken } from '@/lib/api';
import { authService } from '@/services/auth.service';
import type { AuthResponse, LoginForm } from '@/types/auth.types';

const useLogin = () => {
  const router = useRouter();

  return useMutation<AuthResponse, AxiosError<{ message: string }>, LoginForm>({
    mutationFn: authService.login,
    onSuccess: ({ accessToken }) => {
      setAccessToken(accessToken);
      router.push('/chat');
    },
    onError: (error) => {
      const message = error.response?.data?.message ?? 'Login failed';
      console.error(message);
    },
  });
};

export default useLogin;