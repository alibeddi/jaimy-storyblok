# 🎯 Performance Best Practices

## General Principles

### 1. Measure First, Optimize Second
```bash
# Always establish baseline
pnpm run perf:baseline

# Make changes
# ...

# Measure again
pnpm run perf:report
```

### 2. Focus on User Experience
- Optimize for perceived performance
- Prioritize above-the-fold content
- Use loading states effectively

### 3. Balance Complexity vs. Benefit
- Don't over-optimize
- Consider maintenance cost
- Keep code readable

---

## Next.js Specific

### Server vs. Client Components

**Use Server Components for:**
- Static content
- Data fetching
- SEO-critical content
- No interactivity

**Use Client Components for:**
- Interactive elements
- Browser APIs
- useState/useEffect
- Event handlers

```typescript
// ✅ Good: Server component
export default async function BlogPost({ slug }) {
  const post = await getPost(slug);
  return <article>{post.content}</article>;
}

// ✅ Good: Client component
"use client";
export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  return <button onClick={() => setLikes(likes + 1)}>❤️ {likes}</button>;
}
```

### Data Fetching

**✅ DO:**
```typescript
// Parallel fetching
const [posts, users] = await Promise.all([
  getPosts(),
  getUsers(),
]);

// Use SWR for client-side
const { data } = useData('/api/posts');

// Cache with revalidation
export const revalidate = 3600;
```

**❌ DON'T:**
```typescript
// Sequential fetching
const posts = await getPosts();
const users = await getUsers(); // Waits for posts

// Fetch in useEffect without caching
useEffect(() => {
  fetch('/api/posts').then(r => r.json());
}, []);
```

### Image Optimization

**✅ DO:**
```typescript
// Use Next/Image for local images
<Image
  src="/hero.jpg"
  width={1200}
  height={600}
  alt="Hero"
  priority // For above-fold
/>

// Use native img for Storyblok
<img
  src={storyblokUrl}
  loading="lazy"
  alt="..."
/>
```

**❌ DON'T:**
```typescript
// Don't use img for local images
<img src="/hero.jpg" /> // No optimization

// Don't use Next/Image for Storyblok
<Image src={storyblokUrl} /> // Causes issues
```

---

## React Performance

### Memoization

**✅ DO:**
```typescript
// Memo for expensive components
const ExpensiveComponent = memo(({ data }) => {
  return <div>{/* Complex rendering */}</div>;
});

// useMemo for expensive calculations
const sortedData = useMemo(
  () => data.sort((a, b) => a.value - b.value),
  [data]
);

// useCallback for callbacks passed to children
const handleClick = useCallback(() => {
  doSomething();
}, []);
```

**❌ DON'T:**
```typescript
// Don't memo everything
const SimpleComponent = memo(({ text }) => <div>{text}</div>);

// Don't useMemo for cheap operations
const doubled = useMemo(() => value * 2, [value]);

// Don't useCallback without deps
const handleClick = useCallback(() => {
  doSomething(value); // Missing value in deps
}, []);
```

### Component Structure

**✅ DO:**
```typescript
// Small, focused components
function UserCard({ user }) {
  return (
    <div>
      <UserAvatar user={user} />
      <UserInfo user={user} />
    </div>
  );
}

// Extract static content
const MENU_ITEMS = [/* ... */]; // Outside component

function Menu() {
  return MENU_ITEMS.map(item => <MenuItem key={item.id} {...item} />);
}
```

**❌ DON'T:**
```typescript
// Large, monolithic components
function UserDashboard() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  );
}

// Define data inside component
function Menu() {
  const items = [/* ... */]; // Recreated every render
  return items.map(item => <MenuItem {...item} />);
}
```

---

## Caching Strategies

### Multi-Layer Caching

```
Request → Memory Cache → Next.js Cache → CDN → Origin
```

**Implementation:**
```typescript
// 1. Memory cache (fastest)
const memoryCache = new Map();

// 2. Next.js cache
export const revalidate = 3600;

// 3. CDN cache
response.headers.set(
  'Cache-Control',
  'public, s-maxage=3600, stale-while-revalidate=86400'
);
```

### Cache Invalidation

**✅ DO:**
```typescript
// Use cache tags
revalidateTag('posts');

// Invalidate specific paths
revalidatePath('/blog/[slug]');

// Time-based revalidation
export const revalidate = 3600; // 1 hour
```

**❌ DON'T:**
```typescript
// Clear all cache
clearAllCache(); // Too aggressive

// No revalidation strategy
export const revalidate = false; // Never updates
```

---

## Bundle Optimization

### Code Splitting

