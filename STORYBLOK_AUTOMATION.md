# Storyblok Automation Guide

This guide explains how to automatically generate TypeScript interfaces and React components from your Storyblok content structure, eliminating the need to manually write interfaces and components.

## Overview

Instead of manually defining TypeScript interfaces for each Storyblok component, you can now:

1. **Auto-generate TypeScript interfaces** from your Storyblok schema
2. **Auto-generate React components** from your TypeScript interfaces
3. **Use the generated components** directly in Storyblok

## Available Scripts

### 1. Generate TypeScript Interfaces

```bash
npm run generate-types
```

This script:

- Fetches your Storyblok component schema from the API
- Generates TypeScript interfaces for all components
- Creates a `src/types/generated-storyblok.ts` file
- Automatically maps Storyblok field types to TypeScript types

### 2. Generate React Components

```bash
npm run generate-components
```

This script:

- Uses your existing TypeScript interfaces from `src/types/storyblok.ts`
- Generates React components for all defined interfaces
- Creates components in `src/components/blocks/`
- Includes proper TypeScript typing and Storyblok integration

## How It Works

### Type Generation Process

1. **Fetch Schema**: The script connects to your Storyblok API
2. **Parse Components**: Extracts all component definitions and their fields
3. **Map Types**: Converts Storyblok field types to TypeScript types:
   - `text` → `string`
   - `number` → `number`
   - `boolean` → `boolean`
   - `asset` → `{ filename: string; alt?: string; }`
   - `bloks` → `Array<ComponentType>`
   - `option` → `"option1" | "option2" | "option3"`
   - `link` → `{ cached_url: string; }`

### Component Generation Process

1. **Read Interfaces**: Reads your TypeScript interfaces
2. **Generate Templates**: Creates React components with:
   - Proper TypeScript typing
   - Storyblok editable integration
   - Responsive design with Tailwind CSS
   - Belfius branding and styling
3. **Write Files**: Saves components to the blocks directory

## Generated Files Structure

```
src/
├── types/
│   ├── storyblok.ts              # Manual interface definitions
│   └── generated-storyblok.ts    # Auto-generated from API
└── components/
    └── blocks/
        ├── Reviews.tsx           # Auto-generated component
        ├── Hero.tsx              # Auto-generated component
        ├── Steps.tsx             # Auto-generated component
        ├── Header.tsx            # Auto-generated component
        ├── Blogs.tsx             # Auto-generated component
        ├── SocialProof.tsx       # Auto-generated component
        ├── FAQ.tsx               # Auto-generated component
        ├── Footer.tsx            # Auto-generated component
        ├── Slider.tsx            # Auto-generated component
        ├── Page.tsx              # Auto-generated component
        └── index.ts              # Auto-generated exports
```

## Usage Examples

### 1. Generate Types from Storyblok Schema

```bash
# Generate TypeScript interfaces from your Storyblok content structure
npm run generate-types
```

This will create interfaces like:

```typescript
export interface ReviewsBlok extends StoryblokComponent<"reviews"> {
  title?: string;
  subtitle?: string;
  description?: string;
  reviews?: Array<{
    name: string;
    role?: string;
    company?: string;
    rating: number;
    review_text: string;
    avatar?: {
      filename: string;
      alt?: string;
    };
    date?: string;
  }>;
  layout?: "grid-2" | "grid-3" | "carousel";
  show_rating?: boolean;
  background_color?: string;
}
```

### 2. Generate React Components

```bash
# Generate React components from your TypeScript interfaces
npm run generate-components
```

This will create components like:

```typescript
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { ReviewsBlok } from "@/types/storyblok";

export default function Reviews({ blok }: { blok: ReviewsBlok }) {
  // Auto-generated component with full TypeScript support
  // Includes responsive design, animations, and Belfius styling
}
```

### 3. Use in Storyblok

After generation, update your Storyblok provider:

```typescript
// src/components/StoryblokProvider.tsx
import {
  Reviews,
  Hero,
  Steps,
  Header,
  Blogs,
  SocialProof,
  FAQ,
  Footer,
  Slider,
  Page,
} from "./blocks";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    reviews: Reviews,
    hero: Hero,
    steps: Steps,
    header: Header,
    blogs: Blogs,
    social_proof: SocialProof,
    faq: FAQ,
    footer: Footer,
    slider: Slider,
    page: Page,
  },
});
```

## Customization

### Modifying Generated Components

The generated components include:

- **Responsive Design**: Mobile-first with Tailwind CSS
- **Belfius Branding**: Colors, fonts, and styling
- **TypeScript Support**: Full type safety
- **Storyblok Integration**: Editable fields and preview mode
- **Accessibility**: ARIA labels and semantic HTML

