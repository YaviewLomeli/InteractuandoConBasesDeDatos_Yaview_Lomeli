const http       = require('http'),
      express    = require('express'),
      mongoose   = require('mongoose'),
      bodyParser = require('body-parser'),
      Routing    = require('./rutas.js');

const app  = express();
      PORT = 3000

const Server = http.createServer(app);
mongoose.connect('mongodb://localhost/AgendaDB')

app.use(express.static('../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended:false} ));
app.use(Routing)

Server.listen(PORT,()=>{
  console.log(`Listening on port: ${PORT}`)
})
