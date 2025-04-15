const InputField = ({ type = 'text', placeholder, rows = 1, ...props }) => {
  return (
    <label className="custom-field">
      {type === 'textarea' ? (
        <textarea placeholder=" " rows={rows} {...props} />
      ) : (
        <input type={type} placeholder=" " {...props} />
      )}
      <span className="placeholder">{placeholder}</span>
    </label>
  );
};

export default InputField;
