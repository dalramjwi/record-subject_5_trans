import { formSet } from "./formSet.js";
import { formSet2 } from "./formSet2.js";
//변수 할당
const banner = document.getElementById("banner");
const search = document.getElementById("search");
const sidebar = document.getElementById("sidebar");
const joy = document.getElementById("joy");
const my = document.getElementById("my");
const root = document.getElementById("root");
const main = document.getElementById("main");
const htmlList = document.getElementById("htmlList");
const write = document.getElementById("write");
const title = document.getElementById("title");
const content = document.getElementById("content");
const tag = document.getElementById("tag");
const titleSelect = document.getElementById("titleSelect");
const contentSelect = document.getElementById("contentSelect");
const drop = document.getElementById("drop");
const titlelist = document.getElementById("titlelist");
const contentlist = document.getElementById("contentlist");
const selectmenu = document.getElementById("selectmenu");
//모듈 사용 - serach
const formData = ["./searchtitle", "POST", titleSelect];
const inputData = ["type", "search", "페이지 제목 검색"];
const buttonData = ["submit", "검색"];
formSet(formData, inputData, buttonData);
//모듈 사용 - htmlList
//모듈 사용 - write

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
//간단한 form 삽입되는지 확인
const formData3 = ["./searchcontent", "POST", contentSelect];
const inputData3 = ["type", "search", "페이지 내용 검색"];
formSet(formData3, inputData3, buttonData);
//form 드롭다운 메뉴 생성
let on = "block";
let off = "none";
drop.addEventListener("mouseover", () => {
  titlelist.style.display = on;
  contentlist.style.display = on;
  titlelist.addEventListener("click", () => {
    titlelist.style.display = off;
    contentSelect.style.display = off;
    titleSelect.style.display = on;
    // titlelist.style.display = on;
    contentlist.style.display = off;
  });
  contentlist.addEventListener("click", () => {
    contentlist.style.display = off;
    contentSelect.style.display = on;
    titleSelect.style.display = off;
    titlelist.style.display = off;
    // contentlist.style.display = on;
  });
});
drop.addEventListener("mouseout", () => {
  titlelist.style.display = off;
  contentlist.style.display = off;
  if (titleSelect.style.display === on) {
    selectmenu.innerHTML = "제목&#9663;";
  } else if (contentSelect.style.display === on) {
    selectmenu.innerHTML = "내용&#9663;";
  }
});
// drop.addEventListener("mouseover", () => {
//   contentlist.style.display = "block";
//   titlelist.style.display = "block";
//   if (titlelist.style.color === "blue") {
//   } else if ((contentlist.style.color = "blue")) {
//   }
//   titlelist.addEventListener("click", () => {
//     titlelist.style.color = "blue";
//     titleSelect.style.display = "block";
//   });
//   contentlist.addEventListener("click", () => {
//     contentSelect.style.display = "block";
//     contentlist.style.display = "block";
//     contentlist.style.color = "blue";
//     titlelist.style.display = "none";
//     titleSelect.style.display = "none";
//   });
// });
// drop.addEventListener("mouseout", () => {
//   if (titlelist.style.color === "blue") {
//     contentSelect.style.display = "none";
//     contentlist.style.display = "none";
//   } else if ((contentlist.style.color = "blue")) {
//     titlelist.style.display = "none";
//     titleSelect.style.display = "none";
//   }
// });
// drop.addEventListener("click", () => {
//   titlelist.style.color = "blue";
//   contentlist.style.display = "block";
//   contentSelect.style.display = "block";
//   titleSelect.style.display = "none";
//   titlelist.style.display = "none";
//   drop.addEventListener("click", () => {
//     //후에 선택
//   });
// });
