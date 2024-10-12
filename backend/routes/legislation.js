import { Router } from "express";
import { cheerio }from "cheerio";
import Bill from "../models/bill.model.js";
import gpt from "../gpt/gpt.js";

const router = Router();

router.get("/search", async (req, res) => {
  try {
    // q: query, date: bills after x date, party: political party of sponsor, status: bill status
    const { q, date, party, status } = req.query;
    if (!q) {
      return res.status(400).json({ err: "Query not provided." });
    }

    // Make vector search

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
