import React, { useState } from 'react';
import Select from 'react-select';
// import './index.css';

function Dropdown({ items }) {
    const [selectedItem, setSelectedItem] = useState('');

    const change = (item) => {
        setSelectedItem(item);
    }

    return (
        <Select
            value={selectedItem}
            onChange={change}
            options={items}
        />
    );
}

export default Dropdown;