import React from 'react';

interface FormSuccessProps {
  message?: string;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  return (
    <div className="form-success">
      <div className="form-success-icon">✓</div>
      <h2 className="form-success-title">Formulaire envoyé avec succès!</h2>
      {message && <p className="form-success-message">{message}</p>}
    </div>
  );
};

export default FormSuccess;
