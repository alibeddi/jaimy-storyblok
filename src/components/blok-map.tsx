 /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Button from './blok/Button';
import ButtonGroup from './blok/ButtonGroup';
import Teaser from './blok/Teaser';
import Page from './blok/Page';
import Feature from './blok/Feature';
import Grid from './blok/Grid';
import Hero from './blok/Hero';
import Banner from './blok/Banner';
import Image from './blok/Image';
import Heading from './blok/Heading';
import RichText from './blok/RichText';
import Columns from './blok/Columns';
import Column from './blok/Column';
import Row from './blok/Row';
import Table from './blok/Table';
import TableColumn from './blok/TableColumn';
import TableRow from './blok/TableRow';
import TableHeader from './blok/TableHeader';
import List from './blok/List';
import ListItem from './blok/ListItem';
import ReviewStars from './blok/ReviewStars';
import Hr from './blok/Hr';
import Accordion from './blok/Accordion';
import AccordionItem from './blok/AccordionItem';
import Container from './blok/Container';
import Form from './blok/form';
import FormStep from './blok/form-step';
import FormFieldset from './blok/form-fieldset';
import FormGroup from './blok/form-group';
import InputField from './blok/input-field';
import Blog from './blok/Blog';

import Author from './blok/Author';
import BlogOverview from './blok/BlogOverview';
import BlogCard from './ui/BlogCard';
import Iframe from './blok/Iframe';
import { SbBlokData } from '@storyblok/react';

type ComponentType = React.ComponentType<any>;

// Component mapping object with proper TypeScript typing
export const componentMap: Record<string, ComponentType> = {
  button: Button,
  'button-group': ButtonGroup,
  teaser: Teaser,
  page: Page,
  feature: Feature,
  grid: Grid,
  banner: Banner,
  image: Image,
  heading: Heading,
  hero: Hero,
  'rich-text': RichText,
  columns: Columns,
  column: Column,
  row: Row,
  table: Table,
  'table-column': TableColumn,
  'table-row': TableRow,
  'table-header': TableHeader,
  list: List,
  'list-item': ListItem,
  'review-stars': ReviewStars,
  hr: Hr,
  accordion: Accordion,
  'accordion-item': AccordionItem,
  container: Container,
  form: Form,
  'form-step': FormStep,
  'form-fieldset': FormFieldset,
  'form-group': FormGroup,
  'input-field': InputField,
  blog: Blog,
  author: Author,
  'blog-overview': BlogOverview,
  'blog-card': BlogCard,
  iframe: Iframe,
};

export default componentMap;