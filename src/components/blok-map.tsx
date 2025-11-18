/* eslint-disable @typescript-eslint/no-explicit-any */

// Import the Page component from blocks directory
import {
  Blogs,
  FAQ,
  Features,
  Footer,
  Header,
  Reviews,
  SocialProof,
} from "./blok/services";

import Accordion from "./blok/general/Accordion";
import AccordionItem from "./blok/general/AccordionItem";
import Author from "./blok/general/Author";
import Banner from "./blok/general/Banner";
import Blog from "./blok/general/Blog";
import BlogCard from "./ui/BlogCard";
import BlogOverview from "./blok/general/BlogOverview";
import Button from "./blok/general/Button";
import ButtonGroup from "./blok/general/ButtonGroup";
import CategorySection from "./blok/general/CategorySection";
import Column from "./blok/general/Column";
import Columns from "./blok/general/Columns";
import Container from "./blok/general/Container";
import Divider from "./blok/general/Divider";
import Form from "./blok/general/form";
import FormFieldset from "./blok/general/form-fieldset";
import FormGroup from "./blok/general/form-group";
import FormStep from "./blok/general/form-step";
import Grid from "./blok/general/Grid";
import Heading from "./blok/general/Heading";
import Hr from "./blok/general/Hr";
import Iframe from "./blok/general/Iframe";
import Image from "./blok/general/Image";
import InputField from "./blok/general/input-field";
import List from "./blok/general/List";
import ListItem from "./blok/general/ListItem";
import Review from "./blok/general/Review";
import ReviewStars from "./blok/general/ReviewStars";
import RichText from "./blok/general/RichText";
import Row from "./blok/general/Row";
import Stars from "./blok/general/Stars";
import Step from "./blok/general/Step";
import Steps from "./blok/general/Steps";
import Table from "./blok/general/Table";
import TableColumn from "./blok/general/TableColumn";
import TableHeader from "./blok/general/TableHeader";
import TableRow from "./blok/general/TableRow";
import Teaser from "./blok/general/Teaser";
import TrustBadge from "./blok/general/TrustBadge/TrustBadge";
import WhoWeAreSection from "./blok/general/WhoWeAreSection";

type ComponentType = React.ComponentType<any>;

// Component mapping object with proper TypeScript typing
export const componentMap: Record<string, ComponentType> = {
  // page: PageBlock,
  header: Header,
  // hero: Hero,
  step: Step,
  steps: Steps,
  stars: Stars,
  image: Image,
  blogs: Blogs,
  reviews: Reviews,
  social_proof: SocialProof,
  faq: FAQ,
  footer: Footer,
  feature: Features,
  button: Button,
  "button-group": ButtonGroup,
  teaser: Teaser,
  // feature: Feature,
  grid: Grid,
  banner: Banner,
  heading: Heading,
  // hero: Hero,
  "rich-text": RichText,
  columns: Columns,
  column: Column,
  row: Row,
  table: Table,
  "table-column": TableColumn,
  "table-row": TableRow,
  "table-header": TableHeader,
  list: List,
  "list-item": ListItem,
  review: Review,
  "review-stars": ReviewStars,
  hr: Hr,
  divider: Divider,
  accordion: Accordion,
  "accordion-item": AccordionItem,
  container: Container,
  form: Form,
  "form-step": FormStep,
  "form-fieldset": FormFieldset,
  "form-group": FormGroup,
  "input-field": InputField,
  blog: Blog,
  "category-section": CategorySection,
  who_we_are_section: WhoWeAreSection,
  author: Author,
  "blog-overview": BlogOverview,
  "blog-card": BlogCard,
  iframe: Iframe,
  trust_badge: TrustBadge,
  trust_badges: TrustBadge,
  // Aliases for underscore versions (Storyblok uses both formats)
  rich_text: RichText,
  button_group: ButtonGroup,
  form_step: FormStep,
  form_fieldset: FormFieldset,
  form_group: FormGroup,
  input_field: InputField,
  table_column: TableColumn,
  table_row: TableRow,
  table_header: TableHeader,
  list_item: ListItem,
  review_stars: ReviewStars,
  accordion_item: AccordionItem,
  category_section: CategorySection,
  blog_overview: BlogOverview,
  blog_card: BlogCard,
};

export default componentMap;
