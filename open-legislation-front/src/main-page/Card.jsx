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
  10: "October",
  11: "November",
  12: "December",
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
    <div className="bg-gray-400 p-2 space-y-2 mx-4 my-4 rounded-xl drop-shadow-xl"
    onClick={() => handleClick()}>
      <h1 className="font-bold text-lg">
        Bill {bill.billId}: {bill.title}
      </h1>
      <p>
        <b>Updated on:</b> {`${month} ${day}, ${year}`}
      </p>
      <p>
        <b>Introduced by:</b> {bill.originChamber}
      </p>
      <p>
        <b>Sponsor:</b> {bill.sponsor.fullName}
      </p>
      <p>
        <b>Party of sponsor:</b> {parties[bill.sponsor.party]}
      </p>
      <p>
        <b>Current status in Congress:</b> {bill.latestStage}
      </p>
    </div>
  );
};

export default Card;
