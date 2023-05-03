import React, { useRef, useState, useEffect } from 'react';

const DatePicker = (props) => {
  const [date, setDate] = useState('');
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
  };

    
  return (
    <div>
      <input
        type="date"
        onChange={handleChange}
        ref={dateInputRef}
      />
    </div>
  );
};

export default DatePicker;