const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

const parties = {
    'D': 'Democratic',
    'R': 'Republican',
    'I': 'Independent'
}

const Card = ({ bill }) => {

    console.log(bill);
    // bill = {
    //     billId: 'HR 1234',
    //     title: 'A bill to help the homeless',
    //     congressId: '117th Congress',
    //     updateDate: '2021-09-30',
    //     originChamber: 'House of Representatives',
    //     sponsor: {
    //         party: 'D',
    //         fullName: 'John Doe'
    //     },
    //     latestStage: 'Passed House'
    // }

    // const [billId, setBillId] = useState('');
    // const [title, setTitle] = useState('');
    // const [congressId, setCongressId] = useState('');
    // const [date, setDate] = useState('');
    // const [chamber, setChamber] = useState('');
    // const [party, setParty] = useState('');
    // const [sponsor, setSponsor] = useState('');
    // const [status, setStatus] = useState('');

    // useEffect(() => {
    //     setBillId(bill.billId || '');
    //     setTitle(bill.title || '');
    //     setCongressId(bill.congressId || '');
    //     setDate(bill.updateDate || '');
    //     setChamber(bill.originChamber || '');
    //     setParty(bill.sponsor?.party || '');
    //     setSponsor(bill.sponsor?.fullName || '');
    //     setStatus(bill.latestStage || '');
    // }, [])

    const month = months[bill.updateDate.substring(5,7)];
    const day = parseInt(bill.updateDate.substring(8,10)) >= 10 ? bill.updateDate.substring(8,10) : bill.updateDate.substring(9,10);
    const year = bill.updateDate.substring(0,4);

    return (
        <div className='bg-gray-400 p-2 space-y-2 mx-4 my-4 rounded-xl drop-shadow-xl'>
            <h1 className='font-bold text-lg'>Bill {bill.billId}: {bill.title}</h1>
            <p><b>Updated on:</b> {`${month} ${day}, ${year}`}</p>
            <p><b>Introduced by:</b> {bill.originChamber}</p>
            <p><b>Sponsor:</b> {bill.sponsor.fullName}</p>
            <p><b>Party of sponsor:</b> {parties[bill.sponsor.party]}</p>
            <p><b>Current status in Congress:</b> {bill.latestStage}</p>
        </div>
    )
}

export default Card;