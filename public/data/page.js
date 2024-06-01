const sak = document.getElementById("sak");
const su = document.getElementById("su");
const sakform = document.getElementById("sakform");
const banner = document.getElementById("banner");
sak.addEventListener("click", (event) => {
  if (confirm("삭제하시겠습니까?")) {
    sakform.submit();
  }
});
