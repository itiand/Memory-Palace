//  ---------------------------- server/app.js
// declarations
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = 8080;
const enviroment = 'dev';

const app = express();

// middleware setup
app.use(morgan(enviroment));
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));