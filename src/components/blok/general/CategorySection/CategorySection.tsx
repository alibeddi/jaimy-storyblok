/* eslint-disable @typescript-eslint/no-explicit-any */

import { storyblokEditable } from '@storyblok/react';
import CategorySectionUI from '../../../ui/CategorySection';
import { SpacingVariant } from '@/types/ui';

interface CategoryItem {
  _uid: string;
  component: string;
  title?: string;
  description?: string;
  icon?: string;
  href?: string;
  [key: string]: any;
}

interface CategorySectionBlok {
  component: string;
  _uid?: string;
  title?: string;
  subtitle?: string;
  categories?: CategoryItem[];
  see_all_text?: string;
  see_all_href?: string;
  columns_mobile?: string;
  columns_tablet?: string;
  columns_desktop?: string;
  margin_bottom?: SpacingVariant;
  [key: string]: any;
}

interface CategorySectionProps {
  blok: CategorySectionBlok;
}

const CategorySection: React.FC<CategorySectionProps> = ({ blok }) => {
  // Transform categories if provided, otherwise use default from UI component
  const categories = blok.categories?.map((category) => ({
    title: category.title || '',
    description: category.description || 'Text text text',
    icon: category.icon || '',
    href: category.href,
  })) || [];

  return (
    <CategorySectionUI
      title={blok.title || "C'est le moment d'y penser"}
      subtitle={blok.subtitle || "Explorez les catégories phares de Jaimy"}
      categories={categories}
      seeAllText={blok.see_all_text || "Voir tout nos catégories"}
      seeAllHref={blok.see_all_href}
      columnsMobile={blok.columns_mobile || "12/12"}
      columnsTablet={blok.columns_tablet || "6/12"}
      columnsDesktop={blok.columns_desktop || "4/12"}
      marginBottom={blok.margin_bottom || "default"}
      {...storyblokEditable(blok)}
    />
  );
};

export default CategorySection;