You can customize the templates in `scripts/generate-components.ts`.

### Adding New Components

1. **Add Interface**: Define your interface in `src/types/storyblok.ts`
2. **Add Template**: Add a component template to the `componentTemplates` array
3. **Generate**: Run `npm run generate-components`

### Field Type Mapping

The system automatically maps Storyblok field types:

| Storyblok Type | TypeScript Type                       | Description             |
| -------------- | ------------------------------------- | ----------------------- |
| `text`         | `string`                              | Single line text        |
| `textarea`     | `string`                              | Multi-line text         |
| `markdown`     | `string`                              | Markdown content        |
| `number`       | `number`                              | Numeric value           |
| `boolean`      | `boolean`                             | True/false value        |
| `asset`        | `{ filename: string; alt?: string; }` | Image/file              |
| `bloks`        | `Array<ComponentType>`                | Nested components       |
| `option`       | `"option1" \| "option2"`              | Dropdown options        |
| `link`         | `{ cached_url: string; }`             | Internal/external links |
| `date`         | `string`                              | Date value              |
| `datetime`     | `string`                              | Date and time           |

## Benefits

### 1. **Time Savings**

- No more manual interface writing
- No more repetitive component creation
- Automatic type safety

### 2. **Consistency**

- All components follow the same patterns
- Consistent styling and structure
- Unified TypeScript interfaces

### 3. **Maintainability**

- Single source of truth for types
- Easy to update when schema changes
- Clear separation of concerns

### 4. **Developer Experience**

- Full IntelliSense support
- Compile-time error checking
- Auto-completion for all fields

## Workflow

### Initial Setup

1. **Install Dependencies**:

   ```bash
   npm install --save-dev tsx storyblok storyblok-schema-types
   ```

2. **Generate Types**:

   ```bash
   npm run generate-types
   ```

3. **Generate Components**:

   ```bash
   npm run generate-components
   ```

4. **Update Providers**:
   - Update `src/components/StoryblokProvider.tsx`
   - Update `src/app/layout.tsx`

### Ongoing Development

1. **Schema Changes**: When you modify Storyblok components

   ```bash
   npm run generate-types
   ```

2. **Interface Updates**: When you modify TypeScript interfaces

   ```bash
   npm run generate-components
   ```

3. **Custom Components**: For special cases, create manual components

## Troubleshooting

### Common Issues

1. **API Token Missing**:
   - Ensure `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` is set
   - Check your Storyblok API token permissions

2. **Type Errors**:
   - Run `npm run generate-types` to update interfaces
   - Check that all required fields are defined

3. **Component Not Rendering**:
   - Verify component is registered in StoryblokProvider
   - Check component name matches Storyblok schema

### Debugging

1. **Check Generated Files**:

   ```bash
   cat src/types/generated-storyblok.ts
   cat src/components/blocks/Reviews.tsx
   ```

2. **Verify API Connection**:

   ```bash
   curl "https://api.storyblok.com/v2/cdn/stories?token=YOUR_TOKEN"
   ```

3. **Check TypeScript Errors**:
   ```bash
   npm run lint
   ```

## Advanced Features

### Custom Field Types

Add custom field type mappings in `scripts/generate-types.ts`:

```typescript
function getTypeScriptType(field: StoryblokField): string {
  switch (field.type) {
    // ... existing cases
    case "custom_field":
      return "CustomType";
    default:
      return "unknown";
  }
}
```

### Custom Component Templates

Modify component templates in `scripts/generate-components.ts`:

```typescript
const componentTemplates: ComponentTemplate[] = [
  {
    name: "CustomComponent",
    interface: "CustomComponentBlok",
    template: `// Your custom template here`,
  },
];
```

### Conditional Rendering

The generated components include conditional rendering:

```typescript
{blok?.title && (
  <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
    {blok.title}
  </h2>
)}
```

## Best Practices

1. **Keep Interfaces Updated**: Run type generation when schema changes
2. **Version Control**: Commit generated files to track changes
3. **Custom Components**: Create manual components for complex logic
4. **Testing**: Test generated components in Storyblok preview
5. **Documentation**: Document any custom field types or components

## Conclusion

This automation system eliminates the repetitive task of manually creating TypeScript interfaces and React components for Storyblok. By using the generated components, you can:

- Focus on content creation in Storyblok
- Maintain type safety across your application
- Ensure consistent component structure
- Reduce development time significantly

The generated components are production-ready and include all necessary features for a modern React application with Storyblok integration.
