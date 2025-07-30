# 📁 Layouts

Thư mục này chứa các layout components được sử dụng để tạo cấu trúc chung cho các trang trong ứng dụng.

## 📋 Mục đích

- Tạo cấu trúc layout nhất quán cho toàn bộ ứng dụng
- Tái sử dụng các thành phần UI chung như header, footer, sidebar
- Tách biệt logic layout khỏi business logic
- Dễ dàng thay đổi layout mà không ảnh hưởng đến components

## 🎯 Các loại layouts

### Main Layout
```typescript
// Ví dụ: MainLayout.tsx
interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export const MainLayout = ({ children, title }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
};
```

### Dashboard Layout
```typescript
// Ví dụ: DashboardLayout.tsx
interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebarItems?: SidebarItem[];
}

export const DashboardLayout = ({ children, sidebarItems }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar items={sidebarItems} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
```

### Auth Layout
```typescript
// Ví dụ: AuthLayout.tsx
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
```

## 🚀 Sử dụng

```typescript
import { MainLayout, DashboardLayout, AuthLayout } from '@/layouts';

// Sử dụng trong pages
const HomePage = () => {
  return (
    <MainLayout title="Trang chủ">
      <div>Nội dung trang chủ</div>
    </MainLayout>
  );
};

const DashboardPage = () => {
  return (
    <DashboardLayout>
      <div>Nội dung dashboard</div>
    </DashboardLayout>
  );
};



## 📝 Quy ước đặt tên

- Sử dụng PascalCase cho tên layout components
- Kết thúc tên với `Layout` (ví dụ: `MainLayout`, `DashboardLayout`)
- Export layouts riêng lẻ hoặc theo nhóm
- Sử dụng TypeScript interfaces cho props
- Thêm JSDoc comments cho layouts phức tạp

## 🔧 Best Practices

- Layouts nên nhận `children` prop để render nội dung
- Sử dụng semantic HTML elements
- Responsive design với Tailwind CSS
- Tối ưu performance với React.memo khi cần thiết
- Accessibility (ARIA labels, keyboard navigation)
- Consistent spacing và typography
