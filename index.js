const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const add = require("./controller");
const app = express();
const language = require('@google-cloud/language');

const client = new language.LanguageServiceClient();

process.env.GOOGLE_APPLICATION_CREDENTIALS = 'orbital-wording-382318-f1bf751370f5.json';

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
  fs.readdir("./recording_data", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data");
    } else {
      const data = [];

      files.forEach((file) => {
        fs.readFile(`./recording_data/${file}`, "utf8", (err, jsonData) => {
          if (err) {
            console.log(err);
            res.status(500).send("Error retrieving data");
          } else {
            const dataObj = JSON.parse(jsonData);
            dataObj.fileName = file;
            dataObj.transcription.map((item) => {
              if (item.startTime.seconds == null) item.startTime.seconds = 0;
              if (item.endTime.seconds == null)
                item.endTime.seconds = item.endTime.seconds = 0;
              return item;
            });
            const formatTranscription = (data) => {
              if(!data || data.transcription.length === 0) return [];
          
              let starttime = parseInt(data.transcription[0].startTime.seconds ?? 0);
              let sentence = "";
              let result = [];
              let curSpeaker = data.transcription[0].speakerTag;
              
              const formatTime = (seconds) => {
                  let min = Math.floor(seconds/60);
                  let sec = seconds % 60;
                  if(min < 10 ) min = "0" + min.toString();
                  if(sec < 10 ) sec = "0" + sec.toString();
                  return min + " : " + sec;
              }
                  
              for(let i = 0; i < data.transcription.length; i++) {
                  if(data.transcription[i].speakerTag !== curSpeaker) {
                      const cur = {
                          START: formatTime(starttime),
                          END: formatTime(parseInt(data.transcription[i - 1].endTime.seconds ?? 0)),
                          SPEAKER: "SPEAKER " + curSpeaker.toString(),
                          TEXT: sentence,
                          score: 0,            
                      }
                      result.push(cur);
                      curSpeaker = data.transcription[i].speakerTag
                      starttime = parseInt(data.transcription[i].startTime.seconds ?? 0);
                      sentence = "";
                  }
                  sentence += data.transcription[i].word + " ";
              }
              return result;
          }
          let result = formatTranscription(dataObj);

// Use Promise.all to wait for all the promises returned by map to resolve
function analysis(item) {
  return new Promise(function(resolve, reject){
    let document = {
      type: 'PLAIN_TEXT',
      content: item.TEXT,
    };
    client.analyzeSentiment({ document: document }).then(score => {
      item.score = score[0].documentSentiment.score;
      console.log(score[0].documentSentiment.score);
      resolve(item);
    }).catch(err => {
      reject(false);
    })
  })
}
Promise.all(  
  result.map((item) => {return analysis(item)}
  )
).then((updatedResult) => {
  let presult = {
    transcription: updatedResult,
    fileName: file,
  };
  data.push(presult);
  if (data.length === files.length) {
    res.json(data);
  }
});
  // console.log(data);
          
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
