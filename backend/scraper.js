import mongoose from "mongoose";
import Bill from "./models/bill.model.js";
import dotenv from "dotenv";
import { createEmbedding } from "./gpt/gpt.js";

dotenv.config();

const GOV_API = process.env.GOV_API;

await mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"));

const link1 = "https://api.congress.gov/v3/bill/118/s?offset=";
const link2 = `&limit=20&format=json&api_key=${GOV_API}`;

const scrapeGov = async () => {
  for (let i = 0; i < 1; i++) {
    const response = await fetch(`${link1}${i * 20}${link2}`);
    const data = await response.json();
    for (const bill of data.bills) {
      if (bill.latestAction.text.includes("Became Public Law")) {
        continue;
      }
      try {
        const billData = await fetch(`${bill.url}&api_key=${GOV_API}`);
        const billDataJSON = await billData.json();
        // const actionsUrl = `${billDataJSON.bill.actions.url}&api_key=${GOV_API}`;

        const cosponsorsUrl = `${billDataJSON.bill.cosponsors.url}&api_key=${GOV_API}`;
        const cosponsorsData = await fetch(cosponsorsUrl);
        const cosponsorsDataJSON = await cosponsorsData.json();

        const textUrl = `${billDataJSON.bill.textVersions.url}&api_key=${GOV_API}`;
        const textData = await fetch(textUrl);
        const textDataJSON = await textData.json();

        const fullTextURL = textDataJSON.textVersions[0].formats
          .filter((format) => format.type == "Formatted Text")
          .map((format) => format.url)[0];

        const embedding = await createEmbedding(bill.title);

        const billObj = new Bill({
          billId: bill.number,
          title: bill.title,
          congressId: bill.congress,
          latestAction: {
            actionDate: bill.latestAction.actionDate,
            text: bill.latestAction.text,
          },
          title_vector: embedding,
          originChamber: bill.originChamber,
          updateDate: bill.updateDate,
          latestStage: bill.latestAction.text,
          sponsor: billDataJSON.bill.sponsors[0],
          cosponsors: cosponsorsDataJSON.cosponsors,
          billUrl: bill.url,
          textUrl: fullTextURL,
        });
        billObj.save();
        console.log("Added bill to database");
      } catch (err) {
        console.error("Error adding bill to database:");
      }
    }
  }
};

await scrapeGov().then(() => console.log("Scraping complete"));

await mongoose.connection
  .close()
  .then(() => console.log("MongoDB connection closed"));
