import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

// running express
const app = express();
// allowing requests from other hosts and servers 
app.use(cors());

// makes the post req process easier and transfers data to json form
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Request info
app.use(morgan('dev'));

// data validation 
app.use(expressValidator());

// routing
app.use('/', routes);

// error middlewares
// path is not found and alerts the errors with human readable form
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// alerting other err messages 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({message: error.message});
});

export default app;