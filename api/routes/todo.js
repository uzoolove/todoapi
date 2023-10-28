import model from '../models/todo.js';
import express from 'express';
const router = express.Router();

// 할일 목록 조회
router.get('/todolist', function(req, res, next) {
  // #swagger.tags = ['필수 기능']
  // #swagger.summary  = '할일 목록 조회'
  // #swagger.description = '할일 목록을 조회합니다.<br>page, limit 파라미터는 선택사항이며 전달하지 않으면 전체 할일 목록을 조회합니다.<br>page만 전달할 경우 limit 값은 기본 10으로 지정됩니다.'
  /* 
    #swagger.parameters['page'] = {
      required: 'false',
      in: 'query',
      type: 'number',
      description: '조회할 페이지'
    },
    #swagger.parameters['limit'] = {
      required: 'false',
      in: 'query',
      type: 'number',
      description: '한 페이지에 보여줄 개수'
    },
    #swagger.responses[200] = {
      description: '성공',
      schema: { $ref: '#/definitions/ListResponse' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
  try{
    const result = model.list(req.query);
    res.json({ok: 1, ...result});
  }catch(err){
    console.error(err);
    res.status(500).json({ok: 0, error: {message: '서버 오류'}});
  }
});

// 할일 등록
router.post('/todolist', function(req, res, next) {
  // #swagger.tags = ['필수 기능']
  // #swagger.summary  = '할일 등록'
  // #swagger.description = '할일을 등록합니다.<br>title, content를 전달하면 할일을 등록한 후 등록된 할일을 반환합니다.'
  /* 
    #swagger.parameters['item'] = {
      required: 'true',
      in: 'body',
      schema: {
        $ref: '#/definitions/ItemRequest'
      },
      description: '등록할 할일 정보를 담은 객체'
    },
    #swagger.responses[200] = {
      description: '성공',
      schema: { $ref: '#/definitions/ItemResponse' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
  try{
    const item = model.create(req.body);
    res.json({ok: 1, item});
  }catch(err){
    console.error(err);
    res.status(500).json({ok: 0, error: {message: '서버 오류'}});
  }
});

// 할일 상세 조회
router.get('/todolist/:_id', function(req, res, next) {
  // #swagger.tags = ['필수 기능']
  // #swagger.summary  = '할일 상세 조회'
  // #swagger.description = '할일 상세 정보를 조회합니다.'
  /* 
    #swagger.responses[200] = {
      description: '성공',
      schema: { $ref: '#/definitions/ItemResponse' }
    },
    #swagger.responses[404] = {
      description: '요청한 자원을 찾을 수 없음',
      schema: { $ref: '#/definitions/Error404' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
  try{
    const item = model.findById(Number(req.params._id));
    if(item){
      res.json({ok: 1, item});
    }else{
      res.status(404).json({ok: 0, error: {message: 'Not Found'}});
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ok: 0, error: {message: '서버 오류'}});
  }
});

// 할일 수정
router.patch('/todolist/:_id', function(req, res, next) {
  // #swagger.tags = ['필수 기능']
  // #swagger.summary  = '할일 수정'
  // #swagger.description = '할일을 수정합니다. 할일을 수정한 후 수정된 할일을 반환합니다.<br>바디로 전달한 속성에 대해서만 수정되고 전달하지 않은 속성은 유지됩니다.'
  /* 
    #swagger.parameters['item'] = {
      required: 'true',
      in: 'body',
      schema: {
        $ref: '#/definitions/ItemUpdateRequest'
      },
      description: '수정할 속성만 담은 객체'
    },
    #swagger.responses[200] = {
      description: '성공',
      schema: { $ref: '#/definitions/ItemResponse' }
    },
    #swagger.responses[404] = {
      description: '요청한 자원을 찾을 수 없음',
      schema: { $ref: '#/definitions/Error404' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
  try{
    const item = model.update(Number(req.params._id), req.body);
    if(item){
      res.json({ok: 1, item});
    }else{
      res.status(404).json({ok: 0, error: {message: 'Not Found'}});
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ok: 0, error: {message: '서버 오류'}});
  }
});

// DB 초기화
router.delete('/todolist/init', async function(req, res, next) {
  // #swagger.tags = ['부가 기능']
  // #swagger.summary  = '데이터 베이스 초기화'
  // #swagger.description = '데이터 베이스를 초기화 합니다.<br>기존 데이터는 모두 삭제된 후 할일 목록 4개가 추가되고 추가된 할일 목록을 반환합니다.'
  /* 
    #swagger.responses[200] = {
      description: '성공',
      schema: { $ref: '#/definitions/ListWithoutPaginationResponse' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
  try{
    const result = await model.init();
    res.json({ok: 1, ...result});
  }catch(err){
    console.error(err);
    res.status(500).json({ok: 0, error: {message: '서버 오류'}});
  }
});

// 할일 삭제
router.delete('/todolist/:_id', function(req, res, next) {
  // #swagger.tags = ['필수 기능']
  // #swagger.summary  = '할일 삭제'
  // #swagger.description = '할일을 삭제합니다.'
  /* 
    #swagger.responses[200] = {
      description: '성공',
      schema: { $ok: 1 }
    },
    #swagger.responses[404] = {
      description: '요청한 자원을 찾을 수 없음',
      schema: { $ref: '#/definitions/Error404' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */
  try{
    const result = model.remove(Number(req.params._id));
    if(result > 0){
      res.json({ok: 1});
    }else{
      res.status(404).json({ok: 0, error: {message: 'Not Found'}});
    }
  }catch(err){
    console.error(err);
    res.status(500).json({ok: 0, error: {message: '서버 오류'}});
  }
});


export default router;
