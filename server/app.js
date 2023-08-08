// declarations
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'
import { MongoClient, ServerApiVersion } from 'mongodb'
dotenv.config()

const uri = "mongodb+srv://adavidliang:a524219509@davidcluster0.ecrbedh.mongodb.net/?retryWrites=true&w=majority";
const { ENVIROMENT, PORT, GPT_API_KEY } = process.env

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

//routes import
import exampleRoutes from './routes/exampleRoutes.js'


const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/cats', exampleRoutes);


app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})


const openai = new OpenAIApi(new Configuration({
  apiKey: GPT_API_KEY
}))

userInterface.prompt()
userInterface.on("line", async input => {
  const res = await openai
  .createChatCompletion({ 
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input}]
  })
    console.log(res.data.choices[0].message.content)

})

const response = await openai.createImage({
  prompt: "lovely dog",
  n: 1,
  size: "256x256",
});
// console.log(response.data)
const image_url = response.data.data[0].url;
console.log(image_url)

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
