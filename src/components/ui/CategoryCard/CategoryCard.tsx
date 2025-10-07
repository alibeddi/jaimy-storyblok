"use client";


import Link from "next/link";
import { cn } from "@/lib/utils";
import { CategoryCardProps } from "@/types/ui";

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description = "Text text text",
  icon,
  href,
  onClick,
  className,
  ...rest
}) => {
  const cardContent = (
    <div
      className={cn(
        "bg-white rounded-[8px] md:rounded-[10px] shadow-[3px_3px_15px_rgba(0,0,0,0.1)] p-2 md:p-3 lg:p-4 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[3px_3px_20px_rgba(0,0,0,0.2)] group cursor-pointer",
        "w-full h-auto min-h-[120px] md:min-h-[140px] lg:min-h-[160px]",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {/* Icon Container */}
      <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[60px] lg:h-[60px] flex items-center justify-center mb-1 md:mb-2">
        <div className="scale-[0.4] md:scale-[0.5] lg:scale-[0.6]" dangerouslySetInnerHTML={{ __html: icon }} />
      </div>

      {/* Title */}
      <h3 className="text-sm md:text-base lg:text-lg font-[500] text-black mb-0.5 md:mb-1 leading-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-xs lg:text-sm font-[400] text-black leading-tight">
        {description}
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default CategoryCard;
