function getCurrentDate() {
  let thisdate = new Date();
  let year = thisdate.getFullYear();
  let month = ("0" + (thisdate.getMonth() + 1)).slice(-2);
  let day = ("0" + thisdate.getDate()).slice(-2);
  let hours = thisdate.getHours();
  let minutes = thisdate.getMinutes();
  const thistime = year + ":" + month + ":" + day + ":" + hours + ":" + minutes;
  return thistime;
}
// export한 데이터 받아오는 명령어
//? const getCurrentDate = require("./timeCheck");

module.exports = getCurrentDate;
