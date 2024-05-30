//변수 할당
const root = document.getElementById("root");
const sidebar = document.getElementById("sidebar");
const joy = document.getElementById("joy");
const my = document.getElementById("my");
const main = document.getElementById("main");
const search = document.getElementById("search");
const htmlList = document.getElementById("htmlList");
const write = document.getElementById("write");
//모듈 사용 - serach
import { formSet } from "./formSet.js";
const formData = ["./test", "POST", search];
//후에 "./test"가 아닌 search page와 연계
const inputData = ["type", "search", "페이지 제목 검색"];
const buttonData = ["submit", "검색"];
formSet(formData, inputData, buttonData);
//모듈 사용 - htmlList
//모듈 사용 - write
import { formSet2 } from "./formSet2.js";
const formData2 = ["./write", "POST", write];
const inputData2 = [
  "type",
  ["title", "content", "tag"],
  ["페이지 제목 작성", "페이지 내용 작성", "태그 작성"],
];
const buttonData2 = ["submit", "작성"];
formSet2(formData2, inputData2, buttonData2);
//write css 간단히
writeHTML.style.display = "flex";
writeHTML.style.flexDirection = "column";
