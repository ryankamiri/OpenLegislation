import mongoose from "mongoose";
import Bill from "./models/bill.model.js";
import dotenv from "dotenv";
import embeddings from "@themaximalist/embeddings.js";


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
  for (let i = 0; i < 10; i++) {
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
        
        let cosponsorsDataJSON = {cosponsors: []};
        if(billDataJSON.bill.cosponsors != null) {  
          const cosponsorsUrl = `${billDataJSON.bill.cosponsors.url}&api_key=${GOV_API}`;
          const cosponsorsData = await fetch(cosponsorsUrl);
          cosponsorsDataJSON = await cosponsorsData.json();
        }

        let fullTextURL = "No URL available";
        if(billDataJSON.bill.textVersions && !billDataJSON.bill.textVersions.url) {
          const textUrl = `${billDataJSON.bill.textVersions.url}&api_key=${GOV_API}`;
          const textData = await fetch(textUrl);
          const textDataJSON = await textData.json();

          fullTextURL = textDataJSON.textVersions[0].formats
            .filter((format) => format.type == "Formatted Text")
            .map((format) => format.url)[0];  
        }

        const embedding = await embeddings(bill.title);
        // const embedding = await createEmbedding(bill.title);
        // if(embedding.error) {
        //   console.error("Error creating embedding:", embedding.error.code, ":", bill.title);
        //   return;
        // }
        // const embedding = [0];

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
        await billObj.save();
        console.log(count++, "Adding bill to database:", bill.title.substring(0, 50));
      } catch (err) {
        console.error(count++, "Error adding bill to database:", err, "\n\n");
      }
    }
  }
};

await scrapeGov().then(() => console.log("Scraping complete"));

await mongoose.connection
  .close()
  .then(() => console.log("MongoDB connection closed"));
