import React, { useContext } from 'react';
import classNames from 'classnames';

import { FormContext } from '../form';

interface InputFieldBlok {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  note?: string;
  required?: boolean;
}

interface InputFieldProps {
  blok: InputFieldBlok;
}

const InputField: React.FC<InputFieldProps> = ({ blok }) => {
  const { values, errors, handleChange, handleBlur } = useContext(FormContext);

  const fieldName = blok.name;
  const hasError = errors[fieldName];

  return (
    <div className="w-full mb-4">
      <label
        htmlFor={fieldName}
        className="block text-md font-semibold mb-2 text-left"
      >
        {blok.label}
        {blok.required && <span className="text-gray-800 ml-1">*</span>}
      </label>

      <input
        type={blok.type || 'text'}
        name={fieldName}
        id={fieldName}
        placeholder={blok.placeholder || ''}
        value={values[fieldName] || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        required={blok.required}
        className={classNames(
          'w-full px-4 py-2 border border-gray-300 rounded-sm',
          'focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800',
          'placeholder:text-gray-400',
          {
            'border-gray-800 bg-red-50': hasError,
          }
        )}
      />

      {hasError && <p className="text-gray-800 text-sm mt-1">{hasError}</p>}

      {blok.note && <p className="text-gray-500 text-xs mt-1">{blok.note}</p>}
    </div>
  );
};

export default InputField;