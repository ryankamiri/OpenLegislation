import React, { useEffect, useState } from "react";
import PieChartComponent from "./PieChart";
import { useParams } from "react-router-dom";
import axios from "axios";

function Results() {
  const [completeBill, setCompleteBill] = useState({});
  const [totalRepublicanCosponsors, setTotalRepublicanCosponsors] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const { billId } = useParams();

  const getSummaryData = async (id) => {
    console.log("getSummaryData", id);
    try {
      const response = await axios.get(
        "https://legapi.asahoo.dev/api/legislation/bill/" + id
      );
      setCompleteBill(response.data);
      console.log("getSummaryData response", response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  let tally = [];
  function counter() {
    console.log(completeBill);
    if (completeBill.bill.sponsor.party === "R") {
      tally.push(completeBill.bill.sponsor.party);
    }
    for (let i = 0; i < completeBill.bill.cosponsors.length; i++) {
      if (completeBill.bill.cosponsors[i].party === "R") {
        tally.push(completeBill.bill.cosponsors[i].party);
      }
    }
    return completeBill.bill.cosponsors.length + 1;
  }

  function partyPercentage(total) {
    return (tally.length / total) * 100;
  }

  useEffect(() => {
    console.log("useEffect", billId);
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const fetchData = async () => {
      await getSummaryData(billId);
      await wait(10000);
      console.log("useEffect timeout", billId);
    };  
    fetchData();
  }, [billId]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* <h1 className="text-2xl font-bold mb-4 text-gray-400">Bill Information</h1>

      <div className="text-3xl font-semibold">
        {billId}: {completeBill.bill.title}
      </div>
      <div className="text-gray-700 mt-2">
        Sponsored by:{" "}
        <span className="font-bold">{completeBill.bill.sponsor.fullName}</span>
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
          <PieChartComponent percentage={percentage} />
        </div>
      </div>
      <div className="mt-4">
        <span className="font-semibold">Status:</span> The bill is currently
        waiting for approval from the{" "}
        <span className="font-medium">{completeBill.bill.latestStage}</span>, since{" "}
        {completeBill.bill.updateDate}
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
      </div> */}
    </div>
);
}

export default Results;