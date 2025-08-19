"use client";

import React, { useState, useEffect } from "react";
import { SbBlokData, storyblokEditable } from "@storyblok/react";
import {
  trackFormSubmission,
  trackFormFieldInteraction,
} from "@/components/analytics/AnytrackUtils";

interface AnytrackFormBlok {
  component: string;
  _uid: string;
  form_title: string;
  form_description?: string;
  form_fields: Array<{
    name: string;
    type:
      | "text"
      | "email"
      | "tel"
      | "textarea"
      | "select"
      | "checkbox"
      | "radio";
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: string[];
    validation?: string;
  }>;
  submit_button_text?: string;
  success_message?: string;
  error_message?: string;
  track_conversions?: boolean;
  conversion_value?: number;
  conversion_currency?: string;
  track_lead_generation?: boolean;
  lead_value?: number;
  lead_currency?: string;
  custom_event_name?: string;
  custom_event_properties?: Record<string, unknown>;
  [key: string]: unknown;
}

interface AnytrackFormProps {
  blok: AnytrackFormBlok;
}

const AnytrackForm: React.FC<AnytrackFormProps> = ({ blok }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    // Initialize form data with empty values
    const initialData: Record<string, unknown> = {};
    blok.form_fields.forEach((field) => {
      if (field.type === "checkbox") {
        initialData[field.name] = false;
      } else if (
        field.type === "select" &&
        field.options &&
        field.options.length > 0
      ) {
        initialData[field.name] = field.options[0];
      } else {
        initialData[field.name] = "";
      }
    });
    setFormData(initialData);
  }, [blok.form_fields]);

  const handleInputChange = (
    name: string,
    value: unknown,
    action: "focus" | "blur" | "change"
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Track field interaction
    trackFormFieldInteraction(blok.form_title, name, action);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Track successful form submission
      trackFormSubmission(blok.form_title, true, formData);

      // Track conversion if enabled
      if (blok.track_conversions) {
        // This would integrate with your conversion tracking system
        console.log("Conversion tracked:", {
          value: blok.conversion_value,
          currency: blok.conversion_currency || "EUR",
        });
      }

      // Track lead generation if enabled
      if (blok.track_lead_generation) {
        // This would integrate with your lead tracking system
        console.log("Lead tracked:", {
          value: blok.lead_value,
          currency: blok.lead_currency || "EUR",
        });
      }

      // Track custom event if specified
      if (blok.custom_event_name) {
        // This would integrate with your custom event tracking
        console.log("Custom event tracked:", {
          name: blok.custom_event_name,
          properties: blok.custom_event_properties,
        });
      }

      setSubmitStatus("success");

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({});
        setSubmitStatus("idle");
      }, 3000);
    } catch (error: unknown) {
      console.error("Form submission error:", error);

      // Track failed form submission
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      trackFormSubmission(blok.form_title, false, { error: errorMessage });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: AnytrackFormBlok["form_fields"][0]) => {
    const baseClassName =
      "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            id={field.name}
            name={field.name}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange(field.name, e.target.value, "change")
            }
            onFocus={() =>
              handleInputChange(field.name, formData[field.name], "focus")
            }
            onBlur={() =>
              handleInputChange(field.name, formData[field.name], "blur")
            }
            required={field.required}
            rows={4}
            placeholder={field.placeholder}
            value={String(formData[field.name] ?? "")}
            className={`${baseClassName} resize-vertical`}
          />
        );

      case "select":
        return (
          <select
            id={field.name}
            name={field.name}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange(field.name, e.target.value, "change")
            }
            onFocus={() =>
              handleInputChange(field.name, formData[field.name], "focus")
            }
            onBlur={() =>
              handleInputChange(field.name, formData[field.name], "blur")
            }
            required={field.required}
            value={String(formData[field.name] ?? "")}
            className={`${baseClassName} cursor-pointer`}
          >
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={Boolean(formData[field.name])}
            onChange={(e) =>
              handleInputChange(field.name, e.target.checked, "change")
            }
            onFocus={() =>
              handleInputChange(field.name, formData[field.name], "focus")
            }
            onBlur={() =>
              handleInputChange(field.name, formData[field.name], "blur")
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        );

      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={(e) =>
                    handleInputChange(field.name, e.target.value, "change")
                  }
                  onFocus={() =>
                    handleInputChange(field.name, formData[field.name], "focus")
                  }
                  onBlur={() =>
                    handleInputChange(field.name, formData[field.name], "blur")
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            id={field.name}
            name={field.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(field.name, e.target.value, "change")
            }
            onFocus={() =>
              handleInputChange(field.name, formData[field.name], "focus")
            }
            onBlur={() =>
              handleInputChange(field.name, formData[field.name], "blur")
            }
            required={field.required}
            type={field.type}
            placeholder={field.placeholder}
            value={String(formData[field.name] ?? "")}
            className={baseClassName}
          />
        );
    }
  };

  return (
    <div
      {...storyblokEditable(blok as unknown as SbBlokData)}
      className="max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {blok.form_title && (
          <h3 className="text-lg font-semibold text-gray-900">
            {blok.form_title}
          </h3>
        )}

        {blok.form_description && (
          <p className="text-sm text-gray-600">{blok.form_description}</p>
        )}

        <div className="space-y-4">
          {blok.form_fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <label
                htmlFor={field.name}
                className="block text-sm font-medium text-gray-700"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {renderField(field)}

              {field.validation && (
                <p className="text-xs text-gray-500">{field.validation}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : blok.submit_button_text || "Submit"}
        </button>

        {submitStatus === "success" && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {blok.success_message || "Form submitted successfully!"}
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {blok.error_message || "An error occurred. Please try again."}
          </div>
        )}
      </form>
    </div>
  );
};

export default AnytrackForm;
