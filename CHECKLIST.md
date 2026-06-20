# Chat App FE — Development Checklist

Stack: Next.js 15 · React 19 · TypeScript · Tailwind v4 · shadcn/ui · TanStack Query · Zod

---

## Phase 1 — Foundation

### 1.1 Root Layout & Providers ✅
- [x] Xoá boilerplate trong `src/app/page.tsx` và `layout.tsx`
- [x] Setup `layout.tsx`: font (next/font), metadata global, `<html lang="vi">`
- [x] Tạo `src/providers/QueryProvider.tsx` (`'use client'`) — bọc `QueryClientProvider`
- [x] Thêm `QueryProvider` vào root layout
- [x] Tạo `src/lib/api.ts` — axios instance với baseURL từ env, interceptor gắn token
- [x] Tạo `src/lib/constants.ts` — WS_URL, API_URL
- [x] Tạo `.env.local`: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`

### 1.2 Folder Structure ✅
- [x] Tạo `src/components/ui/` — shadcn components (đã có từ init)
- [x] Tạo `src/components/common/` — shared components (Avatar, Spinner, EmptyState)
- [x] Tạo `src/hooks/` — custom hooks
- [x] Tạo `src/types/` — TypeScript interfaces (User, Message, Conversation)
- [x] Tạo `src/store/` — global state (Zustand hoặc Context)

---

## Phase 2 — Authentication

> **Next.js Concept:** Route Groups `(folder)` nhóm route mà không tạo segment URL. Middleware chạy trên Edge trước khi render.

### 2.1 Route Groups ✅
- [x] Tạo `src/app/(auth)/layout.tsx` — layout đơn giản, không sidebar
- [x] Tạo `src/app/(auth)/login/page.tsx`
- [x] Tạo `src/app/(auth)/register/page.tsx`
- [x] Tạo `src/app/(app)/layout.tsx` — layout với sidebar + header
- [x] Tạo `src/app/(app)/chat/page.tsx` — màn hình chính

### 2.2 Middleware ✅
- [x] Tạo `src/middleware.ts` ở root
- [x] Logic: nếu chưa có token → redirect `/login`
- [x] Logic: nếu đã có token mà vào `/login` → redirect `/chat`
- [x] Khai báo `config.matcher` — chỉ chặn route cần thiết

### 2.3 Auth Forms ✅
- [x] Cài `react-hook-form`: `npm install react-hook-form @hookform/resolvers`
- [x] Tạo Zod schema: `loginSchema`, `registerSchema` trong `src/lib/validations/auth.ts`
- [x] Form login: shadcn `Input`, `Button`, `Form` + RHF + Zod
- [x] Form register: tương tự, thêm field confirm password
- [x] Mutation login với TanStack Query (`useMutation`)
- [x] Token: accessToken lưu in-memory (`setAccessToken`), refreshToken do Express set HttpOnly cookie

### 2.4 Auth State
- [ ] Tạo `src/store/auth.store.ts` — lưu user info
- [ ] Custom hook `useAuth()` — expose user, login, logout
- [ ] API: `GET /auth/me` — fetch user hiện tại khi app load

---

## Phase 3 — Data Fetching

> **Next.js Concept:** Server Component fetch data trực tiếp (async/await), không cần useEffect. `loading.tsx` = Suspense fallback tự động. `error.tsx` = Error Boundary tự động.

### 3.1 Server Components
- [ ] `(app)/chat/page.tsx` là Server Component — fetch danh sách conversations
- [ ] Tạo `(app)/chat/loading.tsx` — skeleton UI cho conversation list
- [ ] Tạo `(app)/chat/error.tsx` — `'use client'`, có nút retry

### 3.2 Client Components với TanStack Query
- [ ] `ConversationList` — `useQuery` fetch conversations, refetch khi WS có event mới
- [ ] `MessageList` — `useQuery` fetch messages theo `conversationId`
- [ ] `useSendMessage` — `useMutation` gửi message, optimistic update
- [ ] Tạo `src/hooks/useConversations.ts`, `src/hooks/useMessages.ts`

### 3.3 Streaming & Suspense
- [ ] Wrap `MessageList` trong `<Suspense fallback={<MessageSkeleton />}>`
- [ ] Hiểu sự khác biệt: `loading.tsx` (cả route) vs `<Suspense>` (component cụ thể)

---

## Phase 4 — Chat UI

### 4.1 Layout Chat
- [ ] Sidebar trái: danh sách conversations (ConversationList)
- [ ] Main area: messages + input box
- [ ] Responsive: mobile sidebar collapse

### 4.2 Components
- [ ] `ConversationItem` — avatar, tên, last message, unread badge
- [ ] `MessageBubble` — phân biệt sent/received, timestamp, read receipt
- [ ] `MessageInput` — textarea, gửi bằng Enter, Shift+Enter xuống dòng
- [ ] `TypingIndicator` — hiển thị khi người kia đang gõ
- [ ] `OnlineStatus` — dot xanh/xám trên avatar

### 4.3 Dynamic Route
- [ ] Tạo `(app)/chat/[conversationId]/page.tsx` — dynamic route
- [ ] Đọc `params.conversationId` và fetch messages tương ứng
- [ ] Tạo `(app)/chat/[conversationId]/loading.tsx`
- [ ] Tạo `(app)/chat/[conversationId]/not-found.tsx` — khi conversation không tồn tại

---

## Phase 5 — WebSocket

> **Next.js Concept:** WebSocket là browser API — chỉ dùng trong Client Component. Kết hợp với TanStack Query để sync real-time data vào cache.

### 5.1 WebSocket Hook
- [ ] Tạo `src/hooks/useWebSocket.ts` — `'use client'`
- [ ] Connect WS với token trong query param: `ws://...?token=xxx`
- [ ] Handle events: `message`, `typing`, `read_receipt`, `user_online`
- [ ] Auto reconnect với exponential backoff khi disconnect

