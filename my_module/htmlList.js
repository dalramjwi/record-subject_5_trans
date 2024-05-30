// function htmlList() {
//   const fs = require("fs");
//   fs.readFile("../public/titleData.json", (err, data) => {
//     let list = "<ul>";
//     let parse = JSON.parse(data);
//     // console.log(parse);
//     for (let i = parse.length - 1; i > parse.length - 6; i--) {
//       if (parse[i] === undefined) {
//         list =
//           list +
//           `<li style="visibility: hidden;"><a href="../data/${parse[i]}.html">${parse[i]}</a></li>`;
//       } else {
//         list =
//           list + `<li><a href="../data/${parse[i]}.html">${parse[i]}</a></li>`;
//       }
//     }
//     list = list + "</ul>";
//     //만약 list의 내용이 undefined이면 visibillity 조정
//     console.log(list);
//     return list;
//   });
// }
// console.log(htmlList());
// // export한 데이터 받아오는 명령어
// //? const htmlList = require("./htmlList");

// module.exports = htmlList;
