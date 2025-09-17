# FooterCategories Component

A reusable Storyblok component for displaying categorized footer content in a responsive grid layout. This component uses the existing Column and Columns UI components for consistent layout behavior.

## Features

- **Responsive Grid Layout**: Configurable columns for mobile, tablet, and desktop
- **Flexible Category Groups**: Support for multiple category groups with individual titles
- **Link Support**: Optional links for each category item
- **Highlighted Items**: Special styling for featured categories
- **Customizable Styling**: Background colors, padding, and text alignment options
- **SEO Friendly**: Proper semantic HTML structure

## Component Structure

The FooterCategories component is built using:

- **ColumnsUI**: For responsive grid layout
- **ColumnUI**: For individual category group containers
- **Tailwind CSS**: For styling and responsive design

## Usage in Storyblok

### Component Registration

The component is registered in `blok-map.tsx` as:

```typescript
"footer-categories": FooterCategories
```

### Schema Configuration

In your Storyblok space, create a component with the following fields:

#### Basic Settings

- **title** (Text): Optional title for the entire section
- **show_title** (Boolean): Whether to display the title
- **text_align** (Option): left, center, right

#### Layout Settings

- **columns_mobile** (Option): 12/12, 6/12, 4/12, 3/12, 2/12
- **columns_tablet** (Option): 12/12, 6/12, 4/12, 3/12, 2/12
- **columns_desktop** (Option): 12/12, 6/12, 4/12, 3/12, 2/12

#### Styling

- **background_color** (Option): default, gray-50, gray-100, white, etc.
- **padding_top** (Option): none, xs, sm, md, lg, xl
- **padding_bottom** (Option): none, xs, sm, md, lg, xl

#### Content

- **category_groups** (Blocks): Array of category groups

##### Category Group Schema

- **title** (Text): Group title (e.g., "HEATING", "CATEG")
- **categories** (Blocks): Array of category items

##### Category Item Schema

- **text** (Text): Category name
- **link** (Link): Optional link to category page
- **highlighted** (Boolean): Whether to highlight this item (red text)

## Implementation Example

### Basic Usage

```jsx
// In your Storyblok story content
{
  "component": "footer-categories",
  "title": "Footer Categories",
  "show_title": false,
  "columns_mobile": "12/12",
  "columns_tablet": "6/12",
  "columns_desktop": "2/12",
  "background_color": "gray-50",
  "padding_top": "lg",
  "padding_bottom": "lg",
  "category_groups": [
    {
      "title": "HEATING",
      "categories": [
        {
          "text": "Boiler maintenance gaz",
          "highlighted": true,
          "link": {
            "url": "/heating/boiler-maintenance-gas"
          }
        },
        {
          "text": "Boiler maintenance oil",
          "link": {
            "url": "/heating/boiler-maintenance-oil"
          }
        },
        {
          "text": "Categ"
        }
      ]
    },
    {
      "title": "CATEG",
      "categories": [
        { "text": "Categ" },
        { "text": "Categ" },
        { "text": "Categ" }
      ]
    }
  ]
}
```

### Advanced Configuration

#### Five Column Layout (as shown in design)

```json
{
  "columns_mobile": "12/12",
  "columns_tablet": "6/12",
  "columns_desktop": "2/12"
}
```

#### Custom Styling

```json
{
  "background_color": "white",
  "padding_top": "xl",
  "padding_bottom": "xl",
  "text_align": "center"
}
```

## Responsive Behavior

### Mobile (default)

- Single column layout (12/12)
- Stack category groups vertically
- Full width categories

### Tablet (md breakpoint)

- Two columns (6/12)
- Category groups side by side

### Desktop (lg breakpoint)

- Five columns (2/12)
- All category groups in a row
- Compact horizontal layout

## Styling Classes

### Container

- Responsive grid using CSS Grid
- Configurable background colors
- Customizable padding

### Category Groups

- Consistent spacing between groups
- Uppercase titles with tracking
- Organized category lists

### Category Items

- Hover effects for linked items
- Highlighted items in red (`text-red-600`)
- Smooth transitions

## Integration with Existing Components

The FooterCategories component seamlessly integrates with:

### Footer Component

Combine with the existing Footer component:

```jsx
// Example page structure
[
  {
    component: "footer-categories",
    // ... footer categories config
  },
  {
    component: "footer",
    // ... footer config
  },
];
```

### Other Layout Components

Can be used anywhere in your page structure:

- Above footer for category navigation
- In sidebar layouts
- As standalone category pages

## Performance Considerations

- **Lightweight**: Uses existing UI components
- **Responsive**: CSS Grid with Tailwind classes
- **Accessible**: Semantic HTML structure
- **SEO Optimized**: Proper heading hierarchy

## Customization

### Adding New Category Groups

Simply add more objects to the `category_groups` array in Storyblok.

### Styling Variations

Modify the component by:

1. Adding new background color options
2. Extending padding/margin variants
3. Creating custom hover effects

### Layout Modifications

Adjust responsive breakpoints by modifying:

- Column configuration mappings
- Tailwind responsive classes
- Grid gap settings

## TypeScript Support

Full TypeScript interfaces are provided:

```typescript
interface FooterCategoriesBlok {
  component: "footer-categories";
  title?: string;
  show_title?: boolean;
  category_groups?: CategoryGroup[];
  background_color?: string;
  padding_top?: string;
  padding_bottom?: string;
  text_align?: "left" | "center" | "right";
  columns_mobile?: string;
  columns_tablet?: string;
  columns_desktop?: string;
}
```

## Browser Support

- Modern browsers with CSS Grid support
- Responsive design using Tailwind CSS
- Progressive enhancement for older browsers

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader friendly markup

## Testing

Test the component with:

1. Different numbers of category groups (1-10)
2. Various screen sizes and breakpoints
3. With and without links
4. Mixed highlighted and normal items
5. Different background and padding combinations

## Troubleshooting

### Component Not Rendering

1. Check component registration in `blok-map.tsx`
2. Verify Storyblok schema matches interface
3. Ensure category_groups array is populated

### Layout Issues

1. Verify responsive column settings
2. Check Tailwind CSS classes are loaded
3. Test on different screen sizes

### Styling Problems

1. Check background_color values match Tailwind classes
2. Verify padding values are in allowed range
3. Ensure text_align options are valid

## Future Enhancements

Potential improvements:

- Icon support for category items
- Collapsible groups on mobile
- Search/filter functionality
- Sorting options
- Export/import category data
