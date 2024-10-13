import React, { useEffect } from "react";
import MainPage from "../main-page/MainPage";
import { json } from "react-router-dom";
import PieChartComponent from "./PieChart";

function Results() {
  const jsonData = {
    bill: {
      latestAction: {
        actionDate: "2024-09-27T00:00:00.000Z",
        text: "Held at the desk.",
      },
      _id: "670ad88d8dc7cc1af018b4eb",
      billId: 1570,
      title: "Bottles and Breastfeeding Equipment Screening Enhancement Act",
      congressId: 118,
      originChamber: "Senate",
      updateDate: "2024-09-28T00:00:00.000Z",
      latestStage: "President",
      sponsor: {
        bioguideId: "D000622",
        firstName: "Tammy",
        fullName: "Sen. Duckworth, Tammy [D-IL]",
        isByRequest: "N",
        lastName: "Duckworth",
        party: "D",
        state: "IL",
        url: "https://api.congress.gov/v3/member/D000622?format=json",
      },
      cosponsors: [
        {
          bioguideId: "D000618",
          firstName: "Steve",
          fullName: "Sen. Daines, Steve [R-MT]",
          isOriginalCosponsor: true,
          lastName: "Daines",
          party: "R",
          sponsorshipDate: "2023-05-11",
          state: "MT",
          url: "https://api.congress.gov/v3/member/D000618?format=json",
        },
        {
          bioguideId: "H001042",
          firstName: "Mazie",
          fullName: "Sen. Hirono, Mazie K. [D-HI]",
          isOriginalCosponsor: true,
          lastName: "Hirono",
          middleName: "K.",
          party: "D",
          sponsorshipDate: "2023-05-11",
          state: "HI",
          url: "https://api.congress.gov/v3/member/H001042?format=json",
        },
        {
          bioguideId: "C001098",
          firstName: "Ted",
          fullName: "Sen. Cruz, Ted [R-TX]",
          isOriginalCosponsor: false,
          lastName: "Cruz",
          party: "R",
          sponsorshipDate: "2024-01-30",
          state: "TX",
          url: "https://api.congress.gov/v3/member/C001098?format=json",
        },
      ],
      billUrl: "https://api.congress.gov/v3/bill/118/s/1570?format=json",
      textUrl: "https://www.congress.gov/118/bills/s1570/BILLS-118s1570es.htm",
      createdAt: "2024-10-12T20:14:05.909Z",
      updatedAt: "2024-10-12T20:14:05.909Z",
      __v: 0,
    },
    analysis: {
      summary:
        "The Bottles and Breastfeeding Equipment Screening Enhancement Act mandates the TSA and private security personnel to ensure hygienic handling of breast milk and baby formula during aviation security screening. The TSA must develop guidance to minimize contamination risks and conduct audits to assess compliance and the effectiveness of screening technologies.",
      potentialImpact:
        "This bill improves the safety and hygiene of breast milk and baby formula during air travel. It could reduce health risks for infants and increase comfort for breastfeeding mothers. By establishing clear protocols, it may also streamline the screening process, benefiting both families and security personnel.",
      impactedGroups:
        "Mothers breastfeeding during air travel, infants consuming breast milk or baby formula, Transportation Security Administration personnel, and private security screening companies.",
      pros: "The bill enhances safety measures for infants by ensuring hygienic handling of essential food items like breast milk. It supports breastfeeding mothers during travel, promoting maternal health. Additionally, developing standardized guidelines may improve the overall efficiency of security checks, easing the stress on families while traveling.",
      cons: "Implementing the guidelines may create additional work for TSA agents and private screening companies, potentially leading to longer wait times. There may be challenges in training staff to adhere to these new standards. It's also possible that the bill could encounter resistance from security personnel due to workflow changes.",
    },
  };

  const jasonData = {
    bill: {
      sponsor: {
        party: "D",
      },
      cosponsors: [
        {
          party: "R",
        },
        {
          party: "D",
        },
        {
          party: "R",
        },
        {
          party: "R",
        },
      ],
    },
  };
  const billInfo = jsonData.bill;
  const billAnalysor = jsonData.analysis;

  let tally = [];
  function counter() {
    if (jasonData.bill.sponsor.party === "R") {
      tally.push(jasonData.bill.sponsor.party);
    }
    for (let i = 0; i < jasonData.bill.cosponsors.length; i++) {
      if (jasonData.bill.cosponsors[i].party === "R") {
        tally.push(jasonData.bill.cosponsors[i].party);
      }
    }
    return jasonData.bill.cosponsors.length + 1;
  }

  function partyPercentage(total) {
    console.log(tally.length, total);
    return (tally.length / total) * 100;
  }
  // function counter() {
  //     if(billInfo.sponsor.party === "R"){
  //     tally.push(billInfo.sponsor.party);
  //     }
  //     for (let i = 0; i < billInfo.cosponsors.length; i++) {
  //         if (billInfo.cosponsors[i].party === "R") {
  //             tally.push(billInfo.cosponsors[i].party);
  //         }
  //     }
  //     let total = tally.length;
  //     return total;
  // }

  // function partyPercentage(total) {
  //     return ((total / billInfo.cosponsors.length) * 100);
  // }
  // let totalRepublicanCosponsors = 0;
  // let percentage = 0;
  // useEffect(() => {

  // }, []);
  const totalRepublicanCosponsors = counter();
  const percentage = partyPercentage(totalRepublicanCosponsors);
  console.log("Republican percentage", percentage);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-400">
        Bill Information
      </h1>

      <div className="text-3xl font-semibold">
        {billInfo.billId}: {billInfo.title}
      </div>
      <div className="text-gray-700 mt-2">
        Sponsored by:{" "}
        <span className="font-bold ">{billInfo.sponsor.fullName}</span>
      </div>

      <div className="flex flex-row">
        <div className="mt-4 w-full">
          <span className="font-semibold">Bill Co-sponsors:</span>
          <ul className="list-disc pl-5">
            {billInfo.cosponsors.map((cosponsor, index) => (
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

      {/* <div className="mt-4">
                <span className="font-semibold">Republican Sponsor Support: </span> <span className="text-gray-700">{percentage}%</span>
            </div>
            <div  className="mb-4">
            <span className="font-semibold">Democrats Sponsor Support: </span><span className="text-gray-700">{100 - percentage}%</span>
            </div> */}
      <div className="mt-4">
        <span className="font-semibold">Status:</span> The bill is currently
        waiting for approval from the{" "}
        <span className="font-medium">{billInfo.latestStage}</span>, since{" "}
        {billInfo.updateDate}
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Summary</h2>
        <p className="text-gray-700">{billAnalysor.summary}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Potential Impacts</h2>
        <p className="text-gray-700">{billAnalysor.potentialImpact}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Most Impacted</h2>
        <p className="text-gray-700">{billAnalysor.impactedGroups}</p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-bold">Pros</h2>
        <p className="text-gray-700">{billAnalysor.pros}</p>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-bold">Cons</h2>
        <p className="text-gray-700">{billAnalysor.cons}</p>
      </div>
    </div>
  );
}

export default Results;
