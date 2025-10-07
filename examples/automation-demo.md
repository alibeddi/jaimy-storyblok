# Storyblok Automation Demo

This demo shows how the automation system works to generate TypeScript interfaces and React components from your Storyblok content structure.

## Before Automation (Manual Process)

### 1. Manual Interface Definition

```typescript
// You had to manually write this interface
interface ReviewsProps {
  blok: {
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
  };
}
```

### 2. Manual Component Creation

```typescript
// You had to manually write this component
export default function Reviews({ blok }: ReviewsProps) {
  // All the JSX, styling, and logic had to be written manually
  return (
    <section>
      {/* Manual implementation */}
    </section>
  );
}
```

## After Automation (Automated Process)

### 1. Auto-Generated Interface

```bash
npm run generate-types
```

This automatically creates:

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

### 2. Auto-Generated Component

```bash
npm run generate-components
```

This automatically creates:

```typescript
import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import { ReviewsBlok } from "@/types/storyblok";

export default function Reviews({ blok }: { blok: ReviewsBlok }) {
  const gridClasses = {
    "grid-2": "grid-cols-1 md:grid-cols-2",
    "grid-3": "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    carousel: "grid-cols-1",
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section
      {...storyblokEditable(blok)}
      className={`py-16 lg:py-24 ${blok?.background_color === "gray" ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {blok?.subtitle && (
            <p className="text-belfius-red font-medium text-lg mb-4 font-belfius-body">
              {blok.subtitle}
            </p>
          )}
          {blok?.title && (
            <h2 className="font-belfius-title text-3xl lg:text-5xl text-gray-900 mb-6">
              {blok.title}
            </h2>
          )}
          {blok?.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-belfius-body">
              {blok.description}
            </p>
          )}
        </div>

        {/* Reviews Grid */}
        {blok?.reviews && blok?.reviews?.length > 0 && (
          <div className={`grid ${gridClasses[blok?.layout || "grid-3"]} gap-8`}>
            {blok?.reviews?.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300"
              >
                {/* Rating */}
                {blok?.show_rating && (
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-600 font-belfius-body">
                      {review.rating}/5
                    </span>
                  </div>
                )}

                {/* Review Text */}
                <blockquote className="text-gray-700 mb-6 font-belfius-body leading-relaxed">
                  &ldquo;{review.review_text}&rdquo;
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center">
                  {review?.avatar?.filename ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={review.avatar.filename}
                        alt={review.avatar.alt || review.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-belfius-red rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {review.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <div className="font-belfius-title text-gray-900">
                      {review.name}
                    </div>
                    {(review?.role || review?.company) && (
                      <div className="text-sm text-gray-600 font-belfius-body">
                        {review.role && <span>{review.role}</span>}
                        {review.role && review.company && <span> at </span>}
                        {review.company && <span>{review.company}</span>}
                      </div>
                    )}
                    {review?.date && (
                      <div className="text-sm text-gray-500 font-belfius-body">
                        {review.date}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
```

## Time Comparison

### Manual Process (Before)

- **Interface Definition**: 15-30 minutes per component
- **Component Creation**: 30-60 minutes per component
- **Styling & Responsive Design**: 30-45 minutes per component
- **Testing & Debugging**: 15-30 minutes per component
- **Total per component**: 1.5-2.5 hours

### Automated Process (After)

- **Generate Types**: 30 seconds
- **Generate Components**: 30 seconds
- **Customization (if needed)**: 15-30 minutes
- **Total for all components**: 1-2 minutes + customization time

## Benefits Demonstrated

### 1. **Consistency**

All generated components follow the same patterns:

- Same file structure
- Same import statements
- Same TypeScript typing
- Same Storyblok integration
- Same responsive design approach

### 2. **Type Safety**

```typescript
// Full IntelliSense support
const review = blok.reviews[0];
review.rating; // ✅ TypeScript knows this is a number
review.name; // ✅ TypeScript knows this is a string
review.avatar; // ✅ TypeScript knows this is optional
```

### 3. **Maintainability**

When you update your Storyblok schema:

1. Run `npm run generate-types` - updates all interfaces
2. Run `npm run generate-components` - updates all components
3. All changes are automatically propagated

### 4. **Developer Experience**

- **Auto-completion**: Full IntelliSense for all fields
- **Error detection**: Compile-time errors for missing fields
- **Refactoring**: Easy to rename fields across all components
- **Documentation**: Generated components are self-documenting

## Real-World Usage

### Adding a New Field to Reviews

1. **Update Storyblok Schema**:
   - Add a new field in Storyblok (e.g., "verified_reviewer" boolean)

2. **Regenerate Types**:

   ```bash
   npm run generate-types
   ```

3. **Regenerate Components**:

   ```bash
   npm run generate-components
   ```

4. **The new field is automatically available**:
   ```typescript
   // TypeScript now knows about the new field
   blok.reviews[0].verified_reviewer; // ✅ boolean | undefined
   ```

### Adding a New Component

1. **Define Interface** in `src/types/storyblok.ts`:

   ```typescript
   export interface TestimonialBlok extends StoryblokComponent<"testimonial"> {
     quote: string;
     author: string;
     company?: string;
   }
   ```

2. **Add Template** in `scripts/generate-components.ts`:

   ```typescript
   {
     name: 'Testimonial',
     interface: 'TestimonialBlok',
     template: `// Your component template`
   }
   ```

3. **Generate Component**:

   ```bash
   npm run generate-components
   ```

4. **Register in Storyblok**:
   ```typescript
   components: {
     testimonial: Testimonial,
   }
   ```

## Conclusion

This automation system transforms the development workflow from:

- **Manual, repetitive work** → **Automated generation**
- **Inconsistent components** → **Standardized patterns**
- **Type errors** → **Full type safety**
- **Slow development** → **Rapid prototyping**

The generated components are production-ready and include all the features you need for a modern React application with Storyblok integration.
