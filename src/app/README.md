# 📁 App Directory

Thư mục này chứa các file cấu hình và component chính của ứng dụng Next.js sử dụng App Router.

## 📋 Cấu trúc

- `layout.tsx` - Layout chính của ứng dụng, định nghĩa cấu trúc HTML và metadata
- `page.tsx` - Trang chủ (Home page) của ứng dụng
- `globals.css` - File CSS toàn cục với Tailwind CSS

## 🎯 Chức năng

### Layout (`layout.tsx`)
- Cấu hình font Geist Sans và Geist Mono từ Google Fonts
- Thiết lập metadata cho SEO
- Định nghĩa cấu trúc HTML cơ bản với ngôn ngữ tiếng Việt
- Áp dụng Tailwind CSS classes cho styling

### Page (`page.tsx`)
- Trang chủ với gradient background
- Hiển thị "Hello Page" với styling responsive
- Sử dụng Flexbox để căn giữa nội dung

### Styles (`globals.css`)
- Import Tailwind CSS directives
- Định nghĩa các style toàn cục cho ứng dụng

## 🚀 Sử dụng

Đây là thư mục gốc của App Router trong Next.js 13+. Tất cả các route và page sẽ được tổ chức trong thư mục này theo cấu trúc file-based routing. 