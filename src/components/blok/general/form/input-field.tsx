    /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useField, FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik';
import cn from 'classnames';

type ValidationType = 'email' | undefined;

interface InputFieldBlok {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  validation?: ValidationType;
}

interface InputFieldProps {
  blok: InputFieldBlok;
}

type ValidationFunction = (value: string) => string | undefined;

const InputField: React.FC<InputFieldProps> = ({ blok }) => {
  const {
    name,
    label,
    required,
    placeholder,
    type = 'text',
    validation,
  } = blok;
  
  const [field, meta, helpers]: [FieldInputProps<string>, FieldMetaProps<string>, FieldHelperProps<string>] = useField({
    name,
    type,
    validate: getValidation(validation),
  });
  
  const id = `field-${name}`;
  const hasError = meta.touched && meta.error;

  const inputClasses = cn('form-input', {
    error: hasError,
  });

  return (
    <div className="form-field">
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <input
        {...field}
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
      />

      {hasError && <div className="error-message">{meta.error}</div>}
    </div>
  );
};

const getValidation = (validationType: ValidationType): ValidationFunction | undefined => {
  if (validationType === 'email') {
    return (value: string): string | undefined => {
      if (!value) return undefined;
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(value) ? undefined : 'Adresse email invalide';
    };
  }
  return undefined;
};

export default InputField;