 /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useAnalytics } from "../../analytics/AnalyticsContext";

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
  _uid: string;
  component: "form_field";
}

interface AnalyticsFormStoryblok {
  title?: string;
  description?: string;
  fields?: FormField[];
  submit_text?: string;
  success_message?: string;
  form_name: string;
  track_as_lead?: boolean;
  lead_value?: number;
  event_name?: string;
  redirect_url?: string;
  _uid: string;
  component: "analytics_form";
}

interface AnalyticsFormProps {
  blok: AnalyticsFormStoryblok;
}

export default function AnalyticsForm({ blok }: AnalyticsFormProps) {
  const analytics = useAnalytics();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      const requiredFields =
        blok.fields?.filter((field) => field.required) || [];
      for (const field of requiredFields) {
        if (!formData[field.name]?.trim()) {
          throw new Error(`${field.label} is required`);
        }
      }

      // Simulate form submission (replace with your actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Track successful form submission
      analytics.trackFormSubmission(blok.form_name, true);

      // Track as lead if specified
      if (blok.track_as_lead) {
        analytics.trackLead(blok.lead_value);
      }

      // Track custom event if specified
      if (blok.event_name) {
        analytics.trackCustomEvent(blok.event_name, {
          form_name: blok.form_name,
          form_data: formData,
        });
      }

      setIsSuccess(true);

      // Redirect if specified
      if (blok.redirect_url) {
        setTimeout(() => {
          window.location.href = blok.redirect_url!;
        }, 2000);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);

      // Track failed form submission
      analytics.trackFormSubmission(blok.form_name, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        {...storyblokEditable(blok as any)}
        className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg"
      >
        <h3 className="text-lg font-semibold text-green-800 mb-2">Success!</h3>
        <p className="text-green-700">
          {blok.success_message || "Thank you for your submission."}
        </p>
      </div>
    );
  }

  return (
    <div
      {...storyblokEditable(blok as any)}
      className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
    >
      {blok.title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-900">{blok.title}</h2>
      )}

      {blok.description && (
        <p className="text-gray-600 mb-6">{blok.description}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {blok.fields?.map((field) => (
          <div key={field._uid}>
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Submitting..." : blok.submit_text || "Submit"}
        </button>
      </form>
    </div>
  );
}
