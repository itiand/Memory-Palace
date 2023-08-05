// declarations
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { Configuration, OpenAIApi } from 'openai'
import readline from 'readline'

dotenv.config()

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


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
