
  // Declarations
  import dotenv from 'dotenv';
  import express, { response } from 'express';
  import morgan from 'morgan';
  import bodyParser from 'body-parser';
  import { getImage, getChatResponse } from './lib/openAIHelpers.js';
  import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';


  // import { termForAiDrawer, termForAiDrawer1 } from './helper/filterUserWords.js';


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
  app.use(bodyParser.json());
  app.use(morgan(ENVIROMENT));


  //
  //ROUTES
  //
  // app.use('/cats', exampleRoutes);

  // For Later ChatGPT integration
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


  //Get Chat GPT Response
  app.get('/getChatResponse', async (req, res) => {
    const content = req.body.content;
    try {
      const chatResponse = await getChatResponse(content); // Call the helper function
      res.json({ response: chatResponse });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred.' });
    }
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
  
  
  // CREATE: New Memory Palace
  app.post('/initMemoryPalace', async (req, res) => {
    const memoryPalaceCollection = db.collection("Palaces");
  
    try {
      const result = await memoryPalaceCollection.insertOne(req.body);
      const insertedDocument = await memoryPalaceCollection.findOne({ _id: result.insertedId });
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
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to insert memory palaces.", error: error });
    }
  });
 
  // READ: All Memory Palaces
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

  // UPDATE: Existing Memory Palace
  app.put('/update', (req, res) => {
    const palaceId = new ObjectId(req.body.id);
    const updatedData = req.body.data;
    updatedData._id = palaceId;
    // console.log(palaceId);
    // console.log(updatedData);
    const memoryPalaceCollection = db.collection('Palaces');
    memoryPalaceCollection.find({_id: new ObjectId(palaceId) }).toArray().then(palaces => {
      console.log(palaces);
    });
    memoryPalaceCollection
      .replaceOne(
        {  _id: palaceId }, // Query for the specific palace using _id
          updatedData // Update specific fields using $set
          ).then(result => {
          // console.log(result);
        if (result.matchedCount > 0) {
          console.log("*** object update success ***");
          res.json({
            success: true,
            message: 'Palace updated successfully.',
          });
        } else {
          res.status(404).json({
            success: false,
            message: 'Palace not found.',
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          success: false,
          message: 'Failed to update palace.',
          error: error,
        });
      });
  });

  // DELETE: Memory Palace by ID
  app.delete('/deleteMemoryPalace/:id', async (req, res) => {
  const palaceId = new ObjectId(req.params.id);
  try {
    const memoryPalaceCollection = db.collection('Palaces');
    // Find the palace before deleting it (for logging or other purposes if needed)
    const palaceToDelete = await memoryPalaceCollection.findOne({ _id: palaceId });
    // Delete the palace
    const deleteResult = await memoryPalaceCollection.deleteOne({ _id: palaceId });
    if (deleteResult.deletedCount > 0) {
      console.log(`Deleted palace with ID: ${palaceId}`);
      res.json({
        success: true,
        message: 'Palace deleted successfully.',
        deletedPalace: palaceToDelete
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Palace not found for deletion.'
      });
    }
  } catch (error) {
    console.error("Error deleting memory palace:", error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete palace.',
      error: error
    });
  }
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
