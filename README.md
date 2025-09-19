# 🎬 Movie Booking App - Next Level Cinema Experience

<div align="center">

![Movie Booking App](https://img.shields.io/badge/Movie%20Booking-App-brightgreen?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.3.1-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.17-blue?style=for-the-badge&logo=tailwindcss)

**Experience the future of movie booking with our cutting-edge, feature-rich cinema management platform!**

[🚀 Live Demo](https://movie-booking-azure.vercel.app/) | [📖 Documentation](#) | [🐛 Report Bug](#) | [✨ Request Feature](#)

</div>

---

## 🌟 **What Makes This App Special?**

Transform your movie-going experience with our **next-level movie booking application** that combines stunning UI/UX, real-time features, and comprehensive admin capabilities. Built with modern technologies and designed for both users and administrators.

---

## ✨ **Key Features**

### 🔐 **Authentication & User Management**
- **Secure Login/Signup** with Supabase authentication
- **Protected Routes** for enhanced security
- **User Profile Management** with personalized settings
- **Role-based Access Control** (User/Admin)

### 🎭 **Movie Experience**
- **🎬 Movie Catalog** with stunning visual cards
- **⭐ User Reviews & Ratings** system
- **🎥 Movie Trailers** with embedded video players
- **🔍 Advanced Search & Filtering** by genre, rating, date
- **📱 Responsive Design** for all devices

### 🎫 **Booking System**
- **🎯 Real-time Seat Selection** with interactive seat map
- **🏢 Multi-Cinema Support** with location-based selection
- **⏰ Show Time Management** with date/time picker
- **💳 Secure Payment Integration** (ready for implementation)
- **📧 Instant E-ticket Generation** with QR codes

### 👨‍💼 **Admin Panel**
- **➕ Add New Movies** with comprehensive form
- **📊 Movie Management** with CRUD operations
- **📈 Analytics Dashboard** with Recharts visualization
- **👥 User Management** and booking oversight
- **📋 Booking Records** with detailed analytics
- **🎬 Content Management** for trailers and media

### 📊 **Analytics & Insights**
- **📈 Revenue Analytics** with interactive charts
- **📊 Booking Statistics** and trends
- **👥 User Engagement Metrics**
- **🎬 Movie Performance Data**
- **📱 Real-time Dashboard** updates

---

## 🛠️ **Tech Stack**

### **Frontend**
- **⚛️ React 18.3.1** - Modern UI library
- **🔷 TypeScript 5.8.3** - Type-safe development
- **🎨 Tailwind CSS 3.4.17** - Utility-first styling
- **🎭 Framer Motion** - Smooth animations
- **📊 Recharts** - Beautiful data visualization
- **🎯 React Hook Form** - Form management
- **🔍 React Query** - Data fetching & caching

### **Backend & Database**
- **🗄️ Supabase** - Backend-as-a-Service
- **🔐 Supabase Auth** - Authentication system
- **📊 PostgreSQL** - Database (via Supabase)
- **🔄 Real-time subscriptions**

### **UI Components**
- **🎨 Radix UI** - Accessible component primitives
- **🎭 Shadcn/ui** - Beautiful component library
- **🎨 Lucide React** - Icon library
- **📱 Responsive Design** - Mobile-first approach

### **Development Tools**
- **⚡ Vite** - Lightning-fast build tool
- **🔍 ESLint** - Code linting
- **🎨 PostCSS** - CSS processing
- **📦 NPM** - Package management

---

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+ 
- NPM or Yarn
- Supabase account

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-booking.git
   cd movie-booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

---

## 📱 **Screenshots**

<div align="center">

### 🏠 **Homepage**
![Homepage](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Stunning+Homepage+with+Movie+Carousel)

### 🎬 **Movie Details**
![Movie Details](https://via.placeholder.com/800x400/2d2d2d/ffffff?text=Movie+Details+with+Trailer+%26+Reviews)

### 🎫 **Seat Selection**
![Seat Selection](https://via.placeholder.com/800x400/3a3a3a/ffffff?text=Interactive+Seat+Selection+Map)

### 👨‍💼 **Admin Panel**
![Admin Panel](https://via.placeholder.com/800x400/4a4a4a/ffffff?text=Comprehensive+Admin+Dashboard)

</div>

---

## 🎯 **User Journey**

### **For Movie Lovers** 🍿
1. **Sign Up/Login** → Create your account
2. **Browse Movies** → Explore latest releases
3. **Watch Trailers** → Preview before booking
4. **Read Reviews** → See what others think
5. **Select Cinema** → Choose your location
6. **Pick Showtime** → Find perfect timing
7. **Choose Seats** → Interactive seat map
8. **Complete Booking** → Secure payment
9. **Get E-ticket** → Instant confirmation

### **For Administrators** 👨‍💼
1. **Access Admin Panel** → Secure admin login
2. **Add New Movies** → Upload movie details
3. **Manage Bookings** → View all reservations
4. **Analytics Dashboard** → Track performance
5. **User Management** → Monitor user activity
6. **Content Updates** → Manage trailers & media

---

## 🔧 **Project Structure**

```
movie-booking/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 admin/          # Admin-specific components
│   │   ├── 📁 movie/          # Movie-related components
│   │   └── 📁 ui/             # Base UI components
│   ├── 📁 pages/              # Application pages
│   ├── 📁 contexts/           # React contexts
│   ├── 📁 hooks/              # Custom React hooks
│   ├── 📁 lib/                # Utility functions
│   ├── 📁 types/              # TypeScript type definitions
│   └── 📁 integrations/       # External service integrations
├── 📁 public/                 # Static assets
├── 📁 supabase/              # Database schema & migrations
└── 📄 Configuration files
```

---

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Deep blues and cinematic blacks
- **Accent**: Golden yellows for highlights
- **Success**: Vibrant greens for confirmations
- **Warning**: Amber for alerts
- **Error**: Red for errors

### **Typography**
- **Headings**: Bold, cinematic fonts
- **Body**: Clean, readable sans-serif
- **Code**: Monospace for technical content

### **Components**
- **Cards**: Elevated with subtle shadows
- **Buttons**: Rounded with smooth transitions
- **Forms**: Clean inputs with validation
- **Modals**: Centered with backdrop blur

---

## 📊 **Features Breakdown**

### **🎬 Movie Management**
- ✅ Movie catalog with search & filter
- ✅ Movie details with trailers
- ✅ User reviews and ratings
- ✅ Genre-based categorization
- ✅ Release date tracking

### **🎫 Booking System**
- ✅ Real-time seat availability
- ✅ Interactive seat selection map
- ✅ Multiple cinema locations
- ✅ Showtime management
- ✅ Booking confirmation

### **👨‍💼 Admin Features**
- ✅ Add/edit/delete movies
- ✅ Booking management
- ✅ User analytics
- ✅ Revenue tracking
- ✅ Content management

### **📱 User Experience**
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Loading states
- ✅ Error handling
- ✅ Accessibility support

---

## 🔒 **Security Features**

- **🔐 JWT Authentication** via Supabase
- **🛡️ Protected Routes** for sensitive pages
- **🔒 Role-based Access Control**
- **🛡️ Input Validation** with Zod schemas
- **🔐 Secure API endpoints**

---

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

---

## 🤝 **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Supabase** for the amazing backend platform
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for the utility-first CSS framework
- **React Query** for efficient data fetching
- **Recharts** for beautiful data visualization

---

## 📞 **Support**

- **📧 Email**: support@moviebooking.com
- **💬 Discord**: [Join our community](#)
- **📖 Documentation**: [Full docs](#)
- **🐛 Bug Reports**: [GitHub Issues](#)

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by the Movie Booking Team

[⬆ Back to Top](#-movie-booking-app---next-level-cinema-experience)

</div>