// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';
import { MongoClient, ServerApiVersion } from 'mongodb';

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
  const result = getChatResponse('Hello, Chat GPT')
    .then(response => {
      res.json(response);
    });
});


app.post('/initMemoryPalace', (req, res) => {
  const memoryPalaceCollection = db.collection("Palace"); //name of collection

  const dataToInsert = req.body;

  memoryPalaceCollection.insertMany(dataToInsert)
    .then(result => {
      res.json({ success: true, insertedCount: result.insertedCount, insertedIds: result.insertedIds });
    })
    .catch(error => {
      res.status(500).json({ success: false, message: "Failed to insert memory palaces.", error: error });
    });
});



app.get('/getMemoryPalaces', (req, res) => {
  const memoryPalaceCollection = db.collection("Palace"); //name of collection

  memoryPalaceCollection.find({}).toArray()
    .then(palaces => {
      res.json(palaces);
    })
    .catch(error => {
      res.status(500).json({ success: false, message: "Failed to fetch memory palaces." });
    });
});




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
