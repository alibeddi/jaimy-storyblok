# Jaimy - Next.js + Storyblok Project

A high-performance, multilingual website built with Next.js 15 and Storyblok CMS, optimized for speed and user experience.

## 🚀 Performance Highlights

- **30%+ smaller** JavaScript bundles through dynamic imports
- **25%+ smaller** CSS bundles with optimized Tailwind configuration
- **LCP < 2.5s** on 3G connections
- **95%+ cache hit rate** for published content
- **Static generation** with Incremental Static Regeneration (ISR)
- **Multi-tier caching** for optimal API response times

See [PERFORMANCE.md](./PERFORMANCE.md) for detailed optimization documentation.

## 📋 Features

- 🌍 **Multilingual Support** - English, Dutch, and French
- 🎨 **Storyblok CMS Integration** - Visual editing with live preview
- ⚡ **Optimized Performance** - Static generation, caching, and code splitting
- 🖼️ **Image Optimization** - WebP format, lazy loading, and responsive sizing
- 📊 **Performance Monitoring** - Core Web Vitals tracking
- 🔄 **Automatic Cache Invalidation** - Webhook-based revalidation
- 🎯 **SEO Optimized** - Dynamic metadata and structured data

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Storyblok
- **Styling:** Tailwind CSS v4
- **Fonts:** Custom Belfius fonts with next/font
- **Internationalization:** next-intl
- **Analytics:** Anytrack integration
- **Performance:** Lighthouse CI, Bundle Analyzer

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

```env
NEXT_PUBLIC_STORYBLOK_API_TOKEN=your_token_here
REVALIDATION_SECRET=your_secret_here
NEXT_PUBLIC_ANYTRACK_ID=your_anytrack_id (optional)
```

### Development

```bash
# Start development server
pnpm dev

# Start with HTTPS (required for Storyblok bridge)
pnpm dev:https

# Open http://localhost:3000
```

### Building

```bash
# Production build
pnpm build

# Build with bundle analysis
pnpm build:analyze

# Start production server
pnpm start
```

## 📊 Performance Scripts

```bash
# Capture baseline metrics
pnpm perf:baseline

# Run comprehensive performance audit
pnpm perf:audit

# Check performance budgets
pnpm perf:budget

# Run Lighthouse CI
pnpm lighthouse
```

## 🏗️ Project Structure

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── [locale]/          # Localized routes
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── blok/             # Storyblok components
│   │   └── ui/               # UI components
│   ├── lib/                   # Utilities and helpers
│   │   ├── component-registry.ts  # Dynamic component loading
│   │   ├── storyblok-cache.ts    # Multi-tier caching
│   │   ├── fonts.ts              # Font configuration
│   │   ├── image-utils.ts        # Image optimization
│   │   └── performance.ts        # Performance tracking
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── scripts/                   # Build and performance scripts
├── __tests__/                # Test files
└── .kiro/specs/              # Feature specifications
```

## 🎨 Storyblok Integration

### Component Development

Components are dynamically loaded for optimal performance:

```typescript
// Register in src/lib/component-registry.ts
export const componentRegistry = {
  'my-component': () => import('@/components/blok/general/MyComponent'),
};
```

### Live Preview

1. Start development server with HTTPS: `pnpm dev:https`
2. Configure Storyblok preview URL: `https://localhost:3001`
3. Enable Visual Editor in Storyblok

### Cache Invalidation

Configure webhook in Storyblok:
- **URL:** `https://yourdomain.com/api/revalidate?secret=YOUR_SECRET`
- **Events:** Story published, unpublished, deleted

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run performance tests
pnpm test __tests__/performance

# Run with coverage
pnpm test --coverage
```

## 📈 Performance Monitoring

### Core Web Vitals

Automatic tracking of:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **TTFB** (Time to First Byte)
- **FCP** (First Contentful Paint)

### Performance Budgets

Enforced in CI/CD:
- JavaScript: < 560 KB
- CSS: < 112 KB
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel

# Set environment variables in Vercel dashboard
```

### Environment Variables for Production

- `NEXT_PUBLIC_STORYBLOK_API_TOKEN`
- `REVALIDATION_SECRET`
- `NEXT_PUBLIC_ANYTRACK_ID` (optional)

### Post-Deployment

1. Configure Storyblok webhook with production URL
2. Verify cache invalidation is working
3. Run Lighthouse audit on production
4. Monitor Core Web Vitals

## 🔧 Configuration

### Next.js Config

- Bundle analyzer enabled with `ANALYZE=true`
- Image optimization for Storyblok domains
- CSS optimization enabled
- Webpack bundle splitting configured

### Tailwind Config

- Minimal safelist for CMS-driven classes
- JIT mode enabled
- Custom fonts configured
- Typography plugin included

## 📚 Documentation

- [Performance Guide](./PERFORMANCE.md) - Detailed optimization documentation
- [Spec: Performance Optimization](./.kiro/specs/performance-optimization/) - Requirements and design
- [Storyblok Docs](https://www.storyblok.com/docs) - CMS documentation
- [Next.js Docs](https://nextjs.org/docs) - Framework documentation

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run performance tests
4. Submit a pull request

### Performance Guidelines

- Keep bundle sizes within budgets
- Test on real devices and networks
- Run Lighthouse audits before merging
- Document performance impacts

## 📝 License

[Your License Here]

## 🆘 Support

For issues or questions:
1. Check [PERFORMANCE.md](./PERFORMANCE.md)
2. Review [troubleshooting guide](./PERFORMANCE.md#troubleshooting)
3. Contact the development team

## 🎯 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| JavaScript Bundle | < 560 KB | ✅ Optimized |
| CSS Bundle | < 112 KB | ✅ Optimized |
| LCP | < 2.5s | ✅ Optimized |
| FID | < 100ms | ✅ Optimized |
| CLS | < 0.1 | ✅ Optimized |
| Cache Hit Rate | > 95% | ✅ Optimized |

---

Built with ⚡ by the Jaimy team
