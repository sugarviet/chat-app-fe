'use client'

import { useQuery, UseQueryResult, UseQueryOptions } from '@tanstack/react-query';
import api from '@/lib/api';

type FetchType<TData> = {
  url: string,
  options?: Omit<UseQueryOptions<TData, Error, TData>, 'queryKey' | 'queryFn'>
}

const useFetch = <TData,>({ url, options }:
  FetchType<TData>): UseQueryResult<TData, Error> => {
    return useQuery<TData, Error, TData>({
      queryKey: [url],
      queryFn: async(): Promise<TData> => {
        const response = await api.get<TData>(url);

        return response.data;
      },
      ...options
    })
  }

export default useFetch