# 🧩 Workshop Booking Frontend (Next.js + App Router + Kiến trúc sạch)

Dự án giao diện frontend sử dụng **Next.js 14 (App Router)**, kết hợp với **TailwindCSS**, viết bằng **TypeScript**, tổ chức theo mô hình **kiến trúc module sạch (clean structure)**.

Phù hợp để phát triển các hệ thống đặt lịch, đăng ký workshop, dashboard quản trị hoặc các ứng dụng SaaS hiện đại.

---

## 📦 Công nghệ sử dụng

- ✅ **Next.js 14** (App Router, TypeScript, Server/Client Components)
- ✅ **TailwindCSS** – thiết kế giao diện linh hoạt
- ✅ **Kiến trúc module sạch** – dễ scale, dễ bảo trì
- ✅ **Hỗ trợ gọi API với Axios hoặc Fetch**
- ✅ **Component & Hook tái sử dụng**
- ✅ Hỗ trợ mở rộng thêm: `react-hook-form`, `zod`, `shadcn/ui`, `SWR`, `react-query`...

---

## 📁 Cấu trúc thư mục

src/
├── app/ # Router chính theo App Router
│ ├── layout.tsx # Layout tổng
│ ├── page.tsx # Trang chủ
│ └── booking/ # Trang booking
├── components/ # Các UI component tái sử dụng
├── constants/ # Hằng số toàn cục, enum,...
├── hooks/ # Custom React Hooks
├── layouts/ # Các layout dùng riêng (admin, auth, ...)
├── lib/ # Hàm tiện ích (utils)
├── services/ # Giao tiếp backend (axios, fetch)
├── styles/ # TailwindCSS & global.css
├── types/ # Định nghĩa kiểu dữ liệu (interface, type)


---

## 🚀 Khởi động dự án

```bash
# Cài đặt thư viện
npm install

# Chạy chế độ development
npm run dev

# Build production
npm run build
Sau đó truy cập tại: http://localhost:3000


⚙️ Biến môi trường .env.local
Tạo file .env.local tại thư mục gốc với nội dung:

env
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:3001/api
Dùng để định nghĩa URL gọi đến backend NestJS.

Phát triển bởi ❤️ Vantu.dev
