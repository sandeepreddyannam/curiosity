const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var path = require('path');
const app = express();

/* server running on localhost: 4000 */


app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.get('/', (req, res) => {
	console.log('req, res', req, res, __dirname);
	res.sendFile(path.join(__dirname + '/app/newUI.html'))
	// return res.send('Web Push Node Server');
});

app.listen(port, () => console.log(`My server listening on port ${port}!`));