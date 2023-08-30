// Declarations
import dotenv from "dotenv";
import express, { response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import { getImage, getChatResponse } from "./lib/openAIHelpers.js";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

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
  },
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
import exampleRoutes from "./routes/exampleRoutes.js";

// middleware setup
app.use(bodyParser.json());
app.use(morgan(ENVIROMENT));

//
//ROUTES
//
// app.use('/cats', exampleRoutes);

//Get Chat GPT Response
app.post("/getChatResponse", async (req, res) => {
  const content = req.body.content;

  try {
    const chatResponse = await getChatResponse(content); // Call the helper function
    res.json({ response: chatResponse });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

app.post("/getImageResponse", async (req, res) => {
  const content = req.body.content;
  try {
    const imageResponse = await getImage(content); // Call the helper function
    res.json({ response: imageResponse });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
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
app.post("/initMemoryPalace", async (req, res) => {
  const memoryPalaceCollection = db.collection("Palaces");

  try {
    const result = await memoryPalaceCollection.insertOne(req.body);
    const insertedDocument = await memoryPalaceCollection.findOne({
      _id: result.insertedId,
    });
    if (insertedDocument) {
      res.json({
        success: true,
        insertedCount: 1,
        insertedId: insertedDocument._id,
        palaceData: insertedDocument,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Inserted data is not available.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to insert memory palaces.",
      error: error,
    });
  }
});

// READ: All Memory Palaces
app.get("/getMemoryPalaces", (req, res) => {
  const memoryPalaceCollection = db.collection("Palaces"); //name of collection
  memoryPalaceCollection
    .find({})
    .toArray()
    .then((palaces) => {
      res.json(palaces);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch memory palaces." });
    });
});

// UPDATE: Existing Memory Palace
app.put("/update", (req, res) => {
  const palaceId = new ObjectId(req.body.id);
  const updatedData = req.body.data;
  updatedData._id = palaceId;
  // console.log(palaceId);
  // console.log(updatedData);
  const memoryPalaceCollection = db.collection("Palaces");
  memoryPalaceCollection
    .find({ _id: new ObjectId(palaceId) })
    .toArray()
    .then((palaces) => {
      console.log(palaces);
    });
  memoryPalaceCollection
    .replaceOne(
      { _id: palaceId }, // Query for the specific palace using _id
      updatedData // Update specific fields using $set
    )
    .then((result) => {
      // console.log(result);
      if (result.matchedCount > 0) {
        console.log("*** object update success ***");
        res.json({
          success: true,
          message: "Palace updated successfully.",
        });
      } else {
        res.status(404).json({
          success: false,
          message: "Palace not found.",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: "Failed to update palace.",
        error: error,
      });
    });
});

// DELETE: Memory Palace by ID
app.delete("/deleteMemoryPalace/:id", async (req, res) => {
  const palaceId = new ObjectId(req.params.id);
  try {
    const memoryPalaceCollection = db.collection("Palaces");
    // Find the palace before deleting it (for logging or other purposes if needed)
    const palaceToDelete = await memoryPalaceCollection.findOne({
      _id: palaceId,
    });
    // Delete the palace
    const deleteResult = await memoryPalaceCollection.deleteOne({
      _id: palaceId,
    });
    if (deleteResult.deletedCount > 0) {
      console.log(`Deleted palace with ID: ${palaceId}`);
      res.json({
        success: true,
        message: "Palace deleted successfully.",
        deletedPalace: palaceToDelete,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Palace not found for deletion.",
      });
    }
  } catch (error) {
    console.error("Error deleting memory palace:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete palace.",
      error: error,
    });
  }
});

// UPDATE: Room - palaceID and roomId
app.patch("/palaces/:palaceId/rooms/:roomId", async (req, res) => {
  const { palaceId, roomId } = req.params;
  const palaceIdObj = new ObjectId(palaceId);
  const updatedProperties = req.body;

  try {
    // Find the specific palace
    //return 404 if palace or room not found
    const memoryPalaceCollection = db.collection("Palaces");
    const currentPalace = await memoryPalaceCollection.findOne({
      _id: palaceIdObj,
    });

    if (!currentPalace) {
      return res.status(404).json({
        success: false,
        message: "Memory palace not found.",
      });
    }
    console.log("PALACE FOUND", currentPalace);

    if (!currentPalace.Rooms[roomId]) {
      return res.status(404).json({
        success: false,
        message: "Room not found.",
      });
    }

    console.log("ROOM FOUND ASWELL", currentPalace.Rooms[roomId]);

    // update properties of the specified room
    Object.assign(currentPalace.Rooms[roomId], updatedProperties);
    console.log("DID IT UPDATE", currentPalace.Rooms[roomId]);

    // take the updated palace and replace the old state of the palace
    const updateResult = await memoryPalaceCollection.replaceOne(
      { _id: palaceIdObj },
      currentPalace
    );

    //if update was successfull respond wtih...
    if (updateResult.matchedCount > 0) {
      console.log("updated room:", currentPalace.Rooms[roomId]);

      res.json({
        success: true,
        message: "Room updated successfully!",
        updatedPalace: currentPalace,
        updatedRoom: currentPalace.Rooms[roomId],
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update room.",
      });
    }
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// DELETE: Room -  palaceID and roomId
app.delete("/palaces/:palaceId/rooms/:roomId", async (req, res) => {
  const { palaceId, roomId } = req.params;
  const palaceIdObj = new ObjectId(palaceId);
  try {
    const memoryPalaceCollection = db.collection("Palaces");

    //delete specific room given palaceId and
    await memoryPalaceCollection.updateOne(
      { _id: palaceIdObj },
      { $unset: { [`Rooms.${roomId}`]: 1 } }
    );

    //fectch the updated palace
    const updatedPalace = await memoryPalaceCollection.findOne({
      _id: palaceIdObj,
    });

    res.json({ success: true, updatedPalace });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// UPDATE: ToDoList of a Specific Room in a Memory Palace
app.put("/updateToDoList", async (req, res) => {
  const { palaceId, roomId, tasksState } = req.body; // Now tasksState is the new ToDoList
  console.log("reqBODY", req.body);
  if (!Array.isArray(tasksState)) {
    return res.status(400).json({
      success: false,
      message: "tasksState should be an array.",
    });
  }

  try {
    const memoryPalaceCollection = db.collection("Palaces");

    // Find the current palace
    const palace = await memoryPalaceCollection.findOne({
      _id: new ObjectId(palaceId),
    });

    if (!palace || !palace.Rooms || !palace.Rooms[roomId]) {
      return res.status(404).json({
        success: false,
        message: "Palace or Room not found.",
      });
    }

    // Replace ToDoList with the new tasksState
    palace.Rooms[roomId].ToDoList = tasksState;

    // Update the palace
    const updateResult = await memoryPalaceCollection.replaceOne(
      { _id: new ObjectId(palaceId) },
      palace
    );

    if (updateResult.matchedCount > 0) {
      res.json({
        success: true,
        message: "ToDoList updated successfully.",
        updatedRoom: palace.Rooms[roomId],
        updatedToDoList: palace.Rooms[roomId].ToDoList,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Failed to update ToDoList.",
      });
    }
  } catch (error) {
    console.error("Error updating ToDoList:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update ToDoList.",
      error: error,
    });
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
