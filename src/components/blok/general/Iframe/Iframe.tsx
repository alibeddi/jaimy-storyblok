import { IframeBlok } from "@/types/storyblok";
import React from "react";
import { SpacingVariant } from "@/types/ui";
import cn from "classnames";
import { storyblokEditable } from "@storyblok/react";

interface IframeProps {
  blok: IframeBlok;
}

const Iframe: React.FC<IframeProps> = ({ blok }) => {
  const marginBottomClasses: Record<SpacingVariant, string> = {
    none: "mb-0",
    xs: "mb-1",
    sm: "mb-4",
    default: "mb-6",
    md: "mb-8",
    lg: "mb-12",
    xl: "mb-16",
  };

  const className = cn({
    [marginBottomClasses[(blok.margin_bottom as SpacingVariant) || "default"]]:
      true,
    "w-full flex justify-center items-center min-h-fit": true,
  });

  const formId = blok.formId || "";
  const width = blok.width || "100%";
  const height = blok.height || "400";
  const locale = blok.locale || "fr";
  const sandbox =
    blok.sandbox || "allow-same-origin allow-scripts allow-popups allow-forms";

  return (
    <div {...storyblokEditable(blok)} className={className}>
      <iframe
        id="formsIframe"
        src={`https://forms.fixxer.eu/${locale}/${formId}`}
        width={width}
        height={height}
        sandbox={sandbox}
        className="rounded border-0 overflow-hidden mx-auto block"
        style={{ overflow: "hidden" }}
        scrolling="no"
        title="Embedded form"
        data-blok-field="formId"
      />
    </div>
  );
};

export default Iframe;
