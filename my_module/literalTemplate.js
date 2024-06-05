// const htmlList = require("./htmlList");
const fs = require("fs");
const getCurrentDate = require("./timeCheck");
const template = {
  baseTop: function (name) {
    return `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="date" content="" id="currentDate">
        <title>Sorock</title>
        <link rel="stylesheet" href="./${name}.css">
      </head>
      <body>
      `;
  },
  pageTop: function (name, date) {
    return `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="date" content="${date}" id="currentDate">
        <title>Sorock</title>
        <link rel="stylesheet" href="./${name}.css">
      </head>
      <body>
      `;
  },

  baseEnd: function (name) {
    return `</body>
  <script type="module" src="./${name}.js"></script>
            </html>`;
  },

  header: function (banner, search) {
    return `<header>
    ${banner}
    ${search}
    </header>
    `;
  },

  main: function (aside, root) {
    return `<main>
    ${aside}
    ${root}
    </main>
    `;
  },
  banner: `<div id="banner"><div id ="bannerdiv"><img src="./img/record.png" id = "recordimg"><a href="/">수록</a></div>
      </div>`,
  search: `<div id="search"><li id ="titleSelect"></li>
  <li id ="contentSelect"></li><li id ="tagSelect"></li></div>`,
  aside: function (joy, my) {
    return `<aside>
    <div id="sidebar">
      <div id="joy">${joy}</div>
      <div id="my">${my}</div>
    </div>
    </aside>`;
  },
  root: function (htmlList) {
    return `<div id="root">
      <div id="main">
        <div id="htmlList">${htmlList}</div>
        <div id="write"></div>
      </div>
    </div>`;
  },
  text: function (title, content, tag) {
    return `<div id="currentDate">
    <div id="title">${title}</div>
    <div id="content">${content}</div>
    <div id="tag">${tag}</div>
  </div>`;
  },
  btn: function (btn) {
    return `<div id="${btn}">
    <form action="./su" method="post">
      <button type="submit" id = "su">수정</button>
    </form>
    <form action="./sak" method="post" id = "sakform">
      <button type="submit" id = "sak">삭제</button>
    </form>
  </div>`;
  },
  menu: `
  <div id = "menu"> <li id ="titleSelect"></li>
  <li id ="contentSelect"></li><li id ="tagSelect"></li></div>
 `,
  alertMake: function (title) {
    return `
 <form action="/write" method="post">
 <h1>"${title}"</h1>
 <p>이 제목의 문서가 이미 존재합니다. 다른 제목으로 새 문서를 만드세요.</p>
 <button type="button" onclick="location.href='/'">예</button>
</form>
 `;
  },
  alertFind: function (title) {
    return `
 <form action="/write" method="post">
 <h1>"${title}"</h1>
 <p>해당 텍스트를 포함한 문서가 존재하지 않습니다. 다른 검색어로 검색하세요.</p>
 <button type="button" onclick="location.href='/'">예</button>
</form>
 `;
  },
  drop: `<ul id = "drop"><li id = "selectmenu">검색 방식&#9663;</li><li id = "titlelist">제목</li><li id ="contentlist">내용</li><li id ="taglist">태그</li></ul>`,

  suForm: function (title, content, tag) {
    return ` <form action="/suwrite" method="post">
    <input type="text" name="sutitle" id="sutitle" value = "${title}">
    <input type="text" name="sucontent" id="sucontent" value = "${content}">
    <input type="text" name="sutag" id="sutag" value = "${tag}">
    <button type="submit">작성하기</button>
   </form>`;
  },

  htmlTempalte: function (title, content, tag) {
    return (
      template.pageTop("page", getCurrentDate()) +
      this.header(this.banner, this.search) +
      this.main(this.aside("", ""), this.root("")) +
      `<div id = "page">` +
      this.text(title, content, tag) +
      this.btn("btn") +
      `</div>` +
      template.baseEnd("page")
    );
  },

  createTemplate: function (htmlList) {
    return (
      template.baseTop("index") +
      this.header(this.banner, this.search) +
      this.drop +
      this.main(
        this.aside("리스트 예비", "리스트 예비"),
        this.root(`${htmlList}`)
      ) +
      template.baseEnd("index")
    );
  },
  searchTemplate: function (searchList) {
    return (
      template.baseTop("search") +
      this.header(this.banner, this.search) +
      this.drop +
      this.main(this.aside("", ""), this.root(`${searchList}`)) +
      template.baseEnd("search")
    );
  },
  alertMakeTemplate: function (title) {
    return (
      template.baseTop("search") +
      this.header(this.banner, this.search) +
      this.main(this.aside("", ""), this.root(``)) +
      this.alertMake(title) +
      template.baseEnd("search")
    );
  },
  alertFindTemplate: function (title) {
    return (
      template.baseTop("search") +
      this.header(this.banner, this.search) +
      this.main(this.aside("", ""), this.root(``)) +
      this.alertFind(title) +
      template.baseEnd("search")
    );
  },
  suTemplate: function (title, content, tag) {
    return (
      template.baseTop("su") +
      this.header(this.banner, this.search) +
      this.main(this.aside("", ""), this.root(``)) +
      this.suForm(title, content, tag) +
      template.baseEnd("su")
    );
  },
};

// console.log(template.htmlTempalte());
// function listTemplate() {}

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");
module.exports = template;
