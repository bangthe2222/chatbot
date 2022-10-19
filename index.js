const express = require('express');
const cors = require('cors')
const { dockStart } = require('@nlpjs/basic');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
async function chatBot(text = 'Who are you' ) {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.load('./model_v1.model')
  const response = await nlp.process('en', text);
  if(response['intent'] == 'None'){
    return "I don't understand!"
  } else{
    return response['intent']
  }
};
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello from chatbot v1');
})
app.post('/chatbot/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let text = await chatBot(req.body["text"])
    console.log(text)
    resquest = {
      data : text,
    }
    res.send(JSON.stringify(resquest));  
})

var server = app.listen(port, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("http://%s:%s", host, port)

})