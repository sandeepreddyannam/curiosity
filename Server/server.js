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
	// console.log('req, res', req, res, __dirname);
	// res.sendFile(path.join(__dirname + '/app/newUI.html'))
	return res.send('Hello Server');
});
app.get('/getHtml', (req, res) => {
	console.log('req, res', req.query, __dirname);
	res.header("Access-Control-Allow-Origin", "*");
	return res.sendFile(`/Users/sandeep.a/Desktop/my_projects/curiosity/app/${req.query.path}`);
	// return res.send('{hello: great}');
});

app.listen(port, () => console.log(`My server listening on port ${port}!`));