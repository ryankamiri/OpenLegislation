const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 5004;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all other routes by serving the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
