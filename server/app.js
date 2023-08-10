// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { termForAiDrawer, termForAiDrawer1 } from './helper/filterUserWords.js';


dotenv.config();
const app = express();
const { ENVIROMENT, PORT, GPT_API_KEY, DB_MONGO_PASSWORD } = process.env;

///
//MONGO
///
const uri = DB_MONGO_PASSWORD;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


let db;
async function run() {
  try {
    await client.connect();
    db = client.db("Memory"); //name of the db
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

run().catch(console.dir);
///
//END MONGO
//

//routes import
import exampleRoutes from './routes/exampleRoutes.js';

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());


//
//ROUTES
//
app.use('/cats', exampleRoutes);

app.get('/phrases', (req, res) => {
  const ChatGptWord = WordtermForAiDrawer(req);
  const result = getChatResponse(`${ChatGptWord}`)
    .then(response => {
      res.json(response);

      const img_url = getImage(result);
      console.log(img_url);
      db.Palace.insertOne({
        "name": `${item}`,
        "Palace Description": `${result}`,
        "front_img_url": `${img_url}`,
        "room": `${roomID}`
      });

    });
});


// app.post('/initMemoryPalace', (req, res) => {
//   const memoryPalaceCollection = db.collection("Palaces"); //name of collection

//   const palaceToInsert = req.body;

//   memoryPalaceCollection.insertMany(palaceToInsert)
//     .then(result => {
//       //example result
//       //  = {
//       //   acknowledged: true,
//       //   insertedCount: 2,
//       //   insertedIds: {
//       //     '0': new ObjectId("64d3bb72171be03ea57537d7"),
//       //     '1': new ObjectId("64d3bb72171be03ea57537d8")
//       //        ......
//       //   }
//       // }
//       res.json({ success: true, insertedCount: result.insertedCount, insertedIds: result.insertedIds });
//     })
//     .catch(error => {
//       res.status(500).json({ success: false, message: "Failed to insert memory palaces.", error: error });
//     });
// });

app.post('/initMemoryPalace', (req, res) => {
  const memoryPalaceCollection = db.collection("Palaces");

  const palaceToInsert = req.body;

  memoryPalaceCollection.insertOne(palaceToInsert) // Changed to insertOne
    .then(result => {
      const insertedId = result.insertedId;
      return memoryPalaceCollection.findOne({ _id: insertedId });
    })
    .then(insertedDocument => {
      if (insertedDocument) {
        res.json({
          success: true,
          insertedCount: 1,
          insertedId: insertedDocument._id,
          palaceData: insertedDocument
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Inserted data is not available."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ success: false, message: "Failed to insert memory palaces.", error: error });
    });
});


app.get('/getMemoryPalaces', (req, res) => {
  const memoryPalaceCollection = db.collection("Palaces"); //name of collection

  memoryPalaceCollection.find({}).toArray()
    .then(palaces => {
      res.json(palaces);
    })
    .catch(error => {
      res.status(500).json({ success: false, message: "Failed to fetch memory palaces." });
    });
});




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
