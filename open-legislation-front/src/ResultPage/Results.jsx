import React, { useEffect, useState } from "react";
import PieChartComponent from "./PieChart";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";

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

function Results() {
  const [completeBill, setCompleteBill] = useState({});
  const [loading, setLoading] = useState(true);
  
  const { billId } = useParams();

  const getSummaryData = async (id) => {
    console.log("getSummaryData", id);
    try {
      const response = await axios.get(
        "https://legapi.asahoo.dev/api/legislation/bill/" + id
      );
      const data = response.data;
      console.log("getSummaryData response", response.data);
      setCompleteBill(data);
      console.log("getSummaryData completeBill", data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("useEffect", billId);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    setLoading(true);
    const fetchData = async () => {
      const data = await getSummaryData(billId);
      setLoading(false);
    };  
    fetchData();
  }, [billId]);

  const getDate = (bill) => {
    const month = months[bill.updateDate.substring(5, 7)];
    const day =
      parseInt(bill.updateDate.substring(8, 10)) >= 10
        ? bill.updateDate.substring(8, 10)
        : bill.updateDate.substring(9, 10);
    const year = bill.updateDate.substring(0, 4);
    return `${month} ${day}, ${year}`;
  };

  const getStyle = (fullName) => {
    return fullName.includes('[D-') ? "text-blue-500" : 
    fullName.includes('[R-') ? "text-red-600" : "";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg">
      {loading ? (
        <div className="h-screen flex justify-center items-center"><HashLoader color="#563478"/></div>
      ) : (<div className="shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-400">Bill Information</h1>

      <div className="text-3xl font-semibold">
        {billId}: {completeBill.bill.title}
      </div>
      <div className="text-gray-700 mt-2">
        Sponsored by:{" "}
        <span className={`font-bold ${getStyle(completeBill.bill.sponsor.fullName)}`}>{completeBill.bill.sponsor.fullName}</span>
      </div>

      <div className="flex flex-row">
        <div className="mt-4 w-full">
          <span className="font-semibold">Bill Co-sponsors:</span>
          <ul className="list-disc pl-5">
            {completeBill.bill.cosponsors.map((cosponsor, index) => (
              <li key={index} className="text-gray-700">
                {cosponsor.fullName}
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <PieChartComponent bill={completeBill.bill} />
        </div>
      </div>
      <div className="mt-4">
        <span className="font-semibold">Status:</span> The bill is currently
        waiting for approval from the{" "}
        <span className="font-medium">{completeBill.bill.latestStage}</span>, since{" "} {getDate(completeBill.bill)}.
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Summary</h2>
        <p className="text-gray-700">{completeBill.analysis.summary}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Potential Impacts</h2>
        <p className="text-gray-700">{completeBill.analysis.potentialImpact}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Most Impacted</h2>
        <p className="text-gray-700">{completeBill.analysis.impactedGroups}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Pros</h2>
        <p className="text-gray-700">{completeBill.analysis.pros}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Cons</h2>
        <p className="text-gray-700">{completeBill.analysis.cons}</p>
      </div></div>)}
    </div>
);
}

export default Results;