import React, { useEffect, useState } from 'react'

function Card({ bill={} }) {
    const [billId, setBillId] = useState('');
    const [title, setTitle] = useState('');
    const [congressId, setCongressId] = useState('');
    const [date, setDate] = useState('');
    const [chamber, setChamber] = useState('');
    const [party, setParty] = useState('');
    const [sponsor, setSponsor] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setBillId(bill['billId']);
        setTitle(bill['title']);
        setCongressId(bill['congressId']);
        setDate(bill['updateDate']);
        setChamber(bill['originChamber']);
        setParty(bill['sponsor']['party']);
        setSponsor(bill['sponsor']['fullName']);
        setStatus(bill['latestStage']);
    })

    return (
        <div className='bg-gray-400 p-2 space-y-2 mx-4 my-4 rounded-xl drop-shadow-xl'>
            <h1 className='font-bold text-lg'>{title}</h1>
            <p><b>Updated on:</b> {date.substring(0,10)}</p>
            <p><b>Bill ID:</b> {billId}</p>
            <p><b>Congress:</b> {congressId}</p>
            <p><b>Introduced by:</b> {chamber}</p>
            <p><b>Sponsor:</b> {sponsor}</p>
            <p><b>Party of sponsor:</b> {party}</p>
            <p><b>Current status in Congress:</b> {status}</p>
        </div>
    )
}

export default Card;