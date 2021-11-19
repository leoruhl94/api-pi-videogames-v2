require("dotenv").config();
const boom = require("@hapi/boom");
const express = require('express');
const morgan = require('morgan');
const axios = require("axios");
// const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const cors = require('cors')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler')

const app = express();

app.name = 'API';


const whitelist = ['http://localhost:3000', 'https://the-games.herokuapp.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));
 

app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));
// app.use(cookieParser());

app.get('/', (req, res, next)=>{
  res.send('Hola parece que funciona')
})
app.get('/genres', async (req, res, next)=>{
  try {
    
    let genresApi = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.API_KEY}`
    );
    res.json(genresApi.data.results)
  } catch (error) {
    next(error)
  }
})
app.get('/platforms', async (req, res, next)=>{
  try {
    let platformsApi = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.API_KEY}`
    );
    // console.log(platformsApi)
    res.json(platformsApi.data.results)
    
  } catch (error) {
    next(error)
  }
})

app.use('/api', routes);
// // Error handler*/
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)


module.exports = app;
