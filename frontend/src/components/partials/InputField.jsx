import { useEffect, useState } from "react";

const InputField = ({
  type = "text",
  placeholder,
  rows = 1,
  helperText,
  value,
  onChange,
  ...props
}) => {
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (type === "file") {
      setFilled(true); // Always lifted for file input
    } else {
      setFilled(!!value && value.toString().trim() !== ""); 
    }
  }, [value, type]);

  const handleChange = (e) => {
    if (type === "file") {
      setFilled(true);
    } else {
      setFilled(e.target.value.trim() !== "");
    }

    if (onChange) {
      onChange(e); // Always forward the event
    }
  };

  return (
    <>
      <label className="custom-field">
        {type === "textarea" ? (
          <textarea
            placeholder=""
            rows={rows}
            value={value}
            onChange={handleChange}
            className={filled ? "filled" : ""}
            {...props}
          />
        ) : (
          <input
            type={type}
            placeholder=""
            value={type !== "file" ? value : undefined} 
            onChange={handleChange}
            className={filled ? "filled" : ""}
            {...props}
          />
        )}
        <span className="placeholder">{placeholder}</span>
      </label>
      {helperText && <div className="helper-text">{helperText}</div>}
    </>
  );
};

export default InputField;
