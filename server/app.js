// declarations
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const { ENVIROMENT, PORT, GPT_API_KEY } = process.env

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

console.log(GPT_API_KEY)

const openai = new OpenAIApi(new Configuration({
  apiKey: GPT_API_KEY
}))

openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello World"}]
}).then(res => {
  console.log(res)
})


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
