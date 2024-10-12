import mongoose from "mongoose";
import Bill from "./models/bill.model.js";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.GOV_URL;
const GOV_API = process.env.GOV_API;

// await mongoose.connect(
//     process.env.MONGO_URI, 
//     { 
//         useNewUrlParser: true, 
//         useUnifiedTopology: true 
//     }
// ).then(() => console.log("MongoDB connection established"))

const link1 = "https://api.congress.gov/v3/bill/118/s?offset="
const link2 = `&limit=20&format=json&api_key=${GOV_API}`

const scrapeGov = async () => {
  for(let i = 0; i < 1; i++) {
    const response = await fetch(`${link1}${i * 20}${link2}`);
    const data = await response.json();
    for(const bill of data.bills) {
      if(bill.latestAction.text.includes("Became Public Law")) {
        continue;
      }
      const billData = await fetch(`${bill.url}&api_key=${GOV_API}`);
      const billDataJSON = await billData.json();

      const cosponsorsUrl = `${billDataJSON.bill.cosponsors.url}&api_key=${GOV_API}`;
      const cosponsorsData = await fetch(cosponsorsUrl);
      const cosponsorsDataJSON = await cosponsorsData.json();
      

      const textUrl = `${billDataJSON.bill.textVersions.url}&api_key=${GOV_API}`;
      const textData = await fetch(textUrl);
      const textDataJSON = await textData.json();


      console.log(JSON.stringify(
        textDataJSON.textVersions[0].formats
        .filter(format => format.type == "Formatted Text")
        .map(format => format.url)[0]
      ));
      break;
    }
  }
}

await scrapeGov();


// const response = await fetch(`https://api.congress.gov/v3/bill/118/s?offset=40&limit=20&format=json&api_key=${GOV_API}`);
// const data = await response.json();
// console.log(JSON.stringify(data));

// await mongoose.connection.close().then(
//     () => console.log("MongoDB connection closed")
// );