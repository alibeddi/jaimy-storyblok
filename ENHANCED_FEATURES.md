# Enhanced Storyblok Features

This document outlines the enhanced features implemented for the Jaimy Storyblok project.

## 🚀 New Features Implemented

### 1. Autosave Functionality

- **Automatic saving**: Content is automatically saved every 2 seconds when editing
- **Debounced saving**: Prevents excessive API calls during rapid typing
- **Visual feedback**: Users see immediate feedback when content is being saved

### 2. Real-time Preview Without Publishing

- **Live editing**: See changes immediately without needing to publish
- **Draft mode**: All changes are saved as drafts automatically
- **Instant updates**: Content updates in real-time as you type
- **Bridge reconnection**: Automatic reconnection if bridge connection is lost

### 3. Inline Editing (Like Ajusto)

- **Click to edit**: Click directly on content to edit it inline
- **Visual indicators**: Hover effects show editable areas
- **Keyboard shortcuts**:
  - `Enter` to save changes
  - `Escape` to cancel editing
- **Enhanced components**: Heading and text components support inline editing

### 4. Comprehensive Template Page

- **All components**: Showcases every available Storyblok component
- **Organized sections**: Components grouped by category (Service, General, Analytics, SEO)
- **Visual indicators**: Each component shows its type and UID
- **Testing environment**: Perfect for testing new components and features

### 5. Enhanced SEO Plugin

- **NoIndex/NoFollow options**: Full control over search engine indexing
- **Additional options**:
  - `noindex` - Don't index this page
  - `nofollow` - Don't follow links on this page
  - `noindex,nofollow` - Don't index or follow
  - `index,nofollow` - Index but don't follow links
  - `noindex,follow` - Don't index but follow links
- **Complete SEO control**: Title, description, keywords, Open Graph, Twitter cards

## 🔧 Technical Implementation

### Bridge Configuration

```typescript
// Enhanced bridge with real-time updates
storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  bridge: true,
  apiOptions: {
    region: "eu",
    cache: {
      clear: "auto",
      type: "memory",
    },
  },
});
```

### Autosave Implementation

```typescript
// Debounced autosave
window.storyblok.on("input", (payload) => {
  if (payload.action === "input") {
    const timeoutId = setTimeout(() => {
      window.storyblok.saveDraft();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }
});
```

### Inline Editing

```typescript
// Click to edit functionality
const handleClick = () => {
  if (typeof window !== "undefined" && window.storyblok) {
    setIsEditing(true);
  }
};
```

## 📁 File Structure

```
src/
├── components/
│   ├── StoryblokProvider.tsx          # Enhanced provider with bridge config
│   ├── StoryblokBridge.tsx            # Dedicated bridge management
│   └── blok/
│       ├── general/
│       │   ├── Heading/Heading.tsx    # Enhanced with inline editing
│       │   ├── SEO/index.tsx          # Enhanced SEO options
│       │   └── InlineEditableText/    # New inline editing component
│       └── services/
├── app/[locale]/
│   ├── template/page.tsx              # Comprehensive template page
│   └── [...slug]/page.tsx            # Enhanced metadata generation
└── types/
    └── storyblok-bridge.ts           # TypeScript declarations
```

## 🎯 Usage Instructions

### 1. Enable Autosave

- Content automatically saves every 2 seconds
- No additional configuration needed
- Works in both draft and published modes

### 2. Use Inline Editing

- Click on any heading or text component
- Edit directly in the browser
- Press `Enter` to save or `Escape` to cancel

### 3. Access Template Page

- Navigate to `/template` in any locale
- View all available components
- Test new components before adding to pages

### 4. Configure SEO

- Add SEO component to any page
- Choose from enhanced robots options
- Configure all meta tags and social media previews

## 🔍 Troubleshooting

### Bridge Connection Issues

- The system automatically attempts to reconnect
- Check browser console for connection status
- Ensure `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` is set correctly

### Real-time Updates Not Working

- Verify bridge is enabled (`bridge: true`)
- Check network connectivity
- Clear browser cache if needed

### Inline Editing Not Available

- Ensure you're in Storyblok's visual editor
- Check that the component supports inline editing
- Verify bridge connection is active

## 🚀 Next Steps

1. **Test all features** in the Storyblok visual editor
2. **Configure SEO settings** for your pages
3. **Use the template page** to explore all components
4. **Customize inline editing** for additional components as needed

## 📝 Notes

- All features work with Next.js 15 and the latest Storyblok React SDK
- Real-time updates require an active internet connection
- Autosave works in draft mode only
- Inline editing is available in Storyblok's visual editor
