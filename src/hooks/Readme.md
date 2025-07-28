# 📁 Hooks

Thư mục này chứa các custom React hooks được tái sử dụng trong ứng dụng.

## 📋 Mục đích

- Tách logic nghiệp vụ ra khỏi components
- Tái sử dụng logic giữa các components
- Tăng tính modular và maintainability
- Tuân thủ nguyên tắc DRY (Don't Repeat Yourself)

## 🎯 Các loại hooks

### State Management Hooks
```typescript
// Ví dụ: useLocalStorage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};
```

### API Hooks
```typescript
// Ví dụ: useApi
export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

### UI Hooks
```typescript
// Ví dụ: useMediaQuery
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
```

## 🚀 Sử dụng

```typescript
import { useLocalStorage, useApi, useMediaQuery } from '@/hooks';

// Trong component
const MyComponent = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const { data, loading, error } = useApi('/api/users');
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Component logic...
};
```

## 📝 Quy ước đặt tên

- Bắt đầu với `use` cho tất cả custom hooks
- Sử dụng camelCase cho tên hooks
- Export hooks riêng lẻ hoặc theo nhóm
- Thêm TypeScript types cho parameters và return values
- Viết JSDoc comments cho hooks phức tạp

## 🔧 Best Practices

- Một hook chỉ nên làm một việc cụ thể
- Sử dụng `useCallback` và `useMemo` khi cần thiết
- Cleanup effects trong `useEffect` return function
- Xử lý error states một cách rõ ràng
- Test hooks với `@testing-library/react-hooks`
