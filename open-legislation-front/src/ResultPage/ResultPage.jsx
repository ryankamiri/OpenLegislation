// import React from "react";

function Results() {

  const jasonData = {
    "bill": {
        "latestAction": {
            "actionDate": "2024-09-27T00:00:00.000Z",
            "text": "Held at the desk."
        },
        "_id": "670ad88d8dc7cc1af018b4eb",
        "billId": 1570,
        "title": "Bottles and Breastfeeding Equipment Screening Enhancement Act",
        "congressId": 118,
        "originChamber": "Senate",
        "updateDate": "2024-09-28T00:00:00.000Z",
        "latestStage": "President",
        "sponsor": {
            "bioguideId": "D000622",
            "firstName": "Tammy",
            "fullName": "Sen. Duckworth, Tammy [D-IL]",
            "isByRequest": "N",
            "lastName": "Duckworth",
            "party": "D",
            "state": "IL",
            "url": "https://api.congress.gov/v3/member/D000622?format=json"
        },
        "cosponsors": [
            {
                "bioguideId": "D000618",
                "firstName": "Steve",
                "fullName": "Sen. Daines, Steve [R-MT]",
                "isOriginalCosponsor": true,
                "lastName": "Daines",
                "party": "R",
                "sponsorshipDate": "2023-05-11",
                "state": "MT",
                "url": "https://api.congress.gov/v3/member/D000618?format=json"
            },
            {
                "bioguideId": "H001042",
                "firstName": "Mazie",
                "fullName": "Sen. Hirono, Mazie K. [D-HI]",
                "isOriginalCosponsor": true,
                "lastName": "Hirono",
                "middleName": "K.",
                "party": "D",
                "sponsorshipDate": "2023-05-11",
                "state": "HI",
                "url": "https://api.congress.gov/v3/member/H001042?format=json"
            },
            {
                "bioguideId": "C001098",
                "firstName": "Ted",
                "fullName": "Sen. Cruz, Ted [R-TX]",
                "isOriginalCosponsor": false,
                "lastName": "Cruz",
                "party": "R",
                "sponsorshipDate": "2024-01-30",
                "state": "TX",
                "url": "https://api.congress.gov/v3/member/C001098?format=json"
            }
        ],
        "billUrl": "https://api.congress.gov/v3/bill/118/s/1570?format=json",
        "textUrl": "https://www.congress.gov/118/bills/s1570/BILLS-118s1570es.htm",
        "createdAt": "2024-10-12T20:14:05.909Z",
        "updatedAt": "2024-10-12T20:14:05.909Z",
        "__v": 0
    },
    "analysis": {
        "summary": "The Bottles and Breastfeeding Equipment Screening Enhancement Act mandates the TSA and private security personnel to ensure hygienic handling of breast milk and baby formula during aviation security screening. The TSA must develop guidance to minimize contamination risks and conduct audits to assess compliance and the effectiveness of screening technologies.",
        "potentialImpact": "This bill improves the safety and hygiene of breast milk and baby formula during air travel. It could reduce health risks for infants and increase comfort for breastfeeding mothers. By establishing clear protocols, it may also streamline the screening process, benefiting both families and security personnel.",
        "impactedGroups": "Mothers breastfeeding during air travel, infants consuming breast milk or baby formula, Transportation Security Administration personnel, and private security screening companies.",
        "pros": "The bill enhances safety measures for infants by ensuring hygienic handling of essential food items like breast milk. It supports breastfeeding mothers during travel, promoting maternal health. Additionally, developing standardized guidelines may improve the overall efficiency of security checks, easing the stress on families while traveling.",
        "cons": "Implementing the guidelines may create additional work for TSA agents and private screening companies, potentially leading to longer wait times. There may be challenges in training staff to adhere to these new standards. It's also possible that the bill could encounter resistance from security personnel due to workflow changes."
    }
}

const billInfo = jasonData.bill
const billAnalysor = jasonData.analysis

  return (
    <div>
      <h1>Bill Information</h1>

      {/* Displaying simple key-value pairs */}
      <div>{ billInfo.billId}: {billInfo.title}</div>
      
      <div>Bill Sponsor: {billInfo.sponsor.fullName}</div>
      
      <div>Bill Co-sponsors: {billInfo.cosponsors.map((cosponsor, index) =>(
        <li key={index}>{cosponsor.fullName}</li>
      ))}</div>

      <div>Stage: The bill is currently at {billInfo.latestStage}, since {billInfo.updateDate}</div>

      <div>Summary</div>
      <div>{billAnalysor.summary}</div>

      <div>Potential Impacts</div>
      <div>{billAnalysor.potentialImpact}</div>
      
      <div>Most impacted</div>
      <div>{billAnalysor.impactedGroups}</div>

      <div>
        <div>Pros</div>
        <div>{billAnalysor.pros}</div>

        <div>Cons</div>
        <div>{billAnalysor.cons}</div>
      </div>
    </div>
  );
};



//   const [bills, setBills] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

    // useEffect(() => {
    //     axios.get('https://jsonplaceholder.typicode.com/posts')
    //   .then((response) => {
    //     setBills(response.data); 
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setError('Error fetching posts');
    //     setLoading(false);
    //   });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {bills.map((post) => (
//           <li key={post.id}>
//             <h2>{post.title}</h2>
//             <p>{post.body}</p>
//           </li>
//         ))}
//       </ul>
//     </div>



export default Results