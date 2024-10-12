const router = require("express").Router();
import gpt from "../gpt/gpt.js";

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
    // q: query, status: bill status
    const { q, party, status } = req.query;
    if (!q) {
      return res.status(400).json({ err: "Query not provided." });
    }

    // Make request to gov
    searchCongress(q, party, status);

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

    // Make request to gov
    // https://api.congress.gov/v3/bill/118/s/951?api_key=[INSERT_KEY]

    // Get text of bill from gov
    const text = "";

    // Get GPT Summary
    const summary = gpt.getSummary(text);

    return res.json(summary);
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

module.exports = router;
