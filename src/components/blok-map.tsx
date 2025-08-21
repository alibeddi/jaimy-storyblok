/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Button from "./blok/general/Button";
import ButtonGroup from "./blok/general/ButtonGroup";
import Teaser from "./blok/general/Teaser";
import Feature from "./blok/general/Feature";
import Grid from "./blok/general/Grid";

import Banner from "./blok/general/Banner";
import Image from "./blok/general/Image";
import Heading from "./blok/general/Heading";
import RichText from "./blok/general/RichText";
import Columns from "./blok/general/Columns";
import Column from "./blok/general/Column";
import Row from "./blok/general/Row";
import Table from "./blok/general/Table";
import TableColumn from "./blok/general/TableColumn";
import TableRow from "./blok/general/TableRow";
import TableHeader from "./blok/general/TableHeader";
import List from "./blok/general/List";
import ListItem from "./blok/general/ListItem";
import ReviewStars from "./blok/general/ReviewStars";
import Hr from "./blok/general/Hr";
import Accordion from "./blok/general/Accordion";
import AccordionItem from "./blok/general/AccordionItem";
import Container from "./blok/general/Container";
import Form from "./blok/general/form";
import FormStep from "./blok/general/form-step";
import FormFieldset from "./blok/general/form-fieldset";
import FormGroup from "./blok/general/form-group";
import InputField from "./blok/general/input-field";
import Blog from "./blok/general/Blog";

import Author from "./blok/general/Author";
import BlogOverview from "./blok/general/BlogOverview";
import BlogCard from "./ui/BlogCard";
import Iframe from "./blok/general/Iframe";
import { SbBlokData } from "@storyblok/react";
// Import the Page component from blocks directory
import {
  Blogs,
  FAQ,
  Hero,
  Footer,
  Header,
  Reviews,
  SocialProof,
  Steps,
  Features,
  Page as PageBlock,
} from "./blok/services";


type ComponentType = React.ComponentType<any>;

// Component mapping object with proper TypeScript typing
export const componentMap: Record<string, ComponentType> = {
  // page: PageBlock,
  header: Header,
  hero: Hero,
  steps: Steps,

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
  image: Image,
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
  "review-stars": ReviewStars,
  hr: Hr,
  accordion: Accordion,
  "accordion-item": AccordionItem,
  container: Container,
  form: Form,
  "form-step": FormStep,
  "form-fieldset": FormFieldset,
  "form-group": FormGroup,
  "input-field": InputField,
  blog: Blog,
  author: Author,
  "blog-overview": BlogOverview,
  "blog-card": BlogCard,
  iframe: Iframe,
};

export default componentMap;
