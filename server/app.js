// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';
import { MongoClient, ServerApiVersion } from 'mongodb'
import { termForAiDrawer, termForAiDrawer1 } from './helper/filterUserWords.js'


dotenv.config();
const app = express();
const { ENVIROMENT, PORT, GPT_API_KEY, DB_MONGO_PASSWORD } = process.env;

///
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})
///
const uri = DB_MONGO_PASSWORD;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version


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



const palaceExample = {
  PalaceName: "the office",
  PalaceCoverImg: "https://i0.wp.com/lokagraph.com/wp-content/uploads/2018/05/dunder-Mifflin-building-the-office-where-location.jpg?fit=2048%2C1280",
  PalaceToDoList: {
    toDo1: {
      keyword: "Flexbox",
      definition: "CSS method to arrange layouts",
      returnedAiImgs: {
        aiImage1: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-9gXYtyRstySiFlQ4p18pGoj2/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=V5MHEls64ZgeWFwuz62FS%2BOyuhCiLl125XLIC86XFOQ%3D",
        aiImage2: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-wlnuPfBCIsXbgKIX4V3AKvfW/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=KbIWpARkQWwg8iSEBi8T%2B0oRdEHImtqyeYj1QFQXtjA%3D",
        aiImage3: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-9gXYtyRstySiFlQ4p18pGoj2/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=V5MHEls64ZgeWFwuz62FS%2BOyuhCiLl125XLIC86XFOQ%3D",
        aiImage4: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-v2VG5z7QtJ1E5EAnkttiQmR4/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=Twp5yatVjfQEOGpmrrrHWlY68M/ZQ%2BRVdDO/p%2BaGDwY%3D"
      },
      chosenAiImg: "https://openailabsprodscus.blob.core.windows.net/private/user-osAbBO59ww5BxmQOppRnsyp7/generations/generation-v2VG5z7QtJ1E5EAnkttiQmR4/image.webp?st=2023-08-09T19%3A11%3A49Z&se=2023-08-09T21%3A09%3A49Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/webp&skoid=15f0b47b-a152-4599-9e98-9cb4a58269f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-08-09T10%3A19%3A24Z&ske=2023-08-16T10%3A19%3A24Z&sks=b&skv=2021-08-06&sig=Twp5yatVjfQEOGpmrrrHWlY68M/ZQ%2BRVdDO/p%2BaGDwY%3D",
      gptDrawDesc: "artist palette on fire ",
      gptNarrateDesc: "An artist's palette on fire embodies a fusion of colors akin to a blazing inferno. It symbolizes the fervor of creation, with vivid reds, oranges, and yellows intertwining in a dynamic dance. This image captures the passionate intensity and creative sparks that ignite within an artist's imagination, infusing their work with a vivid and fiery essence."
    }
  },
  Rooms: {
    "Main Office": {
      roomDescription: "where paper magic happens",
      roomImg: "https://media.timeout.com/images/105824238/750/422/image.jpg",
      roomPins: [
        {
          x: null,
          y: null,
          toDoItem: null,
        }
      ],
    },
  }
};

// app.post('/initMemoryPalace', (req, res) => {
//   const memoryPalaceCollection = db.collection("Palaces"); //name of collection

//   const dataToInsert = req.body;

//   memoryPalaceCollection.insertMany(palaceExample)
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

  memoryPalaceCollection.insertOne(palaceExample) // Changed to insertOne
    .then(result => {
      res.json({ success: true, insertedCount: result.insertedCount, insertedId: result.insertedId });
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
