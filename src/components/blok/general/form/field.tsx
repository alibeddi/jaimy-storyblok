    /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement, cloneElement } from 'react';
import { useField, FieldInputProps, FieldMetaProps } from 'formik';
import cn from 'classnames';

interface FieldProps {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
  children: ReactElement<any>;
  className?: string;
  [key: string]: any; // For additional props
}

const Field: React.FC<FieldProps> = ({
  name,
  label,
  type,
  required = false,
  children,
  className,
  ...props
}) => {
  const [field, meta] = useField({ name, type });
  const id = `field-${name}`;
  const hasError = meta.touched && meta.error;

  const fieldClasses = cn('form-field', className, { 'has-error': hasError });

  
  const childProps = children.props as { className?: string; [key: string]: any };
  
  return (
    <div className={fieldClasses}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      {cloneElement(children, {
        ...field,
        id,
        ...props,
        className: cn(childProps.className, { error: hasError }),
      })}

      {hasError && <div className="error-message">{meta.error}</div>}
    </div>
  );
};

export default Field;