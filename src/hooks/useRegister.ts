'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { setAccessToken } from '@/lib/api';
import { authService } from '@/services/auth.service';
import type { AuthResponse, RegisterForm } from '@/types/auth.types';
import { useAuthStore } from '@/store/auth.store';

const useRegister = () => {
  const {setAuth} = useAuthStore();
  const router = useRouter();

  return useMutation<AuthResponse, AxiosError<{ message: string }>, RegisterForm>({
    mutationFn: authService.register,
    onSuccess: ({ accessToken, user }) => {
      setAccessToken(accessToken);
      setAuth(user, accessToken);
      router.push('/chat');
    },
    onError: (error) => {
      const message = error.response?.data?.message ?? 'Register failed';
      console.error(message);
    },
  });
};

export default useRegister;
