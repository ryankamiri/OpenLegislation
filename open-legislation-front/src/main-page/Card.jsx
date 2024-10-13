

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

    return (
        <div className='bg-gray-400 p-2 space-y-2 mx-4 my-4 rounded-xl drop-shadow-xl'>
            <h1 className='font-bold text-lg'>{bill.title}</h1>
            <p><b>Updated on:</b> {bill.updateDate.substring(0,10)}</p>
            <p><b>Bill ID:</b> {bill.billId}</p>
            <p><b>Congress:</b> {bill.congressId}</p>
            <p><b>Introduced by:</b> {bill.originChamber}</p>
            <p><b>Sponsor:</b> {bill.sponsor.fullName}</p>
            <p><b>Party of sponsor:</b> {bill.sponsor.party}</p>
            <p><b>Current status in Congress:</b> {bill.latestStage}</p>
        </div>
    )
}

export default Card;