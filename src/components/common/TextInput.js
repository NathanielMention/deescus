import React from "react";
import PropTypes from "prop-types";
import "../../styles/TextInput.scss";

const TextInput = ({
  name,
  label,
  onChange,
  placeholder,
  value,
  error,
  type,
}) => {
  let wrapperClass = "formGroup";
  if (error && error.length > 0) {
    wrapperClass += " " + "hasError";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type={type || "text"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
};

export default TextInput;
