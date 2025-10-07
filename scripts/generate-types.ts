import { getStoryblokApi } from "@storyblok/react/rsc";
import fs from "fs";
import path from "path";

interface StoryblokField {
  type: string;
  pos: number;
  key: string;
  bloktypes?: string[];
  maximum?: number;
  minimum?: number;
  regexp?: string;
  restrict_components?: boolean;
  component_whitelist?: string[];
  customize?: unknown;
  translatable?: boolean;
  required?: boolean;
  disallow_copy?: boolean;
  description?: string;
  default_value?: unknown;
}

interface StoryblokComponentSchema {
  name: string;
  display_name: string;
  schema: Record<string, StoryblokField>;
  image?: string;
  preview_field?: string;
  is_root?: boolean;
  is_nestable?: boolean;
  all_presets?: unknown[];
  preset_id?: number;
  real_name?: string;
  component_group_uuid?: string;
}

interface StoryblokSchemaResponse {
  component_groups: unknown[];
  components: StoryblokComponentSchema[];
}

async function generateTypes() {
  try {
    const storyblokApi = getStoryblokApi();
    const response = await storyblokApi.get("cdn/stories", {
      version: "published",
      cv: Date.now(),
    });

    // Fetch component schema from Storyblok
    const schemaResponse = await fetch(
      `https://api.storyblok.com/v2/cdn/stories?token=${process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN}&cv=${Date.now()}`
    );

    if (!schemaResponse.ok) {
      throw new Error("Failed to fetch schema from Storyblok");
    }

    const schema: StoryblokSchemaResponse = await schemaResponse.json();

    let typesOutput = `// Auto-generated types from Storyblok schema
// Generated on: ${new Date().toISOString()}
// Run this script to regenerate types when schema changes

export interface StoryblokComponent<T extends string = string> {
  _uid: string;
  component: T;
  [key: string]: unknown;
}

`;

    // Generate types for each component
    schema.components.forEach((component) => {
      const componentName =
        component.name.charAt(0).toUpperCase() + component.name.slice(1);
      const interfaceName = `${componentName}Blok`;

      typesOutput += `export interface ${interfaceName} extends StoryblokComponent<'${component.name}'> {\n`;

      Object.entries(component.schema).forEach(([key, field]) => {
        const fieldType = getTypeScriptType(field);
        const optional = field.required ? "" : "?";
        const description = field.description ? ` // ${field.description}` : "";

        typesOutput += `  ${key}${optional}: ${fieldType};${description}\n`;
      });

      typesOutput += `}\n\n`;
    });

    // Generate union type
    const componentNames = schema.components.map(
      (c) => `${c.name.charAt(0).toUpperCase() + c.name.slice(1)}Blok`
    );

    typesOutput += `// Union type for all possible bloks
export type StoryblokBlok = ${componentNames.join(" | ")};\n`;

    // Write to file
    const outputPath = path.join(
      process.cwd(),
      "src",
      "types",
      "generated-storyblok.ts"
    );
    fs.writeFileSync(outputPath, typesOutput);

    console.log(`✅ Types generated successfully at: ${outputPath}`);
    console.log(`📝 Generated ${schema.components.length} component types`);
  } catch (error) {
    console.error("❌ Error generating types:", error);
    process.exit(1);
  }
}

function getTypeScriptType(field: StoryblokField): string {
  switch (field.type) {
    case "text":
    case "textarea":
    case "markdown":
    case "email":
    case "url":
      return "string";

    case "number":
      return "number";

    case "boolean":
      return "boolean";

    case "date":
      return "string";

    case "datetime":
      return "string";

    case "asset":
      return `{
        filename: string;
        alt?: string;
      }`;

    case "bloks":
      if (field.bloktypes && field.bloktypes.length > 0) {
        const blokTypes = field.bloktypes.map(
          (type) => `${type.charAt(0).toUpperCase() + type.slice(1)}Blok`
        );
        return `Array<${blokTypes.join(" | ")}>`;
      }
      return "Array<StoryblokComponent>";

    case "option":
      if (
        field.customize &&
        typeof field.customize === "object" &&
        field.customize !== null
      ) {
        const customize = field.customize as {
          options?: Array<{ value: string }>;
        };
        if (customize.options) {
          const options = customize.options
            .map((opt) => `"${opt.value}"`)
            .join(" | ");
          return options || "string";
        }
      }
      return "string";

    case "link":
      return `{
        cached_url: string;
      }`;

    case "multilink":
      return `{
        cached_url: string;
      }`;

    case "table":
      return "Array<Record<string, unknown>>";

    case "richtext":
      return "string";

    default:
      return "unknown";
  }
}

// Run the generator
generateTypes();
