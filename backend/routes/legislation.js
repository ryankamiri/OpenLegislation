import { Router } from "express";
import { cheerio } from "cheerio";
import Bill from "../models/bill.model.js";
import { getSummary } from "../gpt/gpt.js";

const router = Router();

const NUM_CANDIDATES = 10;
const LIMIT = 10;

router.get("/search", async (req, res) => {
  try {
    // q: query, date: bills after x date, party: political party of sponsor, stage: bill status
    const { q, date, party, stage } = req.query;
    if (!q) {
      return res.status(400).json({ err: "Query not provided." });
    }

    // Make vector search
    const embeddingQ = await gpt.createEmbedding(q);

    const agg = [
      {
        '$vectorSearch': {
          'index': 'vector_index',
          'path': 'title_vector',
          'queryVector': embeddingQ,
          "numCandidates": NUM_CANDIDATES,
          "limit": LIMIT
        }
    }];

    const match = {};

    if (date) {
      // Process date
      const parsedDate = Date.parse(date);
      if (parsedDate) {
        // If we have a valid date
        match.updateDate = { '$gte': parsedDate };
      }
    }
    
    if (party) {
      match['sponsor.party'] = party;
    }
    
    if (stage) {
      match.latestStage = stage;
    }

    if (Object.keys(match).length > 0) {
      agg.unshift({
        '$match': match
      })
    }

    const result = await Bill.aggregate(agg);
    for (let i = 0; i < result.length; i++) {
      delete result[i].title_vector;
    }

    return res.json(cleanResult);
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
    const bill = await Bill.find({ billId: id });
    if (!bill) {
      return res
        .status(400)
        .json({ err: `Bill with id '${id}' does not exist.` });
    }

    const response = await fetch(
      `${bill.textUrl}?api_key=${process.env.GOV_API}`,
    );
    if (!response.ok) {
      return res
        .status(500)
        .json({
          err: `Gov API returned an ${response.status} error: ${await response.text()}`,
        });
    }

    // Get text of bill from gov
    const $ = cheerio.load(await response.text());
    const text = $("pre").text();

    // Get GPT Summary
    const summary = getSummary(text);

    return res.json(summary);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

export default router;
