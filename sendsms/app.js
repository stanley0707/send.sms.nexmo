const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')

// api nexmo init 
const nexmo = new Nexmo({
    apiKey:'546ff10d',
    apiSecret:'d27519e401afeb8c'
}, {debug: true});

// init app
const app = express();

// шаблонизация
app.set('view engine', 'html');
app.engine('html',ejs.renderFile);

// public folder setup 
app.use(express.static(__dirname +'/public'));

// парсер 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// роутер 

app.get('/',(req, res) =>{
    res.render('index');
});

//Cath form submit

app.post('/', (req, res) => {
   // res.send(req.body);
   // console.log(req.body);
   const number = req.body.number;
   const text = req.body.text;
   
   nexmo.message.sendSms(
    '79819534340', number, text, { type:'unicode' },
   (err, responseData) => {
       if(err){
          console.log(err);      
       } else {
          console.dir(responseData);
       }
     }
   );
    
});

// порт 
const port = 8080;

// сервер 

const server = app.listen(port, () => console.log( 'Сервер запущен, port: 8080'));