**✅ DO:**
```typescript
// Dynamic imports for heavy components
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// Route-based splitting (automatic)
// pages/about.tsx → about.js chunk

// Library-level splitting
import { format } from 'date-fns/format';
```

**❌ DON'T:**
```typescript
// Import entire library
import _ from 'lodash';

// No code splitting for heavy components
import Chart from './Chart'; // Always loaded
```

### Dependency Management

**✅ DO:**
```bash
# Audit bundle size
ANALYZE=true pnpm build

# Check for duplicates
pnpm dedupe

# Remove unused deps
pnpm prune
```

**❌ DON'T:**
```bash
# Install without checking size
pnpm add huge-library

# Keep unused dependencies
# (Check package.json regularly)
```

---

## API Design

### Request Optimization

**✅ DO:**
```typescript
// Batch requests
const results = await batchRequest([
  { slug: 'home' },
  { slug: 'about' },
]);

// Parallel requests
const [data1, data2] = await Promise.all([
  fetch('/api/1'),
  fetch('/api/2'),
]);

// Request deduplication (SWR)
const { data } = useSWR('/api/data');
```

**❌ DON'T:**
```typescript
// Sequential requests
const data1 = await fetch('/api/1');
const data2 = await fetch('/api/2');

// No caching
fetch('/api/data').then(r => r.json());

// Multiple identical requests
fetch('/api/data');
fetch('/api/data'); // Duplicate
```

### Response Optimization

**✅ DO:**
```typescript
// Add cache headers
response.headers.set(
  'Cache-Control',
  'public, s-maxage=60, stale-while-revalidate=30'
);

// Compress responses
export default {
  compress: true,
};

// Return only needed data
return { id, title, excerpt }; // Not full object
```

**❌ DON'T:**
```typescript
// No cache headers
return NextResponse.json(data);

// Return everything
return fullObject; // Including unused fields
```

---

## Monitoring

### What to Track

**Essential Metrics:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)

**Custom Metrics:**
```typescript
// Track custom events
performance.mark('data-fetch-start');
await fetchData();
performance.mark('data-fetch-end');

performance.measure(
  'data-fetch',
  'data-fetch-start',
  'data-fetch-end'
);
```

### Performance Budgets

```json
{
  "budgets": [
    {
      "path": "/*",
      "timings": [
        { "metric": "first-contentful-paint", "budget": 2000 },
        { "metric": "largest-contentful-paint", "budget": 2500 }
      ],
      "resourceSizes": [
        { "resourceType": "script", "budget": 250 },
        { "resourceType": "total", "budget": 500 }
      ]
    }
  ]
}
```

---

## Common Pitfalls

### 1. Over-Optimization
```typescript
// ❌ Don't memo everything
const SimpleText = memo(({ text }) => <span>{text}</span>);

// ✅ Only memo expensive components
const ComplexChart = memo(({ data }) => {
  // Expensive rendering logic
});
```

### 2. Premature Optimization
```typescript
// ❌ Don't optimize before measuring
// "This might be slow, let me optimize"

// ✅ Measure first
// Run profiler → Identify bottleneck → Optimize
```

### 3. Ignoring User Experience
```typescript
// ❌ Optimize metrics at expense of UX
<Image loading="eager" /> // Everything loads immediately

// ✅ Balance performance and UX
<Image loading="lazy" priority={isAboveFold} />
```

### 4. Not Testing in Production
```bash
# ❌ Only test locally
pnpm dev

# ✅ Test production build
pnpm build && pnpm start
```

---

## Checklist

### Before Deploying
- [ ] Run production build
- [ ] Check bundle size
- [ ] Run Lighthouse audit
- [ ] Test on slow network
- [ ] Verify images load
- [ ] Check console for errors

### After Deploying
- [ ] Monitor Core Web Vitals
- [ ] Check error rates
- [ ] Verify cache hit rates
- [ ] Review user feedback
- [ ] Compare with baseline

### Regular Maintenance
- [ ] Weekly: Check metrics
- [ ] Monthly: Update dependencies
- [ ] Quarterly: Full audit
- [ ] Yearly: Major refactor

---

## Resources

### Tools
- Chrome DevTools
- Lighthouse
- WebPageTest
- Bundle Analyzer

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Web.dev](https://web.dev)

### Community
- Next.js Discord
- React Discord
- Stack Overflow

---

## Summary

**Key Takeaways:**

1. **Measure before optimizing**
2. **Focus on user experience**
3. **Use the right tool for the job**
4. **Keep it simple**
5. **Monitor continuously**

Your application is already highly optimized. Follow these best practices to maintain and improve it over time! 🚀
