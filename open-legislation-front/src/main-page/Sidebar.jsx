import React, { useState } from 'react'
import Dropdown from './Dropdown';
import NavButton from './NavButton';
import Calendar from './Calendar';
import { DatePicker } from '@mui/x-date-pickers';

function Sidebar() {
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [party, setParty] = useState('');
    const [status, setStatus] = useState('');

    const handleDropdownChange = (setter) => (event) => {
        const value = event.value || (event.target && event.target.value);
        setter(value);
    };

    const parties = [
        { value: 'democratic', label: 'Democratic' },
        { value: 'republican', label: 'Republican' },
        { value: 'independent', label: 'Independent' }
    ];

    const statuses = [
        {value: 'introduced', label: 'Introduced'},
        {value: 'senate', label: 'Senate'},
        {value: 'house', label: 'House'},
        {value: 'president', label: 'President'},
    ]

    return (
        <div className=' min-w-max bg-gray-700 p-4 space-y-2 text-center'>
            <h2 className="text-white text-lg font-semibold">Earliest Date</h2>
            <Calendar value={minDate} onChange={setMinDate} />

            <h2 className="text-white text-lg font-semibold">Latest Date</h2>
            <Calendar value={maxDate} onChange={setMaxDate} />

            <h2 className="text-white text-lg font-semibold">Party</h2>
            <Dropdown items={parties} onChange={handleDropdownChange(setParty)} />

            <h2 className="text-white text-lg font-semibold">Status</h2>
            <Dropdown items={statuses} onChange={handleDropdownChange(setStatus)} />

            {/* <NavButton destination='/results' text='Apply'></NavButton> */}
        </div>
    )
}

export default Sidebar;