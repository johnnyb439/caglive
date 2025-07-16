# Next.js Learning Guide - Day 1-2: Fundamentals

## Day 1: Getting Started with Next.js

### What is Next.js?
- React framework for production
- Built-in routing, optimizations, and server-side rendering
- Created by Vercel

### Installation & Setup
```bash
# Create a new Next.js app
npx create-next-app@latest my-app
cd my-app
npm run dev
```

### Project Structure
```
my-app/
├── pages/           # Route components
│   ├── index.js    # Home page (/)
│   ├── about.js    # About page (/about)
│   └── api/        # API routes
├── public/         # Static files
├── styles/         # CSS files
└── components/     # Reusable components
```

## Day 2: Routing & Navigation

### File-Based Routing
Create files in `pages/` directory to create routes:

```javascript
// pages/index.js → /
export default function Home() {
  return <h1>Welcome to my site</h1>
}

// pages/about.js → /about
export default function About() {
  return <h1>About Us</h1>
}

// pages/products/shoes.js → /products/shoes
export default function Shoes() {
  return <h1>Our Shoes</h1>
}
```

### Dynamic Routes
Use brackets for dynamic segments:

```javascript
// pages/posts/[id].js → /posts/1, /posts/2, etc.
import { useRouter } from 'next/router'

export default function Post() {
  const router = useRouter()
  const { id } = router.query
  
  return <h1>Post: {id}</h1>
}
```

### Navigation with Link
```javascript
import Link from 'next/link'

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/posts/1">First Post</Link>
    </nav>
  )
}
```

### Creating Components
```javascript
// components/Header.js
export default function Header() {
  return (
    <header>
      <h1>My Website</h1>
      <nav>...</nav>
    </header>
  )
}

// pages/index.js
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <Header />
      <main>Welcome!</main>
    </>
  )
}
```

## Practice Exercises

### Exercise 1: Basic Routes
1. Create a home page at `/`
2. Create an about page at `/about`
3. Create a contact page at `/contact`
4. Add navigation between all pages

### Exercise 2: Dynamic Routes
1. Create a blog post route `/blog/[slug]`
2. Display the slug parameter on the page
3. Create multiple links to different blog posts

### Exercise 3: Nested Routes
1. Create `/products` page
2. Create `/products/categories` page
3. Create `/products/[category]/[product]` dynamic route

### Common Errors to Watch For
- **404 Error**: File name doesn't match route
- **Module not found**: Wrong import path
- **Link error**: Using `<a>` instead of `<Link>`
- **Hydration error**: Server/client mismatch

## Next Steps
Tomorrow you'll learn about data fetching, API routes, and server-side rendering!