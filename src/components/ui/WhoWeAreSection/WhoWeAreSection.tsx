import { BlokImage } from "../BlokImage";
import { Column } from "../Column";
import { Columns } from "../Columns";
import { Container } from "../Container";
import { Heading } from "../Heading";
import Image from "next/image";

export interface WhoWeAreItemProps {
  icon: {
    filename: string;
    alt: string;
    width: number;
    height: number;
  };
  title: string;
  description: string;
}

export interface WhoWeAreSectionProps {
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  mediaAlt?: string;
  features: WhoWeAreItemProps[];
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  featureTitleClassName?: string;
  featureDescriptionClassName?: string;
  mediaClassName?: string;
  featureIconClassName?: string;
}

export function WhoWeAreItem({
  icon,
  title,
  description,
  titleClassName = "text-base md:text-lg font-semibold mb-1",
  descriptionClassName = "text-sm text-gray-600",
  iconClassName = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-2 sm:mb-3",
}: WhoWeAreItemProps & {
  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div className="who-we-are-item mb-6">
      <div className={iconClassName}>
        {icon && (
          <Image
            src={icon?.filename}
            alt={icon?.alt}
            className={iconClassName}
            width={icon?.width || 0}
            height={icon?.height || 0}
          />
        )}
      </div>
      <h3 className={titleClassName}>{title}</h3>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
}

export function WhoWeAreSection({
  title,
  subtitle,
  mediaUrl,
  mediaAlt = "",
  features = [],
  className = "",
  titleClassName = "text-xl sm:text-2xl md:text-3xl font-bold mb-2",
  subtitleClassName = "text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6",
  featureTitleClassName = "text-sm sm:text-base md:text-lg font-semibold mb-1",
  featureDescriptionClassName = "text-xs sm:text-sm text-gray-600",
  mediaClassName = "w-full h-auto rounded-lg shadow-md",
  featureIconClassName = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-2 sm:mb-3",
}: WhoWeAreSectionProps) {
  // Create a safe features array to prevent TypeScript errors
  const safeFeatures: WhoWeAreItemProps[] = features || [];

  return (
    <section className={`py-6 sm:py-8 md:py-10 ${className}`}>
      <Container>
        <Columns className="items-center">
          <Column className="w-full lg:w-1/2 mb-6 sm:mb-8 lg:mb-0">
            {mediaUrl && (
              <div className="media-container">
                <BlokImage
                  asset={{
                    filename: mediaUrl,
                    alt: mediaAlt || "",
                  }}
                  className={mediaClassName}
                />
              </div>
            )}
            {!mediaUrl && (
              <div className="bg-gray-200 rounded-lg flex items-center justify-center p-4 sm:p-6 md:p-8 h-48 sm:h-56 md:h-64">
                <p className="text-gray-500 text-sm sm:text-base">
                  Video or image
                </p>
              </div>
            )}
          </Column>
          <Column className="w-full lg:w-1/2 lg:pl-6 xl:pl-8">
            {title && <Heading className={titleClassName}>{title}</Heading>}
            {subtitle && <p className={subtitleClassName}>{subtitle}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {safeFeatures.map((feature, index) => (
                <WhoWeAreItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  titleClassName={featureTitleClassName}
                  descriptionClassName={featureDescriptionClassName}
                  iconClassName={featureIconClassName}
                />
              ))}
            </div>
          </Column>
        </Columns>
      </Container>
    </section>
  );
}
