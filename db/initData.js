import moment from 'moment';

function getTime(days = 0, hours = 0) {
  return moment().add(days, 'd').add(hours, 'h').format('YYYY.MM.DD HH:mm:ss');
}

const initDate = {
  items: [
    {
      _id: 1,
      title: "Javascript 공부",
      content: "열심히 하자",
      done: true, 
      createdAt: getTime(-3, 5),
      updatedAt: getTime(-3, 6),
    },
    {
      _id: 2,
      title: "Closure 자세히 공부",
      content: "제일 어려웠음",
      done: false,
      createdAt: getTime(-3, 7),
      updatedAt: getTime(-3, 9),
    },
    {
      _id: 3,
      title: "Promise 복습",
      content: "async/await도 같이 공부",
      done: false,
      createdAt: getTime(-2, 1),
      updatedAt: getTime(-2, 5),
    },
    {
      _id: 4,
      title: "React 예습",
      content: "수업 전에 기본 개념부터 미리 확인.",
      done: false,
      createdAt: getTime(-1, 12),
      updatedAt: getTime(-1, 14),
    }
  ],
  users: [],
  nextId: {
    items: 4,
    users: 1
  }
};

export default initDate;