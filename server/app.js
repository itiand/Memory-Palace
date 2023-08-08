// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import readline from 'readline';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = "mongodb+srv://adavidliang:a524219509@davidcluster0.ecrbedh.mongodb.net/?retryWrites=true&w=majority";
dotenv.config();

const { ENVIROMENT, PORT, GPT_API_KEY } = process.env;


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
  const result = getChatResponse('Hello, Chat GPT')
    .then(response => {
      res.json(response)
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
