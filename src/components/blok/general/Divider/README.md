# Divider Component

A flexible horizontal divider/separator component for Storyblok.

## Usage in Storyblok

Add a `divider` component to your Storyblok content.

## Component Properties

### variant
- **Type**: `"solid" | "dashed" | "dotted" | "double" | "gradient"`
- **Default**: `"solid"`
- **Description**: Style of the divider line

### thickness
- **Type**: `"thin" | "medium" | "thick"`
- **Default**: `"thin"`
- **Description**: Thickness of the divider line

### color
- **Type**: `string`
- **Default**: `"gray-300"`
- **Options**: `"primary"`, `"secondary"`, `"gray-200"`, `"gray-300"`, `"gray-400"`, `"gray-500"`, `"gray-600"`, `"gray-800"`, `"black"`, `"white"`
- **Description**: Color of the divider (not applicable for gradient variant)

### width
- **Type**: `"full" | "75" | "50" | "25"`
- **Default**: `"full"`
- **Description**: Width of the divider as percentage

### alignment
- **Type**: `"left" | "center" | "right"`
- **Default**: `"center"`
- **Description**: Horizontal alignment of the divider

### margin_top
- **Type**: `"none" | "xs" | "sm" | "default" | "md" | "lg" | "xl"`
- **Default**: `"default"`
- **Description**: Top margin spacing

### margin_bottom
- **Type**: `"none" | "xs" | "sm" | "default" | "md" | "lg" | "xl"`
- **Default**: `"default"`
- **Description**: Bottom margin spacing

## Examples

### Basic Divider
```json
{
  "component": "divider"
}
```

### Thick Dashed Divider
```json
{
  "component": "divider",
  "variant": "dashed",
  "thickness": "thick",
  "color": "gray-500"
}
```

### Gradient Divider
```json
{
  "component": "divider",
  "variant": "gradient",
  "width": "75",
  "alignment": "center"
}
```

### Centered Half-Width Divider
```json
{
  "component": "divider",
  "width": "50",
  "alignment": "center",
  "margin_top": "lg",
  "margin_bottom": "lg"
}
```
