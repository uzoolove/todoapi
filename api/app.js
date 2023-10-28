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
      /^https?:\/\/localhost/
    ],
    credentials: true,
  })
);

app.use('/api', indexRouter, function(req, res, next) {
  res.set('Content-Type', 'text/html;charset=utf-8');
  res.end('<div><a href="/apidocs">API 문서</a>에서 사용법을 확인하세요.</div>');
});

app.use(function(req, res, next){
  res.set('Content-Type', 'text/html;charset=utf-8');
  res.end('<h1>요청하신 페이지를 찾을 수 없습니다.</h1><div>URL을 확인하세요.</div><div><a href="/">홈으로</div>');
});

// module.exports = app;

export default app;
