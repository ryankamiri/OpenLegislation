import { Router } from "express";
import * as cheerio from "cheerio";
import Bill from "../models/bill.model.js";
// import { getAnalysis } from "../gpt/gpt.js";
// import embeddings from "@themaximalist/embeddings.js";
import { embeddings, getAnalysis } from "../utils.js";

const router = Router();

const NUM_CANDIDATES = 10;
const LIMIT = 10;

router.get("/", async (req, res) => {
  return res.send("OpenLegislature API");
});

router.get("/search", async (req, res) => {
  try {
    // q: query, date: bills after x date, party: political party of sponsor, stage: bill status
    const { q, date_after, date_before, party, stage } = req.query;
    if (!q) {
      return res.status(400).json({ err: "Query not provided." });
    }

    // Make vector search
    const embeddingQ = await embeddings(q);

    const agg = [
      {
        $vectorSearch: {
          index: "vector_index",
          path: "title_vector",
          queryVector: embeddingQ,
          numCandidates: NUM_CANDIDATES,
          limit: LIMIT,
        },
      },
    ];

    const match = {};

    if (date_after) {
      const parsedDateAfter = Date.parse(date_after + "T00:00:00.000Z");
      if (parsedDateAfter) {
        match.updateDate = {
          ...match.updateDate,
          $gte: new Date(parsedDateAfter),
        };
      }
    }

    if (date_before) {
      const parsedDateBefore = Date.parse(date_before + "T00:00:00.000Z");
      if (parsedDateBefore) {
        match.updateDate = {
          ...match.updateDate,
          $lte: new Date(parsedDateBefore),
        };
      }
    }

    if (party) {
      match["sponsor.party"] = party;
    }

    if (stage) {
      match.latestStage = stage;
    }

    if (Object.keys(match).length > 0) {
      agg.push({
        $match: match,
      });
    }

    const result = await Bill.aggregate(agg);
    for (let i = 0; i < result.length; i++) {
      delete result[i].title_vector;
    }

    return res.json(result);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.get("/bill/:id", async (req, res) => {
  try {
    // id: the id of the certain bill
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ err: "Id is required to get bill info." });
    }

    // Get Bill Object
    let bill = await Bill.findOne({ billId: id });
    if (!bill) {
      return res
        .status(400)
        .json({ err: `Bill with id '${id}' does not exist.` });
    }
    3;

    const response = await fetch(
      `${bill.textUrl}?api_key=${process.env.GOV_API}`,
      {
        method: "GET",
      },
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

    // Get GPT Analysis
    const analysis = await getAnalysis(text);

    bill = bill.toObject();

    delete bill.title_vector;

    return res.json({ bill, analysis });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

export default router;
