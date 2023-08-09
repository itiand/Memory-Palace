// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import readline from 'readline';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';
import { MongoClient, ServerApiVersion } from 'mongodb'
import { termForAiDrawer, termForAiDrawer1} from './helper/filterUserWords.js'

dotenv.config();

const { ENVIROMENT, PORT, GPT_API_KEY, DB_MONGO_PASSWORD } = process.env;

const uri = DB_MONGO_PASSWORD

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//routes import

import exampleRoutes from './routes/exampleRoutes.js'


const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/cats', exampleRoutes);

app.get('/phrases', (req, res) => {
  const ChatGptWord = WordtermForAiDrawer(req)
  const result = getChatResponse(`${ChatGptWord}`)
    .then(response => {
      res.json(response)

      const img_url = getImage(result)
      db.Palace.insertOne({
      "name" : `${item}`,
      "Palace Description" : `${result}`,
      "front_img_url" : `${img_url}`,
      "room" : `${roomID}`
      })
    });
});



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
