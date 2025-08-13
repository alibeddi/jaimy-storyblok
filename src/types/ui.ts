import {
  ReactNode,
  ComponentType,
  HTMLAttributes,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";

// Base component props that all UI components can extend
export interface BaseUIProps {
  className?: string;
  children?: ReactNode;
  id?: string;
}

// Icon types
export type IconColor = "primary" | "secondary" | "white" | "gray" | "black";
export type IconType = "default" | "outline" | "solid";
export type IconSize = "xs" | "sm" | "default" | "lg" | "xl" | "2xl";
export type IconPosition = "left" | "right";

// Size variants
export type SizeVariant = "xs" | "sm" | "default" | "md" | "lg" | "xl" | "2xl";
export type SpacingVariant =
  | "none"
  | "xs"
  | "sm"
  | "default"
  | "md"
  | "lg"
  | "xl";

// Button component types
export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonType = "button" | "link";
export type ButtonTarget = "_self" | "_blank";

export interface ButtonProps extends BaseUIProps {
  variant?: ButtonVariant;
  type?: ButtonType;
  size?: SizeVariant;
  icon?: string;
  iconColor?: IconColor;
  iconType?: IconType;
  iconPosition?: IconPosition;
  iconSize?: IconSize;
  iconSpacing?: SpacingVariant;
  to?: string;
  target?: ButtonTarget;
  onClick?: () => void;
  submit?: boolean;
  tabIndex?: number;
  disabled?: boolean;
  relation?: string[];
  disableNofollow?: boolean;
}

// Heading component types
export type HeadingTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span"
  | "div";
export type HeadingType = "heading" | "title" | "subtitle";
export type TextAlign = "left" | "center" | "right" | "justify";
export type TextColor = "primary" | "secondary" | "white" | "gray" | "black";

export interface HeadingProps extends BaseUIProps {
  tag?: HeadingTag;
  size?: SizeVariant;
  type?: HeadingType;
  color?: TextColor;
  textAlign?: TextAlign;
  marginBottom?: SpacingVariant;
  title?: string;
}

// Accordion component types
export interface AccordionContextType {
  dark: boolean;
  addRef: (index: number, ref: HTMLElement | null) => void;
  openState: boolean[];
  toggleOpen: (index: number) => void;
}

export interface AccordionProps extends BaseUIProps {
  dark?: boolean;
  multiple?: boolean;
}

export interface AccordionItemProps extends BaseUIProps {
  index?: number;
  title?: string;
  open?: boolean;
}

// Layout component types
export interface ColumnProps extends BaseUIProps {
  span?: number;
  offset?: number;
  order?: number;
}

export interface ColumnsProps extends BaseUIProps {
  gap?: SpacingVariant;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

export interface ContainerProps extends BaseUIProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: SpacingVariant;
}

// Form component types
export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search"
  | "textarea";

export interface InputProps extends BaseUIProps {
  type?: InputType;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  autoFocus?: boolean;
  tabIndex?: number;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string;
  label?: string;
  helpText?: string;
}

// Image component types
export interface ImageProps extends BaseUIProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  placeholder?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

// List component types
export interface ListProps extends BaseUIProps {
  ordered?: boolean;
  spacing?: SpacingVariant;
}

export interface ListItemProps extends BaseUIProps {
  marker?: string;
}

// Table component types
export interface TableProps extends BaseUIProps {
  striped?: boolean;
  bordered?: boolean;
  hover?: boolean;
  responsive?: boolean;
}

export interface TableHeaderProps extends BaseUIProps {
  sortable?: boolean;
  sorted?: "asc" | "desc" | null;
  onSort?: () => void;
}

export interface TableRowProps extends BaseUIProps {
  selected?: boolean;
  onClick?: () => void;
}

export interface TableColumnProps extends BaseUIProps {
  align?: "left" | "center" | "right";
  width?: string | number;
}

// Rich text component types
export interface RichTextProps extends BaseUIProps {
  content: unknown; // Storyblok rich text content
  maxWidth?: string;
}

// Hero component types
export interface HeroProps extends BaseUIProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  textAlign?: TextAlign;
  minHeight?: string;
}

// Banner component types
export type BannerVariant = "full" | "constrained" | "connector";
export type ContentWidth = "1/4" | "1/3" | "1/2" | "2/3" | "3/4" | "full";

