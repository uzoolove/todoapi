import swaggerAutogen from 'swagger-autogen';

const options = {
  info: {
    version: '1.0.0',
    title: 'TODO API', 
    description: '할일 목록 API Server입니다.', 
  },
  host: 'localhost:33088',
  schemes: ['http'],
  basePath: '/api',
  tags: [
    {
      name: '필수 기능',
      description: '기본으로 구현해야 하는 기능',
    },
    {
      name: '부가 기능',
      description: '',
    },
  ],
  definitions: {
    Error500: {
      ok: 0, 
      error: {
        message: '서버 오류'
      }
    },
    Error404: {
      ok: 0, 
      error: {
        message: 'Not Found'
      }
    },
    ItemRequest: {
      title: 'JS 프로젝트 완성',
      content: '화요일까지 완료해야 함.'
    },
    ItemUpdateRequest: {
      title: 'JS 프로젝트 완성',
      content: '화요일까지 완료해야 함.',
      done: true
    },
    ItemResponse: {
      ok: 1,
      item: {
        _id: 5,
        title: 'JS 프로젝트 완성',
        content: '화요일까지 완료해야 함.',
        createdAt: '2023.10.30 11:34:31',
        updatedAt: '2023.10.30 11:34:31'
      }      
    },
    ListResponse: {
      ok: 1,
      items: [
        {
          _id: 3,
          title: "React 공부",
          done: false,
          createdAt: "2023.10.25 10:12:45",
          updatedAt: "2023.10.25 18:34:17"
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
          title: "React 공부",
          done: false,
          createdAt: "2023.10.25 10:12:45",
          updatedAt: "2023.10.25 18:34:17"
        }
      ],
      pagination: {}
    },
  }
};
const outputFile = './swagger-output.json' 
const endpointsFiles = ['./routes/todo.js'] 

swaggerAutogen()(outputFile, endpointsFiles, options);