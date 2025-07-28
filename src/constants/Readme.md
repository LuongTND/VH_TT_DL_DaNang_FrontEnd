# 📁 Constants

Thư mục này chứa các hằng số (constants) được sử dụng trong toàn bộ ứng dụng.

## 📋 Mục đích

- Định nghĩa các giá trị cố định không thay đổi trong quá trình chạy ứng dụng
- Tập trung quản lý các giá trị cấu hình
- Tránh hardcode các giá trị trong code
- Dễ dàng bảo trì và cập nhật

## 🎯 Các loại constants

### API Constants
```typescript
// Ví dụ: API endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
  COMMENTS: '/api/comments'
} as const;
```

### App Constants
```typescript
// Ví dụ: Cấu hình ứng dụng
export const APP_CONFIG = {
  NAME: 'Workshop FE',
  VERSION: '1.0.0',
  DESCRIPTION: 'Frontend Workshop Application'
} as const;
```

### UI Constants
```typescript
// Ví dụ: Các giá trị UI
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200
  },
  ANIMATION_DURATION: 300
} as const;
```

## 🚀 Sử dụng

```typescript
import { API_ENDPOINTS, APP_CONFIG } from '@/constants';

// Sử dụng trong components
const fetchUsers = async () => {
  const response = await fetch(API_ENDPOINTS.USERS);
  return response.json();
};
```

## 📝 Quy ước đặt tên

- Sử dụng UPPER_SNAKE_CASE cho tên constants
- Nhóm các constants liên quan vào cùng một object
- Sử dụng `as const` để đảm bảo type safety
- Thêm JSDoc comments cho các constants phức tạp
