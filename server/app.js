// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import MemoryPalace from './models/MemoryPalace.js';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';
import { MongoClient, ServerApiVersion } from 'mongodb';


dotenv.config();

const { ENVIROMENT, PORT, GPT_API_KEY, DB_MONGO_PASSWORD } = process.env;


//mongoose connection
mongoose.connect(DB_MONGO_PASSWORD, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected with Mongoose');
    return insertMemoryPalaceData(memoryPalaceData);
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  });


//DATABASE
// const uri = DB_MONGO_PASSWORD;
const memoryPalaceData = [
  {
    name: "palace1",
    front_img_url: "https://images-ext-1.discordapp.net/external/rJs80p45-ElChRCSR3ELP2k_VWSEKauZphmw7PzDpfk/https/i.imgur.com/JjF0Lda.jpg?width=1036&height=1228",
    rooms: []
  },
  {
    name: "fresh prince",
    front_img_url: "https://media.architecturaldigest.com/photos/5f60d4247cb92d03f8366538/16:9/w_2560%2Cc_limit/01_Airbnb_Fresh_Exterior-A.jpg",
    rooms: []
  },
  {
    name: "the office",
    front_img_url: "https://i0.wp.com/lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg?fit=2048%2C1280",
    rooms: []
  },
  {
    name: "big bang theory",
    front_img_url: "https://s28943.pcdn.co/wp-content/uploads/2019/06/Apt-4A-TV-Approved.jpg",
    rooms: []
  }
];

function insertMemoryPalaceData(data) {
  return MemoryPalace.insertMany(data)
    .then(() => {
      console.log("Data inserted successfully!");
    })
    .catch(error => {
      console.error("Error inserting data:", error);
    });
}

//routes import
import exampleRoutes from './routes/exampleRoutes.js';


const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/cats', exampleRoutes);

app.get('/phrases', (req, res) => {
  const result = getChatResponse('Hello, Chat GPT')
    .then(response => {
      res.json(response);
    });
});


// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


// run().catch(console.dir);

// insertMemoryPalaceData();




app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
