# 📁 Types

Thư mục này chứa các TypeScript type definitions, interfaces, và type utilities được sử dụng trong toàn bộ ứng dụng.

## 📋 Mục đích

- Định nghĩa các types và interfaces cho ứng dụng
- Tạo type safety cho data structures
- Tái sử dụng types giữa các components và services
- Cung cấp IntelliSense và autocomplete tốt hơn

## 🎯 Các loại types

### API Types
```typescript
// Ví dụ: api-types.ts
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, any>;
}
```

### User Types
```typescript
// Ví dụ: user-types.ts
export interface User {
  id: number;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended'
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  role?: UserRole;
  status?: UserStatus;
}
```

### Form Types
```typescript
// Ví dụ: form-types.ts
export interface FormField<T = any> {
  name: string;
  value: T;
  error?: string;
  touched: boolean;
  required?: boolean;
}

export interface FormState<T = Record<string, any>> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

export type ValidationRule<T = any> = (value: T) => string | undefined;

export interface ValidationSchema<T = Record<string, any>> {
  [K in keyof T]?: ValidationRule<T[K]>[];
}
```

### Component Types
```typescript
// Ví dụ: component-types.ts
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
```

### Utility Types
```typescript
// Ví dụ: utility-types.ts
// Make all properties optional
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties required
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Pick specific properties
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Omit specific properties
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// Make specific properties optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Extract the type of a Promise
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// Extract the type of an array
export type ArrayElement<T> = T extends Array<infer U> ? U : never;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

## 🚀 Sử dụng

```typescript
import { User, UserRole, ApiResponse, ButtonProps } from '@/types';

// Sử dụng trong components
const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <span>{user.role}</span>
    </div>
  );
};

// Sử dụng trong services
const fetchUsers = async (): Promise<ApiResponse<User[]>> => {
  const response = await fetch('/api/users');
  return response.json();
};

// Sử dụng trong forms
const handleSubmit = async (data: CreateUserRequest) => {
  try {
    const response = await createUser(data);
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## 📝 Quy ước đặt tên

- Sử dụng PascalCase cho interface và type names
- Sử dụng UPPER_SNAKE_CASE cho enum values
- Kết thúc tên interface với mô tả (ví dụ: `UserProps`, `ApiResponse`)
- Sử dụng `Request` suffix cho API request types
- Sử dụng `Response` suffix cho API response types
- Nhóm related types vào cùng một file

## 🔧 Best Practices

- Sử dụng strict TypeScript configuration
- Tạo reusable types cho common patterns
- Sử dụng union types cho finite sets of values
- Implement proper error handling types
- Sử dụng generic types cho flexible components
- Document complex types với JSDoc comments
- Test types với TypeScript compiler
- Sử dụng branded types cho type safety
