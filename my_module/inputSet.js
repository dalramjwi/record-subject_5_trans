export const inputSet = function inputSet(type, name, placeholder) {
  const input = document.createElement("input");
  input.setAttribute("type", type);
  input.setAttribute("name", name);
  input.setAttribute("id", name);
  input.setAttribute("placeholder", placeholder);
  return input;
};

//* 매개변수 작성법
//* inputSet("text", "name", "입력하시오", path);

//? export한 데이터 받아오는 명령어
//? import { inputSet } from "./inputSet.js";
