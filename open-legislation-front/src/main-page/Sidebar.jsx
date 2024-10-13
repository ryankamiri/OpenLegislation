import React, { useState } from 'react'
import Dropdown from './Dropdown';
import NavButton from './NavButton';
import Calendar from './Calendar';
import { DatePicker } from '@mui/x-date-pickers';

function Sidebar({minDate, setMinDate, maxDate, setMaxDate, party, setParty, stage, setStage}) {

    const handleDropdownChange = (setter) => (event) => {
        const value = event.value || (event.target && event.target.value);
        setter(value);
    };

    const parties = [
        { value: 'D', label: 'Democratic' },
        { value: 'R', label: 'Republican' },
        { value: 'I', label: 'Independent' }
    ];

    const stages = [
        {value: 'Introduced', label: 'Introduced'},
        {value: 'House', label: 'House'},
        {value: 'Senate', label: 'Senate'},
        {value: 'President', label: 'President'}
    ]

    return (
        <div className=' min-w-max bg-gray-700 p-4 space-y-2 text-center'>
            <h2 className="text-white text-lg font-semibold">Earliest Date</h2>
            <Calendar value={minDate} onChange={setMinDate} />

            <h2 className="text-white text-lg font-semibold">Latest Date</h2>
            <Calendar value={maxDate} onChange={setMaxDate} />

            <h2 className="text-white text-lg font-semibold">Party</h2>
            <Dropdown items={parties} onChange={handleDropdownChange(setParty)} />

            <h2 className="text-white">Stage</h2>
            <Dropdown items={stages} onChange={handleDropdownChange(setStage)} />

            {/* <NavButton destination='/results' text='Apply'></NavButton> */}
        </div>
    )
}

export default Sidebar;