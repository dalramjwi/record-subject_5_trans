export const buttonSet = function buttonSet(type, write) {
  const button = document.createElement("button");
  button.setAttribute("type", type);
  button.innerHTML = write;
  return button;
};

//* 매개변수 작성법
//* buttonSet("submit","누르시오");

//? export한 데이터 받아오는 명령어
//? import { buttonSet } from "./buttonSet.js";
