import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function Calendar({ selectedDate, setSelectedDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        className="bg-white rounded"
        value={selectedDate}
        onChange={setSelectedDate}
      />
    </LocalizationProvider>
  );
}

export default Calendar;
