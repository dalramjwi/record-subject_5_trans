import { inputSet } from "./inputSet.js";
import { buttonSet } from "./buttonSet.js";

const formData = ["actionPath", "method", "path"];
const inputData = ["type", "name", "placeholder"];
const buttonData = ["submit", "누르시오"];

export const formSet = function formSet(formData, inputData, buttonData) {
  const form = document.createElement("form");
  form.setAttribute("action", formData[0]);
  form.setAttribute("method", formData[1]);
  form.appendChild(inputSet(inputData[0], inputData[1], inputData[2]));
  form.appendChild(buttonSet(buttonData[0], buttonData[1]));
  formData[2].appendChild(form);
  return form;
};
//* 매개변수 작성법 수정
//* formSet(formData, inputData, buttonData);

//? export한 데이터 받아오는 명령어
//? import { formSet } from "./formSet.js";
