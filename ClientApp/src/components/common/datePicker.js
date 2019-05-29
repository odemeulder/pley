import React from 'react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const PleyDatePicker = ({name, label, onChange, value, error}) => {
  let wrapperClass = 'form-group'
  if (error && error.length > 0) {
    wrapperClass += ' has-error'
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
      <DatePicker
        name={name}
        selected={value}
        onChange={onChange}
        dateFormat="yyyy/MM/dd"
      />
      {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  )
}

export default PleyDatePicker;