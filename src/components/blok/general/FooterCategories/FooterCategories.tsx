/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { storyblokEditable } from "@storyblok/react";
import ColumnsUI from "../../../ui/Columns";
import ColumnUI from "../../../ui/Column";
import { cn } from "@/lib/utils";

interface CategoryItem {
  _uid: string;
  text: string;
  link?: {
    url?: string;
    cached_url?: string;
  };
  highlighted?: boolean;
}

interface CategoryGroup {
  _uid: string;
  title: string;
  categories: CategoryItem[];
}

interface FooterCategoriesBlok {
  component: string;
  _uid: string;
  category_groups: CategoryGroup[];
  background_color?: string;
  padding_top?: string;
  padding_bottom?: string;
  title?: string;
  show_title?: boolean;
  text_align?: "left" | "center" | "right";
  columns_mobile?: string;
  columns_tablet?: string;
  columns_desktop?: string;
  [key: string]: any;
}

interface FooterCategoriesProps {
  blok: FooterCategoriesBlok;
}

const FooterCategories: React.FC<FooterCategoriesProps> = ({ blok }) => {
  const {
    category_groups = [],
    background_color = "gray-50",
    padding_top = "lg",
    padding_bottom = "lg",
    title,
    show_title = false,
    text_align = "left",
    columns_mobile = "12/12",
    columns_tablet = "6/12",
    columns_desktop = "2/12", // 5 columns on desktop
  } = blok;

  const paddingMap = {
    none: "py-0",
    xs: "py-1",
    sm: "py-4",
    md: "py-6",
    lg: "py-8",
    xl: "py-12",
  };

  const containerClasses = cn(
    "w-full",
    background_color && background_color !== "default"
      ? `bg-${background_color}`
      : "bg-gray-50",
    paddingMap[padding_top as keyof typeof paddingMap] || "py-8",
    paddingMap[padding_bottom as keyof typeof paddingMap] || "py-8"
  );

  const titleClasses = cn("text-2xl font-semibold mb-8 text-gray-800", {
    "text-left": text_align === "left",
    "text-center": text_align === "center",
    "text-right": text_align === "right",
  });

  return (
    <div {...storyblokEditable(blok)} className={containerClasses}>
      <div className="container mx-auto px-4">
        {show_title && title && <h2 className={titleClasses}>{title}</h2>}

        <ColumnsUI
          columnsMobile={columns_mobile}
          columnsTablet={columns_tablet}
          columnsDesktop={columns_desktop}
          squeezeMobile="medium"
          squeezeTablet="medium"
          squeezeDesktop="medium"
          className="w-full"
        >
          {category_groups.map((group) => (
            <ColumnUI
              key={group._uid}
              className="space-y-4"
              paddingX="sm"
              paddingTop="default"
              paddingBottom="default"
            >
              {/* Category Group Title */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 uppercase tracking-wide">
                  {group.title}
                </h3>
              </div>

              {/* Category List */}
              <div className="space-y-2">
                {group.categories?.map((category) => (
                  <div key={category._uid} className="text-sm">
                    {category.link?.url || category.link?.cached_url ? (
                      <a
                        href={category.link.url || category.link.cached_url}
                        className={cn(
                          "hover:text-primary transition-colors duration-200",
                          category.highlighted
                            ? "text-red-600 font-medium"
                            : "text-gray-600 hover:text-gray-800"
                        )}
                      >
                        {category.text}
                      </a>
                    ) : (
                      <span
                        className={cn(
                          category.highlighted
                            ? "text-red-600 font-medium"
                            : "text-gray-600"
                        )}
                      >
                        {category.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </ColumnUI>
          ))}
        </ColumnsUI>
      </div>
    </div>
  );
};

export default FooterCategories;
