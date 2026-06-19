'use client';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Hàm khởi tạo cấu hình mặc định cho QueryClient
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Thông thường ở SSR, bạn nên set staleTime lớn hơn 0
        // để tránh việc fetch lại data ngay lập tức trên client
        staleTime: 60 * 1000, // 1 phút
        refetchOnWindowFocus: false,
      },
    },
  });
}

// Biến lưu trữ QueryClient trên trình duyệt
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // Nếu đang chạy trên Server (SSR), luôn tạo một client mới
    // để tránh rò rỉ dữ liệu giữa các user khác nhau.
    return makeQueryClient();
  } else {
    // Nếu đang chạy trên Client (Trình duyệt), chỉ tạo client 1 lần duy nhất
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}