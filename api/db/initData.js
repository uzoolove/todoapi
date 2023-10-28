const initDate = {
  items: [
    {
      _id: 1,
      title: "Javascript 공부",
      content: "열심히 하자",
      done: true,
      createdAt: "2023.10.18 10:12:45",
      updatedAt: "2023.10.30 18:34:17"
    },
    {
      _id: 2,
      title: "Typescript 공부",
      content: "자바스크립트에 type만 추가했다던데? 따로 배워야 하나?",
      done: false,
      createdAt: "2023.10.19 11:22:15",
      updatedAt: "2023.10.19 11:22:15"
    },
    {
      _id: 3,
      title: "React 공부",
      content: "이번에는 정말 제대로 배워보자.",
      done: false,
      createdAt: "2023.10.25 10:12:45",
      updatedAt: "2023.10.25 18:34:17"
    },
    {
      _id: 4,
      title: "React 프로젝트",
      content: "오프라인이라 기대가 큼",
      done: false,
      createdAt: "2023.10.27 10:13:34",
      updatedAt: "2023.10.27 10:13:34"
    }
  ],
  users: [],
  nextId: {
    items: 5,
    users: 1
  }
};

export default initDate;