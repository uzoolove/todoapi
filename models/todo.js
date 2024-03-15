import _ from 'lodash';
import moment from 'moment';
import fs from 'node:fs/promises';

import { JSONSyncPreset } from 'lowdb/node';
import initData from '../db/initData.js';

let db;
// DB 초기화
async function initDB(){
  db = await JSONSyncPreset('db/todolist.json', _.cloneDeep(initData));
  db.write();
}
initDB();

const todo = {
  // 할일 목록 조회
  list({ keyword, page, limit } = {}){
    let items = db.data.items;

    // 검색어
    if(keyword){
      items = _.filter(items, item => {
        return item.title.includes(keyword) || item.content.includes(keyword);
      });
    }

    // content 속성 제거
    items = items.map(item => _.omit(item, 'content'));

    // _id의 내림차순 정렬
    items = _.sortBy(items, item => -item._id);
    
    let pagination = {};
    if(page){
      page = Number(page);
      limit = limit ? Number(limit) : 10;
      const offset = (page - 1) * limit;
      console.log(offset);
      pagination = {
        page,
        limit,
        total: items.length,
        totalPages: Math.ceil(items.length / limit)
      };
      items = _.drop(items, offset).slice(0, limit);
    }
    db.write();
    return {items, pagination};
  },
  // 할일 상세 조회
  findById(_id){
    const item = _.find(db.data.items, {_id});
    return item;
  },
  // 할일 등록
  create(todo){
    const nextId = ++db.data.nextId.items;
    let createdAt = moment().format('YYYY.MM.DD HH:mm:ss');
    const newTodo = {
      _id: nextId,
      ...todo,
      done: false,
      createdAt,
      updatedAt: createdAt,
    };
    db.data.items.push(newTodo);
    db.write();
    return newTodo;
  },
  // 할일 수정
  update(_id, todo){
    const index = _.findLastIndex(db.data.items, { _id });
    console.log(index);
    if(index < 0){
      return;
    }
    const oldTodo = db.data.items[index];
    const updatedAt = moment().format('YYYY.MM.DD HH:mm:ss');
    const newTodo = {...oldTodo, ...todo, updatedAt};
    db.data.items.splice(index, 1, newTodo);
    return newTodo;
  },
  // 할일 삭제
  remove(_id){
    const result = _.remove(db.data.items, todo => todo._id == _id);
    db.write();
    return result.length;
  },
  // DB 초기화
  async init(){
    await fs.rm('db/todolist.json');
    await initDB();
    return todo.list();
  }
};

export default todo;