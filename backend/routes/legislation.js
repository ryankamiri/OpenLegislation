import { Router } from "express";
import { cheerio }from "cheerio";
import Bill from "../models/bill.model.js";
import gpt from "../gpt/gpt.js";

const router = Router();

const searchCongress = async (q, party, status) => {
  const base = "https://www.congress.gov/search";
  const queryParameters = {
    source: "legislation",
    search: "Abortion Bill",
    type: "bills",
    "bill-status": ["committee"],
    party: "Democratic",
  };
  const url = new URL(base);
  url.search = new URLSearchParams(queryParameters).toString();
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.text();
  console.log(data);
};

router.get("/search", async (req, res) => {
  try {
    // q: query, date: bills after x date, party: political party of sponsor, status: bill status
    const { q, date, party, status } = req.query;
    if (!q) {
      return res.status(400).json({ err: "Query not provided." });
    }

    // Make request to gov
    // searchCongress(q, party, status);

    return res.json({});
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.get("/bill/:id", async (req, res) => {
  try {
    // id: the id of the certain bill
    const { id } = req.params.id;
    if (!id) {
      return res.status(400).json({ err: "Id is required to get bill info." });
    }

    // Get Bill Object
    const bill = await Bill.find({billId: id});
    if (!bill) {
      return res.status(400).json({ err: `Bill with id '${id}' does not exist.`});
    }

    const response = await fetch(`${bill.textUrl}?api_key=${process.env.GOV_API}`, {
      method: "GET"
    });

    if (!response.ok) {
      return res.status(500).json({ err: `Gov API returned an ${response.status} error: ${await response.text()}` });
    }

    // Get text of bill from gov
    const $ = cheerio.load(await response.text());
    const text = $('pre').text();

    // Get GPT Summary
    const summary = gpt.getSummary(text);

    return res.json(summary);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

export default router;
