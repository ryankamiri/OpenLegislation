import { useNavigate } from "react-router-dom";

const months = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December",
};

const parties = {
  D: "Democratic",
  R: "Republican",
  I: "Independent",
};

const Card = ({ bill }) => {
  const month = months[bill.updateDate.substring(5, 7)];
  const day =
    parseInt(bill.updateDate.substring(8, 10)) >= 10
      ? bill.updateDate.substring(8, 10)
      : bill.updateDate.substring(9, 10);
  const year = bill.updateDate.substring(0, 4);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Clicked", "navigating to", `/results/${bill.billId}`);
    navigate(`/results/${bill.billId}`);
  };

  return (
    <div className="bg-gray-200 hover:shadow-lg p-4 space-y-2 mx-4 my-4 rounded-xl drop-shadow-xl"
    onClick={() => handleClick()}>
      <div className="flex flex-row">
      <h1 className="font-bold text-lg w-full hover:underline">
        Bill {bill.billId}: {bill.title} 
      </h1>
      <p className="text-right w-full">
        <b>Updated on:</b> {`${month} ${day}, ${year}`}
      </p>
      
      </div>
      
      <p>
        <b>Introduced by:</b> {bill.originChamber}
      </p>
      <div className="flex flex-row">
      <p className={`w-full `}>
        <b>Sponsor:</b>
        <span 
        className={`pl-2 
        ${bill.sponsor.fullName.includes('[D-') ? "text-blue-500" : ""}
        ${bill.sponsor.fullName.includes('[R-') ? "text-red-600" : ""}
        `}>
        {bill.sponsor.fullName}</span> 
      </p>
      <span className="bg-green-300 rounded-lg p-2 my-auto whitespace-nowrap">Currently at: {bill.latestStage}</span>
      </div>
      {/* <p>
        <b>Party of sponsor:</b> {parties[bill.sponsor.party]}
      </p> */}
      {/* <p>
        <b>Current status in Congress:</b> {bill.latestStage}
      </p> */}
    </div>
  );
};

export default Card;
