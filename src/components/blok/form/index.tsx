/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, createContext, ChangeEvent, FormEvent, FocusEvent } from 'react';
import { StoryblokComponent } from '@storyblok/react';

interface FormContextType {
  values: Record<string, string>;
  errors: Record<string, string>;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const FormContext = createContext<FormContextType>({
  values: {},
  errors: {},
  handleChange: () => {},
  handleBlur: () => {},
  handleSubmit: () => {},
});

interface FormStep {
  name?: string;
  required_fields?: string[];
  _uid: string;
  [key: string]: any;
}

interface FormBlok {
  id?: string;
  content?: FormStep[];
  success_message?: string;
  redirect_url?: string;
  submit_button_text?: string;
}

interface FormProps {
  blok: FormBlok;
}

const Form: React.FC<FormProps> = ({ blok }) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (
      blok.content?.[activeStep]?.required_fields?.includes(name) &&
      !value.trim()
    ) {
      setErrors((prev) => ({
        ...prev,
        [name]: 'Ce champ est requis',
      }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentStep = blok.content?.[activeStep];
    const requiredFields = currentStep?.required_fields || [];

    const newErrors: Record<string, string> = {};
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!values[field] || !values[field].trim()) {
        newErrors[field] = 'Ce champ est requis';
        isValid = false;
      }
    });

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    if (activeStep === (blok.content?.length || 0) - 1) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsCompleted(true);
        setIsSubmitting(false);
      }, 1000);
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  if (!blok.content || blok.content.length === 0) {
    return null;
  }

  const formContextValue: FormContextType = {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };

  return (
    <div
      id={blok.id}
      ref={formRef}
      className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {!isCompleted ? (
        <>
          {blok.content.length > 1 && (
            <div className="flex justify-between mb-8 relative">
              {blok.content.map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center relative z-10 ${
                    index === activeStep
                      ? 'text-primary-500 font-bold'
                      : index < activeStep
                      ? 'text-primary-300'
                      : 'text-gray-400'
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${
                      index === activeStep
                        ? 'bg-primary-500 text-white'
                        : index < activeStep
                        ? 'bg-primary-300 text-white'
                        : 'bg-gray-200'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-sm">
                    {step.name || `Étape ${index + 1}`}
                  </span>
                </div>
              ))}

              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-0">
                <div
                  className="h-0.5 bg-primary-500"
                  style={{
                    width: `${(activeStep / (blok.content.length - 1)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          )}

          <FormContext.Provider value={formContextValue}>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="space-y-6">
                {blok.content[activeStep] && (
                  <StoryblokComponent blok={blok.content[activeStep]} />
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep((prev) => prev - 1)}
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                  >
                    Précédent
                  </button>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 bg-[rgb(var(--color-primary-500))] text-white rounded hover:bg-[rgb(var(--color-primary-600))] focus:outline-none"
                  disabled={isSubmitting}
                >
                  {activeStep === blok.content.length - 1
                    ? blok.submit_button_text || 'Envoyer'
                    : 'Suivant'}
                  {isSubmitting && (
                    <span className="ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                </button>
              </div>
            </form>
          </FormContext.Provider>
        </>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">
            Formulaire envoyé avec succès!
          </h2>
          {blok.success_message && (
            <p className="text-gray-600">{blok.success_message}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;