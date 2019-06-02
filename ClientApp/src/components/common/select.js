import React from 'react';

const Select = ({name, label, onChange, options, value, error}) => {
  let wrapperClass = 'form-group'
  if (error && error.length > 0) {
    wrapperClass += ' has-error'
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
      <select 
        name="type" 
        value={value}
        onChange={onChange} 
        className="form-control"
        >
          { options.map(o => 
            <option key={o.value} value={o.value}>{o.label}</option>
          )}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  )
}

export default Select;