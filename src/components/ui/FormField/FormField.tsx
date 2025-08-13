"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { FormFieldProps } from "@/types/ui";

interface ExtendedFormFieldProps extends FormFieldProps {
  name: string;
  note?: string;
}

const FormField: React.FC<ExtendedFormFieldProps> = ({
  className,
  label,
  name,
  required = false,
  note,
  error,
  helpText,
  children,
  ...rest
}) => {
  const fieldClass = cn(
    "space-y-2",
    {
      "text-red-600": error,
    },
    className
  );

  return (
    <div className={fieldClass} {...rest}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="form-field-input">{children}</div>

      {note && <div className="text-sm text-gray-500">{note}</div>}
      {helpText && !error && (
        <div className="text-sm text-gray-500">{helpText}</div>
      )}
      {error && (
        <div className="text-sm text-red-600">
          {typeof error === "string" ? error : "This field has an error"}
        </div>
      )}
    </div>
  );
};

export default FormField;
