import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = ({ date, setDate}) => {
    // const [selectedDate, setSelectedDate] = useState(null);

    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 5); // Minimum date is 5 days from today
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 35); // Maximum date is 35 days from today

    const isWeekday = (date) => {
        const day = date.getDay();
        return day !== 0 && day !== 6; // Disable weekends
    };

    return (
<div className="ml-6 mt-0 ">
        <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={minDate}
            maxDate={maxDate}
            filterDate={isWeekday}
            placeholderText="Enter cargo ready date"
                className="bg-input-background text-start focus:outline-none h-9 w-[76%] rounded-md px-5 w-full py-4 border border-black ml-12 mt-0"
        />
</div>
    );
};

export default DateSelector;
