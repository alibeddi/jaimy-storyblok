  /* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface Step {
  name?: string;
  [key: string]: any;
}

interface FormStepsProps {
  steps: Step[];
  activeStep: number;
}

const FormSteps: React.FC<FormStepsProps> = ({ steps, activeStep }) => {
  return (
    <div className="form-steps">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`form-step ${index === activeStep ? 'active' : ''} ${
            index < activeStep ? 'completed' : ''
          }`}
        >
          <div className="form-step-number">{index + 1}</div>
          <div className="form-step-label">
            {step.name || `Étape ${index + 1}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormSteps;