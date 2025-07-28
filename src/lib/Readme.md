# 📁 Lib

Thư mục này chứa các utility functions, helper functions và các thư viện hỗ trợ được sử dụng trong toàn bộ ứng dụng.

## 📋 Mục đích

- Cung cấp các utility functions tái sử dụng
- Tách biệt logic nghiệp vụ khỏi UI components
- Tạo các helper functions cho các tác vụ phổ biến
- Quản lý các thư viện bên thứ ba và cấu hình

## 🎯 Các loại utilities

### String Utilities
```typescript
// Ví dụ: string-utils.ts
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  return str.length > length ? str.slice(0, length) + '...' : str;
};

export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};
```

### Date Utilities
```typescript
// Ví dụ: date-utils.ts
export const formatDate = (date: Date, locale: string = 'vi-VN'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const getRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Vừa xong';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
  return `${Math.floor(diffInSeconds / 86400)} ngày trước`;
};
```

### Validation Utilities
```typescript
// Ví dụ: validation-utils.ts
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};
```

### Storage Utilities
```typescript
// Ví dụ: storage-utils.ts
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
  
  clear: (): void => {
    localStorage.clear();
  }
};
```

## 🚀 Sử dụng

```typescript
import { capitalize, formatDate, isValidEmail, storage } from '@/lib';

// Sử dụng trong components
const MyComponent = () => {
  const userName = capitalize('john doe'); // "John Doe"
  const formattedDate = formatDate(new Date()); // "15 tháng 12 năm 2024"
  const isValid = isValidEmail('user@example.com'); // true
  
  // Lưu và lấy dữ liệu từ localStorage
  storage.set('user', { id: 1, name: 'John' });
  const user = storage.get('user');
  
  return <div>...</div>;
};
```

## 📝 Quy ước đặt tên

- Sử dụng camelCase cho function names
- Nhóm các functions liên quan vào cùng một file
- Export functions riêng lẻ hoặc theo nhóm
- Sử dụng TypeScript types cho parameters và return values
- Thêm JSDoc comments cho functions phức tạp

## 🔧 Best Practices

- Một function chỉ nên làm một việc cụ thể
- Sử dụng pure functions khi có thể
- Xử lý error cases một cách rõ ràng
- Tối ưu performance cho các functions được gọi thường xuyên
- Test utilities với unit tests
- Sử dụng TypeScript strict mode
