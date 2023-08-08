// declarations
import dotenv from 'dotenv';
import express, { response } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import readline from 'readline';
import { getImage, getChatResponse } from './lib/openAIHelpers.js';

dotenv.config();

const { ENVIROMENT, PORT, GPT_API_KEY } = process.env;

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
      res.json(response)
    });
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
