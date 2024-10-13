import mongoose from "mongoose";
import Bill from "./models/bill.model.js";
import dotenv from "dotenv";
// import embeddings from "@themaximalist/embeddings.js";
import { embeddings } from "./utils.js";

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
  let count = 0;
  for (let i = 180; i < 200; i++) {
    const response = await fetch(`${link1}${i * 20}${link2}`);
    const data = await response.json();
    if (data.error) {
      console.error("Error fetching data:", data.error);
      return;
    }
    for (const bill of data.bills) {
      if (bill.latestAction.text.includes("Became Public Law")) {
        continue;
      }
      try {
        const billData = await fetch(`${bill.url}&api_key=${GOV_API}`);
        const billDataJSON = await billData.json();

        const actionsUrl = `${billDataJSON.bill.actions.url}&api_key=${GOV_API}`;
        const actionsData = await fetch(actionsUrl);
        const actionsDataJSON = await actionsData.json();

        let cosponsorsDataJSON = { cosponsors: [] };
        if (billDataJSON.bill.cosponsors && billDataJSON.bill.cosponsors.url) {
          const cosponsorsUrl = `${billDataJSON.bill.cosponsors.url}&api_key=${GOV_API}`;
          const cosponsorsData = await fetch(cosponsorsUrl);
          cosponsorsDataJSON = await cosponsorsData.json();
        }

        let fullTextURL = "No URL available";
        if (
          billDataJSON.bill.textVersions &&
          billDataJSON.bill.textVersions.url
        ) {
          const textUrl = `${billDataJSON.bill.textVersions.url}&api_key=${GOV_API}`;
          const textData = await fetch(textUrl);
          const textDataJSON = await textData.json();

          fullTextURL = textDataJSON.textVersions[0].formats
            .filter((format) => format.type == "Formatted Text")
            .map((format) => format.url)[0];
        }
        if (fullTextURL === "No URL available") {
          throw new Error("No URL available");
        }

        const embedding = await embeddings(bill.title);

        let stage = bill.latestAction.text;
        if (stage.toLowerCase().includes("committee")) {
          stage = "House";
        } else if (stage.toLowerCase().includes("senat")) {
          stage = "Senate";
        } else if (stage.toLowerCase().includes("desk")) {
          stage = "President";
        } else if (actionsDataJSON.actions[0].type === "IntroReferral") {
          stage = "Introduced";
        }

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
          latestStage: stage,
          sponsor: billDataJSON.bill.sponsors[0],
          cosponsors: cosponsorsDataJSON.cosponsors,
          billUrl: bill.url,
          textUrl: fullTextURL,
        });
        await billObj.save();
        console.log(
          count++,
          i,
          "Adding bill to database:",
          bill.title.substring(0, 50),
        );
      } catch (err) {
        console.error(count++, i, "Error adding bill to database:", err.message ? err.message : err);
      }
    }
  }
};

await scrapeGov().then(() => console.log("Scraping complete"));
await mongoose.connection
  .close()
  .then(() => console.log("MongoDB connection closed"));
