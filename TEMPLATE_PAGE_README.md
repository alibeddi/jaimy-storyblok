# Template Page Guide

## Overview

The template page is a development tool that showcases all available Storyblok components in one place. It's designed to help developers and content creators test and visualize components without affecting production content.

## 🎯 Purpose

- **Component Testing**: Test new components before adding to production
- **Visual Reference**: See how all components render together
- **Development Workflow**: Streamline the component development process
- **Content Preview**: Preview content changes in a controlled environment

## 🚀 How to Access

### URL Structure

```
/template                    # Main template page
/template/[slug]            # Dynamic template pages
```

### Example URLs

- `http://localhost:3001/template` - Main template
- `http://localhost:3001/template/homepage` - Specific template
- `http://localhost:3001/template/landing-page` - Custom template

## 📋 Available Components

### Service Components

- **Hero** - Main hero section with headlines and CTAs
- **Header** - Navigation and branding
- **Footer** - Site footer with links and info
- **Steps** - Step-by-step process display
- **Reviews** - Customer testimonials and ratings
- **Blogs** - Blog post listings
- **FAQ** - Frequently asked questions
- **Social Proof** - Trust indicators and logos
- **Features** - Feature highlights
- **Slider** - Content carousel

### General Components

- **SEO** - Search engine optimization settings
- **Iframe** - Embedded content (forms, videos)
- **Inline Text** - Direct editable text content

## 🛠️ How to Use

### 1. Add Components in Storyblok

1. Go to your Storyblok dashboard
2. Create a new story or use existing template
3. Add components to the body field
4. Configure component settings
5. Save and preview

### 2. View on Template Page

1. Navigate to `/template` in your application
2. See all components rendered with labels
3. Test responsive behavior
4. Check component interactions

### 3. Component Development Workflow

```bash
# 1. Create new component
touch src/components/blok/general/NewComponent/index.tsx

# 2. Add to StoryblokProvider
# Edit src/components/StoryblokProvider.tsx

# 3. Test on template page
# Navigate to /template

# 4. Add to Storyblok schema
# Configure in Storyblok CMS
```

## 🎨 Template Page Features

### Visual Indicators

- **Component Labels**: Each component shows its name and UID
- **Styled Containers**: Components are wrapped in styled containers
- **Responsive Design**: Test on different screen sizes
- **Error Handling**: Graceful fallbacks for missing content

### Development Tools

- **Component Inspector**: See component structure
- **Live Preview**: Real-time updates from Storyblok
- **Debug Information**: Component metadata display

## 📱 Responsive Testing

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Testing Checklist

- [ ] Mobile layout looks good
- [ ] Tablet layout is optimized
- [ ] Desktop layout is perfect
- [ ] Touch interactions work
- [ ] Keyboard navigation works

## 🔧 Configuration

### Environment Setup

```bash
# Make sure these are set
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_token
NODE_ENV=development
```

### Storyblok Settings

- **Bridge Mode**: Enabled for real-time editing
- **Draft Mode**: Access to unpublished content
- **Component Registry**: All components registered

## 🚨 Important Notes

### SEO Settings

- Template pages are set to `noindex,nofollow`
- Not meant for production use
- Won't appear in search results

### Performance

- Template pages load all components
- May be slower than regular pages
- Use for development only

### Security

- Template pages are public
- Don't include sensitive data
- Use dummy content for testing

## 🔍 Troubleshooting

### Common Issues

#### Components Not Showing

1. Check StoryblokProvider registration
2. Verify component import path
3. Ensure component is added to story body

#### Styling Issues

1. Check Tailwind classes
2. Verify responsive breakpoints
3. Test in different browsers

#### Real-time Updates Not Working

1. Check bridge mode is enabled
2. Verify access token
3. Ensure draft mode is active

### Debug Tools

```javascript
// Add to component for debugging
console.log("Component props:", blok);
console.log("Component type:", blok.component);
```

## 📝 Best Practices

### Component Development

1. **Start Simple**: Begin with basic functionality
2. **Test Thoroughly**: Use template page for testing
3. **Document**: Add comments and documentation
4. **Optimize**: Ensure good performance

### Content Management

1. **Use Dummy Data**: Don't use real content in templates
2. **Test Variations**: Try different content scenarios
3. **Validate**: Check for errors and edge cases

### Workflow

1. **Plan**: Design component structure
2. **Build**: Create component code
3. **Test**: Use template page
4. **Deploy**: Add to production

## 🔗 Related Files

- `src/app/[locale]/template/page.tsx` - Template page component
- `src/app/[locale]/template/[...slug]/page.tsx` - Dynamic template route
- `src/components/StoryblokProvider.tsx` - Component registry
- `src/types/storyblok.ts` - Type definitions

## 📚 Additional Resources

- [Storyblok Component Development](https://www.storyblok.com/docs/guide/essentials/visual-editor)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)



