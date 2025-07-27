# Jaimy Home Page Components - Storyblok Integration

This document describes all the Storyblok components created for the Jaimy home page, based on the provided screenshots and requirements.

## Home Page Structure

The home page is divided into these main sections:

1. **Header** - Navigation and logo
2. **Hero Section** - Main banner with call-to-action
3. **Steps** - Step-by-step process
4. **Body** - Main content sections
5. **Body 2** - Additional content sections
6. **Blogs** - Blog posts/articles
7. **Reviews** - Customer testimonials
8. **Social Proof** - Logos, statistics, and testimonials
9. **FAQ** - Frequently asked questions
10. **Footer** - Company information and links

## Component Details

### 1. Header Component (`header`)

**File:** `src/components/blocks/Header.tsx`

**Features:**

- Logo display
- Navigation menu
- CTA buttons
- Mobile-responsive design

**Storyblok Fields:**

- `logo` (object): Logo image with filename and alt text
- `navigation` (array): Navigation menu items with label and link
- `cta_button` (array): Call-to-action buttons

### 2. Hero Component (`hero`)

**File:** `src/components/blocks/Hero.tsx`

**Features:**

- Headline and subheadline
- Description text
- Primary and secondary CTA buttons
- Hero image with decorative elements
- Gradient background

**Storyblok Fields:**

- `headline` (string): Main headline
- `subheadline` (string): Subtitle/badge
- `description` (string): Description text
- `primary_button` (array): Primary CTA buttons
- `secondary_button` (array): Secondary CTA buttons
- `hero_image` (object): Hero image with filename and alt text

### 3. Steps Component (`steps`)

**File:** `src/components/blocks/Steps.tsx`

**Features:**

- Numbered steps with visual connectors
- Step titles and descriptions
- Optional icons for each step
- Hover animations

**Storyblok Fields:**

- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `steps` (array): Array of step objects with number, title, description, and optional icon

### 4. Body Component (`body`)

**File:** `src/components/blocks/Body.tsx`

**Features:**

- Multiple content sections with text and images
- Flexible layout (text left/right, image right/left)
- Multiple paragraphs support
- CTA buttons

**Storyblok Fields:**

- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `description` (string): Section description
- `content_sections` (array): Array of content sections with heading, text, image, and layout
- `cta_button` (array): Call-to-action buttons

### 5. Blogs Component (`blogs`)

**File:** `src/components/blocks/Blogs.tsx`

**Features:**

- Blog posts grid layout
- Featured images with categories
- Author information and dates
- Read time indicators
- View all button

**Storyblok Fields:**

- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `description` (string): Section description
- `blog_posts` (array): Array of blog post objects
- `view_all_button` (array): View all button
- `layout` (string): Grid layout options ('grid-2', 'grid-3', 'grid-4')

### 6. Reviews Component (`reviews`)

**File:** `src/components/blocks/Reviews.tsx`

**Features:**

- Customer testimonials with ratings
- Star ratings display
- Author information with avatars
- Multiple layout options

**Storyblok Fields:**

- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `description` (string): Section description
- `reviews` (array): Array of review objects
- `layout` (string): Layout options ('grid-2', 'grid-3', 'carousel')
- `show_rating` (boolean): Show/hide star ratings
- `background_color` (string): Background color option

### 7. Social Proof Component (`social_proof`)

**File:** `src/components/blocks/SocialProof.tsx`

**Features:**

- Company logos display
- Statistics with numbers and labels
- Testimonials section
- Multiple layout options

**Storyblok Fields:**

- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `description` (string): Section description
- `logos` (array): Array of company logos
- `statistics` (array): Array of statistics objects
- `testimonials` (array): Array of testimonial objects
- `layout` (string): Layout options ('logos-only', 'stats-only', 'mixed')
- `background_color` (string): Background color option

### 8. FAQ Component (`faq`)

**File:** `src/components/blocks/FAQ.tsx`

**Features:**

- Expandable FAQ items
- Smooth animations
- Multiple layout options
- Interactive accordion functionality

**Storyblok Fields:**

- `title` (string): Section title
- `subtitle` (string): Section subtitle
- `description` (string): Section description
- `faq_items` (array): Array of FAQ items with question and answer
- `layout` (string): Layout options ('single-column', 'two-column')
- `background_color` (string): Background color option

### 9. Footer Component (`footer`)

**File:** `src/components/blocks/Footer.tsx`

**Features:**

- Company logo and description
- Navigation sections
- Contact information
- Social media links
- Copyright information

**Storyblok Fields:**

- `logo` (object): Company logo
- `company_description` (string): Company description
- `navigation_sections` (array): Array of navigation sections
- `social_links` (array): Array of social media links
- `contact_info` (object): Contact information
- `copyright_text` (string): Copyright text
- `background_color` (string): Background color option

## Component Registration

All components are registered in:

- `storyblok.config.ts` - Server-side registration
- `src/components/StoryblokProvider.tsx` - Client-side registration
- `src/app/layout.tsx` - Layout-level registration

## Usage in Storyblok

To use these components in Storyblok:

1. **Create a new story** in Storyblok
2. **Add content blocks** using the component types:

   - `header`
   - `hero`
   - `steps`
   - `body`
   - `blogs`
   - `reviews`
   - `social_proof`
   - `faq`
   - `footer`

3. **Configure each component** with the appropriate fields
4. **Publish the story** to see it live on your website

## Home Page Integration

The home page (`src/app/home/page.tsx`) automatically renders all components based on the Storyblok content structure:

```typescript
// Components are rendered in order based on Storyblok content
{
  headerBlock && <Header blok={headerBlock} />;
}
{
  heroBlock && <Hero blok={heroBlock} />;
}
{
  stepsBlock && <Steps blok={stepsBlock} />;
}
{
  bodyBlock && <Body blok={bodyBlock} />;
}
{
  blogsBlock && <Blogs blok={blogsBlock} />;
}
{
  reviewsBlock && <Reviews blok={reviewsBlock} />;
}
{
  socialProofBlock && <SocialProof blok={socialProofBlock} />;
}
{
  faqBlock && <FAQ blok={faqBlock} />;
}
{
  footerBlock && <Footer blok={footerBlock} />;
}
```

## Styling and Branding

All components use:

- **Belfius fonts** (Alternative and Normal variants)
- **Belfius color scheme** (red primary, gray accents)
- **Responsive design** with Tailwind CSS
- **Consistent spacing** and typography
- **Hover effects** and transitions

## Responsive Design

Components are designed to work across all devices:

- **Mobile-first** approach
- **Tablet optimization** for medium screens
- **Desktop enhancement** for large screens
- **Accessibility** considerations

## Performance Features

- **Next.js Image optimization** for all images
- **Lazy loading** for better performance
- **TypeScript** for type safety
- **Storyblok RSC** for server-side rendering
- **Optimized CSS** with Tailwind

## Testing and Development

To test the components:

1. **Run the development server**: `npm run dev`
2. **Visit the home page**: `http://localhost:3000`
3. **Use Storyblok editor**: Create content in Storyblok
4. **Preview changes**: Use Storyblok preview mode

All components are production-ready and follow best practices for scalability and maintainability.
