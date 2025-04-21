const InputField = ({ type = 'text', placeholder, rows = 1, helperText, ...props }) => {
  return (
   <>
    <label className="custom-field">
      {type === 'textarea' ? (
        <textarea placeholder="" rows={rows} {...props} />
      ) : (
        <input type={type} placeholder="" {...props} />
      )}
      <span className="placeholder">{placeholder}</span>
    </label>
    {helperText && (
      <div className="helper-text">{helperText}</div>
    )
    }
    </>
  );
};

export default InputField;
