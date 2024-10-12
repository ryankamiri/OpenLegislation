import React, { useState } from 'react'

function Card({ bill={} }) {
    const [billId, setBillId] = useState('');
    const [title, setTitle] = useState('');
    const [congressId, setCongressId] = useState('');
    const [date, setDate] = useState('');
    const [chamber, setChamber] = useState('');
    const [party, setParty] = useState('');
    const [sponsor, setSponsor] = useState('');
    const [status, setStatus] = useState('');

    setBillId(bill['billId']);
    setTitle(bill['title']);
    setCongressId(bill['congressId']);
    setDate(bill['updateDate']);
    setChamber(bill['originChamber']);
    setParty(bill['sponsor']['party']);
    setSponsor(bill['sponsor']['fullName']);
    setStatus(bill['latestStage']);

    return (
        <div>
            <h1>{title}</h1>
            <p>Updated on: {date}</p>
            <p>Bill ID: {billId}</p>
            <p>Congress: {congressId}</p>
            <p>Introduced by: {chamber}</p>
            <p>Sponsor: {sponsor}</p>
            <p>Party of sponsor: {party}</p>
            <p>Current status in Congress: {status}</p>
        </div>
    )
}

export default Card;