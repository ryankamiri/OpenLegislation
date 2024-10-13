import React from "react";
import Select from "react-select";
import NavButton from "./NavButton";
import Calendar from "./Calendar";

const SideBar = ({
  minDate,
  setMinDate,
  maxDate,
  setMaxDate,
  party,
  setParty,
  stage,
  setStage,
}) => {
  // const handleDropdownChange = (setter) => (event) => {
  //     const value = event.value || (event.target && event.target.value);
  //     setter(value);
  // };

  const parties = [
    { value: null, label: "None " },
    { value: "D", label: "Democratic" },
    { value: "R", label: "Republican" },
    { value: "I", label: "Independent" },
  ];

  const stages = [
    { value: null, label: "None " },
    { value: "Introduced", label: "Introduced" },
    { value: "House", label: "House" },
    { value: "Senate", label: "Senate" },
    { value: "President", label: "President" },
  ];

  return (
    <div className=" min-w-max bg-gray-700 p-4 space-y-2 text-center">
      <h2 className="text-white text-lg font-semibold">Earliest Date</h2>
      <Calendar selectedDate={minDate} setSelectedDate={setMinDate} />

      <h2 className="text-white text-lg font-semibold">Latest Date</h2>
      <Calendar selectedDate={maxDate} setSelectedDate={setMaxDate} />

      <h2 className="text-white text-lg font-semibold">Party</h2>
      <Select
        value={party}
        onChange={(item) => setParty(item)}
        options={parties}
      />

      <h2 className="text-white">Stage</h2>
      <Select
        value={stage}
        onChange={(item) => setStage(item)}
        options={stages}
      />

      {/* <NavButton destination='/results' text='Apply'></NavButton> */}
    </div>
  );
};

export default SideBar;
