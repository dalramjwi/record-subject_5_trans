function getCurrentDate() {
  let thisdate = new Date();
  let year = thisdate.getFullYear();
  let month = ("0" + (thisdate.getMonth() + 1)).slice(-2);
  let day = ("0" + thisdate.getDate()).slice(-2);
  let hours = thisdate.getHours();
  let minutes = thisdate.getMinutes();
  let seconds = thisdate.getSeconds();
  const thistime =
    year +
    ":" +
    month +
    ":" +
    day +
    ":" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;
  return thistime;
}

document.addEventListener("DOMContentLoaded", function () {
  var currentDateElement = document.getElementById("currentDate");
  currentDateElement.setAttribute("content", getCurrentDate());
});
