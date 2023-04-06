const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/loadJSON", (req, res) => {
  fs.readFile("convo.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading file");
    } else {
      res.send(data);
    }
  });
});

app.post("/saveJSON", (req, res) => {
  const jsonData = req.body;
  fs.writeFile("convo.json", JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      res.status(500).send("Error writing file");
    } else {
      res.send("File saved");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
