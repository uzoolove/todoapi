import dotenv from 'dotenv';

// 기본 .env 파일 로딩(package.json에서 로딩함)
// dotenv.config({ path: '.env' });
// 환경별 .env 파일 로딩
console.info('NODE_ENV', process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}


import swaggerAutogen from 'swagger-autogen';
import moment from 'moment';

function getTime(days = 0, hours = 0) {
  return moment().add(days, 'd').add(hours, 'h').format('YYYY.MM.DD HH:mm:ss');
}

const options = {
  info: {
    version: process.env.API_VERSION,
    title: 'TODO API', 
    description: '할일 목록 API Server입니다.<br><a href="https://github.com/uzoolove/todoapi/releases" target="_blank">변경 내역 확인</a>', 
  },
  host: process.env.API_HOST,
  schemes: [process.env.API_PROTOCOL],
  basePath: '/api',
  tags: [
    {
      name: 'Todo List',
      description: '할일 목록 관리',
    },
    {
      name: '부가 기능',
      description: '',
    },
  ],
  definitions: {
    Error422: {
      ok: 0, 
      error: {
        message: '"title" 항목은 필수입니다.'
      }
    },
    Error404: {
      ok: 0, 
      error: {
        message: '/api/todolist/{_id} 리소스를 찾을 수 없습니다.'
      }
    },
    Error500: {
      ok: 0, 
      error: {
        message: '서버 오류'
      }
    },
    ItemRequest: {
      title: 'TodoList 프로젝투 완성',
      content: '이번주에 진핼항 수업 내용'
    },
    DBInitRequest: {
      pwd: 'adminpassword',
    },
    ItemUpdateRequest: {
      title: 'TodoList 프로젝트 완성',
      content: '이번주에 진행할 수업 내용',
      done: true
    },
    ItemResponse: {
      ok: 1,
      item: {
        _id: 5,
        title: 'Javascript 공부',
        content: '열심히 하자',
        done: false,
        createdAt: getTime(),
        updatedAt: getTime(),
      }
    },
    ListResponse: {
      ok: 1,
      items: [
        {
          _id: 3,
          title: 'Promise 복습',
          done: false,
          createdAt: getTime(-2, 1),
          updatedAt: getTime(-2, 5),
        }
      ],
      pagination: {
        page: 2,
        limit: 2,
        total: 5,
        totalPages: 3
      }
    },
    ListWithoutPaginationResponse: {
      ok: 1,
      items: [
        {
          _id: 3,
          title: 'Promise 복습',
          done: false,
          createdAt: getTime(-2, 1),
          updatedAt: getTime(-2, 5),
        }
      ],
      pagination: {}
    },
  }
};
const outputFile = './swagger-output.json' 
const endpointsFiles = ['./routes/todo.js'] 

swaggerAutogen()(outputFile, endpointsFiles, options);