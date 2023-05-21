const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const add = require("./controller");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// app.use(express.static("public"));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// // Handles any requests that don't match the ones above
// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname+'/public/index.html'));
// });


app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (email === "anastasia@shipmoto.com" && password === "12345") {
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid email or password" });
  }
});

app.get("/api/data", (req, res) => {
  fs.readdir("./jsonfiles", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      const data = [];

      files.forEach((file) => {
        fs.readFile(`./jsonfiles/${file}`, "utf8", (err, jsonData) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data");
          } else {
            const dataObj = JSON.parse(jsonData);
            dataObj.fileName = file;
            data.push(dataObj);

            if (data.length === files.length) {
              res.json(data);
            }
          }
        });
      });
    }
  });
});

app.post("api/audiodata", (req, res) => {
  const filename = req.body.filename; // assuming that the filename is in the request body
  fs.readdir("./audiofiles", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      const file = files.find((file) => file === filename);
      if (file) {
        fs.readFile(`./audiofiles/${file}`, (err, data) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data");
          } else {
            res.send(data);
          }
        });
      } else {
        res.status(404).send("File not found");
      }
    }
  });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
