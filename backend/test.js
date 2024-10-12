import Bill from './models/bill.model.js';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Set up mongoose
await mongoose.connect(process.env.MONGO_URI);
console.log("Mongoose connected.");

const bill = new Bill({
    billId: 1,
      title: "HealthCare and Finance Bill",
      congressId: 1,
      latestAction: {
        actionDate: Date.now(),
        text: "This bill has been overruled by Anish.",
      },
      originChamber: "Senate",
      updateDate: Date.now(),
      latestStage: "Introduction",
      sponsor: {},
      cosponsors: [],
      billUrl: "https://api.congress.gov/v3/bill/118/s/2228?format=json",
      textUrl: "https://www.congress.gov/118/bills/s2228/BILLS-118s2228enr.htm"
});

bill.save();

console.log("Created new bill!");