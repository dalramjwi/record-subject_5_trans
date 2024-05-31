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
  banner: `<div id="banner">
        <a href="/">수록</a>
      </div>`,
  search: `<div id="search"></div>`,
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
      <button type="submit">수정</button>
    </form>
    <form action="./sak" method="post">
      <button type="submit">삭제</button>
    </form>
  </div>`;
  },
  menu: `
  <div id = "menu"> <li id ="tilteSelect">제목</li>
  <li id ="contentSelect">내용</li>
  <li id ="tagSelect">태그</li></div>
 `,
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
      this.menu +
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
      this.main(this.aside("", ""), this.root(`${searchList}`)) +
      template.baseEnd("search")
    );
  },
};

// console.log(template.htmlTempalte());
// function listTemplate() {}

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");
module.exports = template;
