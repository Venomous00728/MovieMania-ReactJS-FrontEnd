import "../../Style/DarkTheme/movieFormDark.css";

const Select = ({ name, label, options, error, mode, ...rest }) => {
  return (
    <div className="form-group formContainer">
      <label className={`label${mode}`} htmlFor={name} id={name}>
        {label}
      </label>
      <select name={name} id={name} {...rest} className={`formInput${mode}`}>
        {label === "Customer" || label === "Genre" ? (
          <option value=""> Select {label}</option>
        ) : (
          <option value=""> {options[0] && options[0].title}</option>
        )}
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {label === "Customer" || label === "Genre"
              ? option.name
              : option.title}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
