# Curated Essentials - E-Commerce Platform

A modern, full-featured e-commerce application built with Next.js 16, React 19, and Redux Toolkit.

## 🚀 Features

### Core Routes

- **Home (`/`)** - Landing page with hero section, featured products, popular categories, benefits showcase, and CTAs
- **Product Listing (`/products`)** - Full catalog with search, category filtering, price range filtering, sorting, and responsive grid
- **Product Detail (`/products/[id]`)** - Individual product pages with dynamic metadata, image gallery, specifications, reviews, and related products
- **Shopping Cart (`/cart`)** - Dedicated cart page with item management, quantity controls, pricing summary, and free shipping indicator
- **Checkout (`/login`)** - Authentication page with DummyJSON API integration and guest access option
- **About Us (`/about`)** - Company information, mission, vision, values, team, and why customers choose us
- **Contact Us (`/contact`)** - Contact form with validation, contact information, and FAQ section

### E-Commerce Features

✅ **Product Management**
- Browse 1000+ products from DummyJSON API
- Advanced filtering (category, price range, rating)
- Full-text search across product catalog
- Dynamic sorting (price, rating, alphabetical)
- Related products recommendations
- Product specifications and customer reviews

✅ **Shopping Cart**
- Add/remove items with quantity management
- Real-time price calculations with discounts
- Free shipping threshold indicator ($150+)
- Cart persistence via Redux
- Simulated checkout flow

✅ **User Authentication**
- DummyJSON API authentication
- Demo credentials for testing
- Guest user access option
- Session management with Redux

✅ **SEO & Performance**
- Dynamic metadata for all pages
- Open Graph tags for social sharing
- Static site generation (SSG) with revalidation
- Image optimization
- Server-side rendering with Suspense boundaries

✅ **UI/UX**
- Responsive design (mobile, tablet, desktop)
- Skeleton loading states
- Error and empty states
- Toast notifications
- Smooth animations with Motion
- Professional Tailwind CSS styling

## 🛠 Tech Stack

- **Framework**: Next.js 16.2.9 (App Router)
- **UI Library**: React 19.0.1 (Server + Client Components)
- **State Management**: Redux Toolkit 2.12.0
- **Styling**: Tailwind CSS 4.1.14 with @tailwindcss/postcss
- **Icons**: Lucide React 0.546.0
- **Animations**: Motion 12.23.24
- **Data Source**: DummyJSON API (with local fallback)
- **Language**: TypeScript 5.8.2
- **Build Tool**: Turbopack (Next.js)

## 📋 Prerequisites

- Node.js 18+ (npm or yarn)
- Modern web browser

## 🏃 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### 3. Build for Production

```bash
npm run build
npm start
```

### 4. Lint & Type Check

```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── cart/
│   │   └── page.tsx            # Shopping cart page
│   ├── login/
│   │   └── page.tsx            # Authentication page
│   ├── about/
│   │   └── page.tsx            # About us page
│   ├── contact/
│   │   ├── page.tsx            # Contact page
│   │   └── ContactForm.tsx      # Contact form component
│   ├── products/
│   │   ├── page.tsx            # Product listing
│   │   ├── CatalogClient.tsx    # Client-side catalog UI
│   │   └── [id]/
│   │       ├── page.tsx        # Product detail page
│   │       └── ProductDetailClient.tsx  # Product detail UI
│   ├── providers.tsx            # Redux provider setup
│   └── ClientLayoutWrapper.tsx  # Client layout with header
├── components/
│   ├── CartDrawer.tsx           # Sliding cart drawer
│   ├── AuthModal.tsx            # Authentication modal
│   ├── HeroSearch.tsx           # Hero section search
│   ├── SkeletonLoaders.tsx      # Loading state skeletons
├── services/
│   └── product.service.ts       # API integration layer
├── store/
│   ├── index.ts                 # Redux store configuration
│   ├── hooks.ts                 # Custom Redux hooks
│   └── slices/
│       ├── authSlice.ts         # Authentication state
│       └── cartSlice.ts         # Shopping cart state
├── types.ts                      # TypeScript type definitions
├── index.css                     # Global styles
```

## 🔑 Key Features Implementation

### Search & Filtering
- Real-time product search across title and description
- Category-based filtering with URL persistence
- Price range slider filtering
- Rating-based filtering
- Multi-sort options (price, rating, name)

### Redux State Management
- **authSlice**: Login state, user data, error handling
- **cartSlice**: Cart items, open/close state, quantity management

### Data Layer
- DummyJSON API integration for 1000+ real products
- Local fallback data (6 categories, 9 sample products) when API unavailable
- Service layer with error handling and retry logic

### Performance Optimizations
- Server-side rendering for core pages
- Static generation with hourly revalidation
- Suspense boundaries with skeleton loaders
- Image optimization with referrer policy
- CSS-in-JS with Tailwind for minimal bundle size

## 🎨 Design Highlights

- **Color Scheme**: Dark (slate-900) accents with clean white backgrounds
- **Typography**: Clear hierarchy with bold headings and readable body text
- **Spacing**: Generous padding and margins for breathability
- **Components**: Rounded corners (xl), subtle borders, shadow elevations
- **Responsive**: Mobile-first approach with tailored breakpoints

## 📊 Sample Data

The app includes fallback data for testing without API:

**Products**: 9 sample items across:
- Beauty & Care
- Fragrances
- Electronics (Laptops, Smartphones)
- Home & Furniture
- Groceries & Food

**Categories**: 6 major categories with full product coverage

## 🔐 Authentication

### Test Credentials (DummyJSON API)
- **User 1**: `emilys` / `emilyspass`
- **User 2**: `michaelw` / `michaelwpass`

Guest access is also available for browsing without login.

## 📱 Responsive Design

- **Mobile**: Full-width layouts, touch-friendly buttons, collapsed navigation
- **Tablet**: 2-column grids, optimized spacing
- **Desktop**: 3-4 column grids, sidebar filters, full navigation

## 🚀 Deployment

The app is optimized for deployment on Vercel:

```bash
vercel
```

Or any Node.js hosting platform using:

```bash
npm run build
npm start
```

## 📝 Environment Variables

Create a `.env.local` file (optional):

```
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

## 🐛 Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Port 3000 in Use
```bash
npm run dev -- -p 3001
```

### API Connection Issues
The app automatically uses local fallback data when DummyJSON API is unavailable.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Support

For issues or questions, please contact: support@curatedessentials.com

---

**Built with ❤️ using Next.js, React, and TypeScript**
