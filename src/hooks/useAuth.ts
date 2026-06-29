import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth.store'
import { authService } from '@/services/auth.service';
import { getAccessToken } from '@/lib/api';

const useAuth = () => {
  const setAuth = useAuthStore((s) => s.setAuth)
  const clearAuth = useAuthStore((s) => s.clearAuth)

  useEffect(() => {
    authService.me()
      .then((user) => setAuth(user, getAccessToken()!))
      .catch(() => clearAuth())
  }, [setAuth, clearAuth])
}

export default useAuth;