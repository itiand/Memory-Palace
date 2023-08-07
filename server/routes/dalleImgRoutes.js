import express from 'express';
import { Configuration, OpenAIApi, openai } from 'openai'

const dalleImgRouter = express.Router();

router.get('/', (req, res) => {
    console.log('dalleImgRouter')
    console.log('openai', openai);
});


export default dalleImgRouter
