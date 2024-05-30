function getCurrentDate() {
  var currentDate = new Date();
  return currentDate.toISOString();
}

document.addEventListener("DOMContentLoaded", function () {
  var currentDateElement = document.getElementById("currentDate");
  currentDateElement.setAttribute("content", getCurrentDate());
});
