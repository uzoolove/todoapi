import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' assert {type: 'json'};

import indexRouter from './routes/todo.js';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../public'));
app.use('/apidocs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  cors({
    origin: [
      /^https?:\/\/localhost/,
      /^https?:\/\/127.0.0.1/
    ],
    credentials: true,
  })
);

app.use('/api', indexRouter);

// 404 에러
app.use(function(req, res, next){
  console.log(req.url);
  const err = new Error(`${req.url} 리소스를 찾을 수 없습니다.`);
  err.status = 404;
  next(err);
});

// 500 에러
app.use(function(err, req, res, next){
  console.error(err.stack);
  const status = err.status || 500;

  let message = '서버 오류';
  if(status !== 500){
    message = err.message;
  }

  res.status(status).json({ok: 0, error: {message}});  
});

export default app;