### 5.2 Sync WS với TanStack Query
- [ ] Nhận event `new_message` → `queryClient.setQueryData(['messages', roomId], ...)`
- [ ] Nhận event `conversation_updated` → invalidate `['conversations']`
- [ ] Gửi `typing` event khi user đang gõ (debounce 500ms)
- [ ] Gửi `join_room` khi vào conversation, `leave_room` khi rời

### 5.3 Optimistic Updates
- [ ] `useMutation` gửi message: thêm vào cache ngay (`onMutate`)
- [ ] Rollback (`onError`) nếu server báo lỗi
- [ ] Message pending: hiển thị khác (opacity mờ, icon loading)

---

## Phase 6 — Advanced Routing

> **Next.js Concept:** Parallel Routes (`@slot`) render nhiều page song song trong layout. Intercepting Routes `(.)` hiển thị modal nhưng URL vẫn đúng.

### 6.1 Parallel Routes
- [ ] Tạo `(app)/@sidebar/` — conversation list là slot riêng
- [ ] Tạo `(app)/@main/` — message area là slot riêng
- [ ] Layout nhận `{ sidebar, main }` props, render cả hai
- [ ] Tạo `default.tsx` cho mỗi slot

### 6.2 Intercepting Routes (Modal Pattern)
- [ ] Tạo `(app)/@modal/(.)profile/[userId]/page.tsx`
- [ ] Click avatar → mở modal profile (giữ URL `/profile/123`)
- [ ] F5 hoặc paste URL → ra trang full `/profile/123`
- [ ] Tạo `src/components/common/Modal.tsx` dùng shadcn `Dialog`

### 6.3 Route Handler (Next.js API)
- [ ] `src/app/api/users/search/route.ts` — proxy search user tới Express backend
- [ ] Hiểu: Route Handler dùng khi cần header tuỳ chỉnh hoặc external service

---

## Phase 7 — Server Actions

> **Next.js Concept:** Server Action (`'use server'`) — function chạy trên server, gọi từ client không qua REST API. Dùng `revalidatePath()` để clear cache sau mutation.

- [ ] Tạo `src/actions/profile.ts` — `'use server'`
- [ ] Action `updateProfile(formData)`: update tên, avatar lên backend
- [ ] Gọi `revalidatePath('/profile')` sau khi update thành công
- [ ] Form update profile dùng `useActionState` (React 19) thay `useState`
- [ ] Hiểu khi nào dùng Server Action vs `useMutation` của TanStack Query

---

## Phase 8 — Performance & Polish

### 8.1 Next.js Optimization
- [ ] Thay tất cả `<img>` bằng `next/image` (`<Image>`)
- [ ] Font: đảm bảo dùng `next/font/google` (đã setup trong layout)
- [ ] Dynamic import emoji picker: `next/dynamic` với `ssr: false`
- [ ] Metadata: thêm `export const metadata` vào mỗi page (title, description)
- [ ] Dynamic metadata cho chat page: `generateMetadata({ params })`

### 8.2 UX Polish
- [ ] Scroll to bottom tự động khi có message mới
- [ ] Infinite scroll / pagination cho message history (TanStack Query `useInfiniteQuery`)
- [ ] Toast notification khi có message mới ở conversation khác (shadcn Sonner)
- [ ] Dark mode (Tailwind v4 hỗ trợ sẵn, shadcn cũng có)

### 8.3 Error Handling
- [ ] Global error boundary trong root layout
- [ ] Xử lý token expired: interceptor axios → tự refresh → retry request
- [ ] WS connection error: hiển thị banner "Đang kết nối lại..."

---

## Phase 9 — Deploy

- [ ] Tạo `.env.production` với URL production
- [ ] Push lên GitHub, connect Vercel
- [ ] Set environment variables trên Vercel dashboard
- [ ] Test build local: `npm run build` trước khi push
- [ ] Kiểm tra `wss://` (không phải `ws://`) trong production

---

## Notes

| Quyết định | Lý do |
|---|---|
| Axios thay vì fetch | Interceptor dễ hơn cho auth token + refresh |
| TanStack Query + WS | SC fetch initial data, TQ handle real-time updates |
| Cookie cho token | Middleware đọc được cookie (Edge Runtime không đọc localStorage) |
| Route Group `(auth)` / `(app)` | Layout riêng, không ảnh hưởng URL |
