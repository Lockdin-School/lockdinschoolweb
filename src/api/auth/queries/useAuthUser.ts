// src/api/auth/queries/useAuthUser.ts

import { useQuery } from '@tanstack/react-query'
import { getAuthUser } from '@/api/auth/getAuthUser'

export const authKeys = {
    all: ['auth'] as const,
    user: () => [...authKeys.all, 'user'] as const,
}

export function useAuthUser() {
    return useQuery({
        queryKey: authKeys.user(),
        queryFn: getAuthUser,
        staleTime: 1000 * 60 * 5,
        retry: false,
    })
}