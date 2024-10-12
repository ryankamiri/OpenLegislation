import React, { useState } from 'react'
import Dropdown from './Dropdown';

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
        {value: 'committee consideration', label: 'Committee Consideration'},
        {value: 'floor consideration', label: 'Floor Consideration'},
        {value: 'failed one chamber', label: 'Failed One Chamber'},
        {value: 'passed one chamber', label: 'Passed One Chamber'},
        {value: 'passed both chambers', label: 'Passed Both Chambers'},
        {value: 'resolving differences', label: 'Resolving Differences'},
        {value: 'to president', label: 'To President'},
        {value: 'veto actions', label: 'Veto actions'},
    ]

    return (
        <div>
            <h2>Date</h2>
            <div>
                <h3>Start</h3>
                <input
                    type="text"
                    onChange={(e) => setMinDate(e.target.value)} 
                    placeholder="Enter start date"
                />
            </div>
            <div>
                <h3>End</h3>
                <input
                    type="text"
                    onChange={(e) => setMaxDate(e.target.value)} 
                    placeholder="Enter end date"
                />
            </div>

            <h2>Party</h2>
            <Dropdown items={parties} onChange={handleDropdownChange(setParty)} />

            <h2>Status</h2>
            <Dropdown items={statuses} onChange={handleDropdownChange(setStatus)} />
        </div>
    )
}

export default Sidebar;