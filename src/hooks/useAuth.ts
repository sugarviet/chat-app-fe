import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service';
import { getAccessToken } from '@/lib/api';

const useAuth = () => {
  const { setAuth, clearAuth } = useAuthStore();

  useEffect(() => {
    authService.me().then(
      user => setAuth(user, getAccessToken()!)).
      catch(() => {
      clearAuth();
    })
  }, [])
}

export default useAuth;