const express = require('express');
require('dotenv').config();
const cors = require("cors");

// file Where are all routes
const apiRoutes = require("./routes/index");

//file Where are all routes errors 

const errorRoutes = require("./routes/error.routes");


const app = express()
const PORT = process.env.PORT || 8000;


app.use(express.json());
app.use(cors());

// All routes
apiRoutes(app)

app.get('/', (req, res) => {
res.send('Bienvendo a mi server');
});

// All errors
errorRoutes(app);

app.listen(PORT, () => {
console.log(`servidor escuchando en el PORT ${PORT}`);
});