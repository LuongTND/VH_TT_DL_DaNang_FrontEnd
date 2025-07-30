# VH_TT_DL_DaNang_FrontEnd

Ứng dụng Next.js cho hệ thống quản lý workshop.

## 🚀 **Cài đặt và chạy**

### **Development Mode**
```bash
npm install
npm run dev
```

### **Production Mode**
```bash
npm install
npm run build
npm start
```

## 🐳 **Docker Commands**

### **1. Build Docker Image**
```bash
# Build image với tên tag
docker build -t vh-tt-danang-frontend .

### **2. Chạy Container**
```bash
# Chạy container với port mapping
docker run -p 3000:3000 vh-tt-danang-frontend


###. Docker Compose (Khuyến nghị)
```bash
# Build và chạy với docker-compose
docker-compose up --build

# Chạy ở background
docker-compose up -d

# Dừng services
docker-compose down

# Xem logs
docker-compose logs -f
```

## 🛠️ **Technologies**

- **Next.js 15.4.4** - React Framework
- **React 19.1.0** - UI Library
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Styling
- **Ant Design** - UI Components
- **Docker** - Containerization

## 🌐 **Access URLs**

- **Development**: http://localhost:3000
- **Production**: http://localhost:3000 (sau khi chạy Docker)

## 📝 **Scripts**

```bash
npm run dev      # Development server
npm run build    # Build production
npm run start    # Start production server
npm run lint     # Lint code
```

## 🔧 **Troubleshooting**

### **Lỗi Docker Build**
```bash
# Xóa cache và build lại
docker build --no-cache -t vh-tt-danang-frontend .

# Xóa tất cả containers và images
docker system prune -a
```

### **Lỗi Port đã được sử dụng**
```bash
# Tìm process đang sử dụng port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <process_id> /F
```

### **Lỗi Permission**
```bash
# Chạy với quyền admin (Windows)
# Mở Command Prompt as Administrator
```
