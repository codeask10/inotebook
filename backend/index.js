const connectToMongo= require('./db');
var cors = require('cors')
const express = require('express');
connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

app.use("/api/auth",require('./routes/auth'));
app.use("/api/notes",require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook backend  listening on port http://localhost:${port}`)
})