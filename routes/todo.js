import { body, validationResult } from 'express-validator';

import { list, findById, create, update, remove, init } from '../models/todo.js';
import express from 'express';

const router = express.Router();

// 할일 목록 조회
router.get('/todolist', async function(req, res, next) {
  // #swagger.tags = ['Todo List']
  // #swagger.summary  = '할일 목록 조회'
  // #swagger.description = '할일 목록을 조회합니다.<br>page, limit 파라미터는 선택사항이며 page를 전달하지 않으면 전체 할일 목록을 조회합니다.<br>page만 전달할 경우 limit 값은 기본 10으로 지정됩니다.'

  /* 
    #swagger.parameters['keyword'] = {
      required: 'false',
      in: 'query',
      type: 'string',
      description: '검색어'
    },
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
    const result = await list(req.query);
    res.json({ok: 1, ...result});
  }catch(err){
    next(err);
  }
});

// 할일 등록
router.post('/todolist', [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty(),
], async function(req, res, next) {
  // #swagger.tags = ['Todo List']
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
    #swagger.responses[422] = {
      description: '파라미터 검증 실패',
      schema: { $ref: '#/definitions/Error422' }
    },
    #swagger.responses[500] = {
      description: '서버 에러',
      schema: { $ref: '#/definitions/Error500' }
    }
  */

  try{
    const result = validationResult(req);
    if(result.isEmpty()){
      if(req.body.saveIP){ // "ip 저장"에 체크했을 경우 프록시 주소가 아닌 실제 클라이언트 IP 추출
        req.body.ip = req.headers['x-forwarded-for'];
      }
      delete req.body.saveIP;
      const item = await create(req.body);
      res.json({ok: 1, item});
    }else{
      const error = new Error(`"${result.errors[0].path}" 항목은 필수입니다.`);
      error.status = 422;
      next(error);
    }    
  }catch(err){
    next(err);
  }
});

// 할일 상세 조회
router.get('/todolist/:_id', async function(req, res, next) {
  // #swagger.tags = ['Todo List']
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
    const item = await findById(Number(req.params._id));
    if(item){
      res.json({ok: 1, item});
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
});

// 할일 수정
router.patch('/todolist/:_id', [
  body('title').trim().notEmpty(),
  body('content').trim().notEmpty(),
], async function(req, res, next) {
  // #swagger.tags = ['Todo List']
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
    const result = validationResult(req);
    if(result.isEmpty()){
      const item = await update(Number(req.params._id), req.body);
      if(item){
        res.json({ok: 1, item});
      }else{
        next();
      }
    }else{
      const error = new Error(`"${result.errors[0].path}" 항목은 필수입니다.`);
      error.status = 422;
      next(error);
    }
  }catch(err){
    next(err);
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
    const result = await init();
    res.json({ok: 1, ...result});
  }catch(err){
    next(err);
  }
});

// 할일 삭제
router.delete('/todolist/:_id', async function(req, res, next) {
  // #swagger.tags = ['Todo List']
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
    if(req.body.pwd === process.env.INIT_PWD){
      const result = await remove(Number(req.params._id));
      if(result > 0){
        res.json({ok: 1});
      }else{
        next();
      }
    }else{
      const error = new Error(`관리자 비밀번호가 맞지 않습니다.`);
      error.status = 422;
      next(error);
    }
  }catch(err){
    next(err);
  }
});

export default router;
