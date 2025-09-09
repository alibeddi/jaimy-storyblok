# Storyblok Features Implementation

This document outlines the implementation of advanced Storyblok features in the new Jaimy project.

## 🚀 Features Implemented

### 1. Real-time Editing & Autosave

- **Bridge Mode**: Enabled for real-time editing between Storyblok and your application
- **Autosave**: Changes are automatically saved as you edit
- **Live Preview**: See changes immediately without publishing

### 2. Inline Editing

- **Direct Content Editing**: Click on any content block to edit directly
- **No Block Details Required**: Edit content without opening block details panel
- **Ajusto-style Experience**: Similar to Ajusto's inline editing capabilities

### 3. SEO Plugin

- **Robots Meta Tags**: Control indexing with options:
  - `index,follow` (default)
  - `noindex,nofollow`
  - `index,nofollow`
  - `noindex,follow`
- **Open Graph Tags**: Facebook/LinkedIn sharing optimization
- **Twitter Cards**: Twitter sharing optimization
- **Canonical URLs**: Prevent duplicate content issues
- **Keywords**: Meta keywords for SEO

### 4. Template Page

- **Component Showcase**: Displays all available components
- **Development Testing**: Easy testing environment for new components
- **Visual Component Guide**: See how each component renders

## 📁 File Structure

```
src/
├── components/
│   ├── StoryblokProvider.tsx     # Main provider with bridge enabled
│   └── blok/
│       ├── general/
│       │   └── SEO/
│       │       └── index.tsx     # SEO component
│       └── services/
│           └── Page.tsx          # Updated page component
├── app/
│   └── [locale]/
│       ├── [...slug]/
│       │   └── page.tsx         # Main page with SEO metadata
│       └── template/
│           ├── page.tsx         # Template page component
│           └── [...slug]/
│               └── page.tsx     # Template dynamic route
└── types/
    └── storyblok.ts             # Updated types with SEO support
```

## 🔧 Configuration

### StoryblokProvider Setup

```typescript
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  bridge: true, // Enables real-time editing
  components: {
    // All your components including SEO
    seo: SEO,
  },
});
```

### SEO Component Usage

```typescript
// In Storyblok CMS, add SEO component to pages
{
  "component": "seo",
  "title": "Page Title",
  "description": "Page description",
  "robots": "index,follow",
  "og_title": "Open Graph Title",
  "og_description": "Open Graph Description",
  "og_image": {
    "filename": "https://example.com/image.jpg"
  },
  "twitter_title": "Twitter Title",
  "twitter_description": "Twitter Description",
  "canonical_url": "https://example.com/page"
}
```

## 🎯 How to Use

### 1. Enable Real-time Editing

1. Make sure `bridge: true` is set in StoryblokProvider
2. Access your site in Storyblok preview mode
3. Edit content directly in the preview
4. Changes are automatically saved

### 2. Use SEO Plugin

1. In Storyblok, add SEO component to your pages
2. Configure:
   - **Title**: Page title for search engines
   - **Description**: Meta description
   - **Robots**: Choose indexing behavior
   - **Open Graph**: Social media sharing
   - **Twitter Cards**: Twitter sharing
   - **Canonical URL**: Prevent duplicate content

### 3. Access Template Page

1. Navigate to `/template` in your application
2. Add components in Storyblok to see them rendered
3. Test different component configurations
4. Use for development and testing

### 4. Inline Editing

1. Open Storyblok preview mode
2. Click directly on any text content
3. Edit inline without opening block details
4. Changes save automatically

## 🔍 SEO Options

### Robots Meta Tag Options

- `index,follow` - Allow indexing and following links (default)
- `noindex,nofollow` - Prevent indexing and following links
- `index,nofollow` - Allow indexing but don't follow links
- `noindex,follow` - Prevent indexing but follow links

### Social Media Optimization

- **Open Graph**: Optimized for Facebook, LinkedIn
- **Twitter Cards**: Optimized for Twitter sharing
- **Images**: Separate images for different platforms

## 🛠️ Development Workflow

### 1. Component Development

1. Create new component in `src/components/blok/`
2. Add to StoryblokProvider components list
3. Test on template page (`/template`)
4. Add to Storyblok CMS schema

### 2. SEO Testing

1. Add SEO component to pages in Storyblok
2. Configure different robots options
3. Test with social media debugging tools
4. Verify meta tags in browser dev tools

### 3. Real-time Editing Testing

1. Enable draft mode in Storyblok
2. Make changes in preview
3. Verify autosave functionality
4. Test inline editing capabilities

## 🚨 Important Notes

### Environment Variables

Make sure these are set in your `.env.local`:

```
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_storyblok_token
```

### Template Pages

- Template pages are set to `noindex,nofollow` by default
- Use for development and testing only
- Don't use in production content

### SEO Best Practices

- Always set a unique title for each page
- Keep descriptions under 160 characters
- Use relevant keywords naturally
- Test social media sharing with debugging tools

## 🔗 Useful Links

- [Storyblok Bridge Documentation](https://www.storyblok.com/docs/guide/essentials/visual-editor)
- [Storyblok SEO Plugin](https://www.storyblok.com/docs/plugins/seo-plugin)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 📝 Next Steps

1. **Content Migration**: Migrate content from old project to new structure
2. **Component Enhancement**: Add more interactive components
3. **Performance Optimization**: Implement lazy loading for components
4. **Analytics Integration**: Add tracking for content interactions
5. **A/B Testing**: Implement content variation testing

