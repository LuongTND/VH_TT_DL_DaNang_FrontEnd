# 📁 Styles

Thư mục này chứa các file CSS, SCSS, và styling configurations cho ứng dụng.

## 📋 Mục đích

- Quản lý tất cả styles và styling configurations
- Tạo các CSS modules và styled components
- Định nghĩa design system và theme
- Tổ chức responsive design và animations

## 🎯 Các loại styles

### Global Styles
```css
/* Ví dụ: globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom CSS Variables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #64748b;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  --font-family-sans: 'Geist', system-ui, sans-serif;
  --font-family-mono: 'Geist Mono', monospace;
  
  --border-radius: 0.375rem;
  --transition-duration: 0.2s;
}

/* Base styles */
* {
  box-sizing: border-box;
}

body {
  font-family: var(--font-family-sans);
  line-height: 1.6;
  color: #1f2937;
  background-color: #ffffff;
}

/* Custom utility classes */
@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6 border border-gray-200;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  }
}
```

### Component Styles
```css
/* Ví dụ: components.css */
/* Button variants */
.btn {
  @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200;
}

.btn-sm {
  @apply px-3 py-1.5 text-xs;
}

.btn-lg {
  @apply px-6 py-3 text-base;
}

/* Form styles */
.form-group {
  @apply mb-4;
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-error {
  @apply text-sm text-red-600 mt-1;
}

/* Layout utilities */
.container-fluid {
  @apply w-full px-4 mx-auto;
}

.container-sm {
  @apply max-w-3xl mx-auto px-4;
}

.container-md {
  @apply max-w-5xl mx-auto px-4;
}

.container-lg {
  @apply max-w-7xl mx-auto px-4;
}
```

### Animation Styles
```css
/* Ví dụ: animations.css */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Animation utility classes */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}
```

### Theme Configuration
```typescript
// Ví dụ: theme.ts
export const theme = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      900: '#1e3a8a',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      900: '#111827',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  typography: {
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
} as const;
```

## 🚀 Sử dụng

```typescript
// Import styles trong components
import '@/styles/globals.css';
import '@/styles/components.css';
import '@/styles/animations.css';

// Sử dụng trong JSX
const MyComponent = () => {
  return (
    <div className="card animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Tiêu đề</h2>
      <button className="btn btn-primary hover-lift">
        Nút bấm
      </button>
    </div>
  );
};
```

## 📝 Quy ước đặt tên

- Sử dụng kebab-case cho file names
- Nhóm styles theo chức năng (globals, components, animations)
- Sử dụng BEM methodology khi cần thiết
- Tạo utility classes với Tailwind CSS
- Sử dụng CSS custom properties cho theme values

## 🔧 Best Practices

- Sử dụng Tailwind CSS cho styling chính
- Tạo custom utility classes cho patterns thường dùng
- Sử dụng CSS custom properties cho theme values
- Implement responsive design với mobile-first approach
- Tối ưu CSS bundle size
- Sử dụng CSS modules cho component-specific styles
- Test styles trên nhiều browsers và devices
