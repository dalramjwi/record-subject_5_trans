//변수 할당
const body = document.getElementsByTagName("body")[0];
const div1 = document.getElementsByTagName("div")[0];
const div2 = document.getElementsByTagName("div")[1];
const div3 = document.getElementsByTagName("div")[2];
const div4 = document.getElementsByTagName("div")[3];
const rewrite = document.getElementsByTagName("button")[0];
const sack = document.getElementsByTagName("button")[1];
//기본 layout 작성
body.style.display = "flex";
body.style.flexDirection = "column";
div1.style.textAlign = "center";
div2.style.padding = "5vw 6vw";
div3.style.display = "flex";
div3.style.justifyContent = "space-between";
div4.style.display = "flex";
//수정
// rewrite.addEventListener
//삭제
// sack.addEventListener("click", sackEvent);
// function sackEvent() {
//   const check = window.confirm("삭제하시겠습니까?");
//   if (check) {
//     //삭제
//     location.href = "/";
//   } else {
//     //취소
//     console.log("취소");
//   }
// }
