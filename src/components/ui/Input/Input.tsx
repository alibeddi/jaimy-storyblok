"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { InputProps } from "@/types/ui";

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      className,
      type = "text",
      name,
      value,
      placeholder,
      required = false,
      disabled = false,
      readOnly = false,
      autoComplete,
      autoFocus = false,
      tabIndex,
      onChange,
      onBlur,
      onFocus,
      error,
      label,
      helpText,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || name;

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange?.(e.target.value);
    };

    const baseStyles = cn(
      "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
      "file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-red-500 focus-visible:ring-red-500",
      className
    );

    const InputComponent = type === "textarea" ? "textarea" : "input";

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <InputComponent
          ref={ref as React.Ref<HTMLInputElement & HTMLTextAreaElement>}
          id={inputId}
          name={name}
          type={type === "textarea" ? undefined : type}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          tabIndex={tabIndex}
          onChange={handleChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={baseStyles}
          rows={type === "textarea" ? 4 : undefined}
          {...rest}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        {helpText && !error && (
          <p className="text-sm text-muted-foreground">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
