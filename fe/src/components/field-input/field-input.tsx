import React, { useMemo } from "react";

import { ErrorMessage } from "formik";
import Text from "components/text";

import "./style.scss";

interface FieldInputProps {
  label?: string;
  block?: boolean;
  type?: "email" | "password";
  placeholder?: string;
  disabled?: boolean;
  style?: React.CSSProperties;

  field: {
    name: string;
    value: string;
    onBlur: any;
    onChange: any;
  };
  form: {
    errors: any;
    touched: any;
  };
}

const owlClass = "field-input";

const FieldInput: React.FC<FieldInputProps> = ({
  style,
  block,
  label,
  type = "text",
  placeholder,
  disabled,

  field,
  form,
  ...resProps
}) => {
  const isError = form.errors[field.name] && form.touched[field.name];

  const finalOwlClass = useMemo(() => {
    let className = owlClass;
    if (block) {
      className += ` ${owlClass}--block`;
    }
    if (isError) {
      className += ` ${owlClass}--invalid-form`;
    }
    return className;
  }, [block, isError]);

  return (
    <div className={finalOwlClass} style={style}>
      {!!label && (
        <label htmlFor={field.name} className={`${owlClass}__label`}>
          {label}
        </label>
      )}
      <input
        className={`${owlClass}__input`}
        id={field.name}
        {...field}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
      />
      <div className={`${owlClass}__error-message`}>
        <ErrorMessage name={field.name}>
          {(msg) => <Text color="error">{msg ? msg : ""}</Text>}
        </ErrorMessage>
      </div>
    </div>
  );
};

export default FieldInput;
