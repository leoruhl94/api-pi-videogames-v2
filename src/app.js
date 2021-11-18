const express = require('express');
const morgan = require('morgan');
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

app.use('/api', routes);
// Error handler*/
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// // Error catching endware.
// app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
//   const status = err.status || 500;
//   const message = err.message || err;
//   console.error(err);
//   res.status(status).send(message);
// });



module.exports = app;
