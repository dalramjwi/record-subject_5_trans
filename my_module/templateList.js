function templateList() {
  let list = "<ul>";
  for (let i = 0; i < titlename.length; i++) {
    list =
      list +
      `<li><a href="./data/${titlename[i]}.html">${titlename[i]}</a></li>`;
    `<li>리스트생성</li>`;
  }
  list = list + "</ul>";
  return list;
}
module.exports = templateList;