export interface BannerProps extends BaseUIProps {
  variant?: BannerVariant;
  type?:
    | "simple"
    | "simple-connector"
    | "constrained"
    | "constrained-connector"
    | "full-background";
  backgroundColor?: string;
  iconVariant?: string;
  iconType?: IconType;
  iconColor?: IconColor;
  iconMobileDisable?: boolean;
  content?: unknown[];
  contentWidth?: ContentWidth;
  contentWidthTablet?: ContentWidth;
  image?: {
    filename: string;
    alt?: string;
  };
  imageMobile?: {
    filename: string;
    alt?: string;
  };
  uspBar?: unknown[];
  preset?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  padding?: SpacingVariant;
  textAlign?: TextAlign;
}

// Review Stars component types
export interface ReviewStarsProps extends BaseUIProps {
  rating: number;
  maxRating?: number;
  size?: SizeVariant;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
}

// Icon component types
export interface IconProps extends BaseUIProps {
  variant: string;
  type?: IconType;
  color?: IconColor;
  size?: IconSize;
  shape?: "none" | "circle" | "square";
}

// Utility types
export interface PresetLayout {
  columns?: number;
  gap?: SpacingVariant;
  align?: string;
  justify?: string;
}

// ButtonGroup component types
export interface ButtonGroupProps extends BaseUIProps {
  align?: "default" | "left" | "center" | "right";
  orientation?: "default" | "horizontal" | "vertical";
}

// Blog component types
export interface BlogProps extends BaseUIProps {
  blok: {
    title: string;
    short_text?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    image_mobile?: {
      filename: string;
      alt?: string;
    };
    image_focus?: "center" | "top" | "bottom" | "left" | "right";
    updated?: string;
  };
}

// BlogCard component types
export interface BlogCardProps extends BaseUIProps {
  blok: {
    title: string;
    short_text?: string;
    image?: {
      filename: string;
      alt?: string;
    };
    full_slug: string;
    updated_at: string;
  };
}

// Column and Columns component types (extended)
export interface ExtendedColumnProps extends BaseUIProps {
  flexDirection?: string;
  textAlign?: TextAlign;
  justifyContent?: string;
  alignContent?: string;
  paddingX?: SpacingVariant;
  paddingTop?: SpacingVariant;
  paddingBottom?: SpacingVariant;
  backgroundColor?: string;
  backgroundImage?: {
    filename: string;
    alt?: string;
  };
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  backgroundAttachment?: string;
  link?: {
    url?: string;
    cached_url?: string;
  };
  target?: string;
  effect?: string;
  quote?: boolean;
  quoteColor?: string;
  group_columns_mobile?: string;
  group_columns_tablet?: string;
  group_columns_desktop?: string;
  disable_gutters?: boolean;
  border?: string;
  borderColor?: string;
}

export interface ExtendedColumnsProps extends BaseUIProps {
  columnsMobile?: string;
  columnsTablet?: string;
  columnsDesktop?: string;
  reverseMobile?: boolean;
  squeezeMobile?: string;
  squeezeTablet?: string;
  squeezeDesktop?: string;
  justifyContent?: string;
  alignContent?: string;
  touchSlide?: boolean;
  touchSlideColumnSize?: string;
  connectorToggle?: boolean;
  connectorColor?: string;
  marginBottom?: string;
}

// FormField component types
export interface FormFieldProps extends BaseUIProps {
  label?: string;
  required?: boolean;
  error?: string;
  helpText?: string;
}

// Hero component types (extended)
export interface ExtendedHeroProps extends HeroProps {
  backgroundVideo?: string;
}

// Hr component types
export interface HrProps extends BaseUIProps {
  variant?: "default" | "dotted" | "dashed" | "thick";
  color?: string;
  margin?: SpacingVariant;
}

// Row component types
export interface RowProps extends BaseUIProps {
  gap?: SpacingVariant;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  wrap?: boolean;
}

// Table component types (extended from existing)
export interface ExtendedTableProps extends TableProps {
  data?: Record<string, unknown>[];
  columns?: Array<{
    key: string;
    label: string;
    sortable?: boolean;
    width?: string | number;
    align?: "left" | "center" | "right";
  }>;
}

// Export all types as a namespace for easier imports
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UITypes {
  export type Button = ButtonProps;
  export type Heading = HeadingProps;
  export type Accordion = AccordionProps;
  export type AccordionItem = AccordionItemProps;
  export type Column = ColumnProps;
  export type Columns = ColumnsProps;
  export type Container = ContainerProps;
  export type Input = InputProps;
  export type Image = ImageProps;
  export type List = ListProps;
  export type ListItem = ListItemProps;
  export type Table = TableProps;
  export type TableHeader = TableHeaderProps;
  export type TableRow = TableRowProps;
  export type TableColumn = TableColumnProps;
  export type RichText = RichTextProps;
  export type Hero = HeroProps;
  export type Banner = BannerProps;
  export type ReviewStars = ReviewStarsProps;
  export type Icon = IconProps;
}
