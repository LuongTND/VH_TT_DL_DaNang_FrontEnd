# 📁 Services

Thư mục này chứa các service classes và functions để xử lý business logic và tương tác với API.

## 📋 Mục đích

- Tách biệt business logic khỏi UI components
- Quản lý các API calls và data fetching
- Xử lý authentication và authorization
- Tạo các service classes cho các domain khác nhau

## 🎯 Các loại services

### API Service
```typescript
// Ví dụ: api-service.ts
class ApiService {
  private baseURL: string;
  private token: string | null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = null;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService(process.env.NEXT_PUBLIC_API_URL || '');
```

### Auth Service
```typescript
// Ví dụ: auth-service.ts
interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

class AuthService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await this.apiService.post<{ user: User; token: string }>(
      '/auth/login',
      credentials
    );
    
    this.apiService.setToken(response.token);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    return response;
  }

  async logout(): Promise<void> {
    try {
      await this.apiService.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.apiService.setToken('');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const user = await this.apiService.get<User>('/auth/me');
      return user;
    } catch (error) {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}

export const authService = new AuthService(apiService);
```

### User Service
```typescript
// Ví dụ: user-service.ts
interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

class UserService {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  async getUsers(): Promise<User[]> {
    return this.apiService.get<User[]>('/users');
  }

  async getUserById(id: number): Promise<User> {
    return this.apiService.get<User>(`/users/${id}`);
  }

  async createUser(data: CreateUserData): Promise<User> {
    return this.apiService.post<User>('/users', data);
  }

  async updateUser(id: number, data: UpdateUserData): Promise<User> {
    return this.apiService.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: number): Promise<void> {
    return this.apiService.delete<void>(`/users/${id}`);
  }
}

export const userService = new UserService(apiService);
```

## 🚀 Sử dụng

```typescript
import { authService, userService } from '@/services';

// Sử dụng trong components
const LoginComponent = () => {
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      // Xử lý login thành công
    } catch (error) {
      // Xử lý lỗi
    }
  };
};

const UserListComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);
};
```

## 📝 Quy ước đặt tên

- Sử dụng PascalCase cho class names
- Kết thúc tên service với `Service` (ví dụ: `AuthService`, `UserService`)
- Sử dụng camelCase cho method names
- Export service instances thay vì classes
- Sử dụng TypeScript interfaces cho data types

## 🔧 Best Practices

- Một service chỉ nên xử lý một domain cụ thể
- Sử dụng dependency injection khi cần thiết
- Xử lý error cases một cách rõ ràng
- Implement retry logic cho API calls quan trọng
- Sử dụng TypeScript strict mode
- Test services với unit tests và integration tests
