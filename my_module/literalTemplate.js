// const htmlList = require("./htmlList");
const fs = require("fs");
const template = {
  baseTop: function (name) {
    return `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <a href="#">수록</a>
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
  htmlTempalte: function (title, content, tag) {
    return (
      template.baseTop("page") +
      this.header(this.banner, this.search) +
      this.main(this.aside("", ""), this.root("")) +
      template.baseEnd("page")
    );
  },

  createTemplate: function (htmlList) {
    return (
      template.baseTop("index") +
      this.header(this.banner, this.search) +
      this.main(
        this.aside("리스트 예비", "리스트 예비"),
        this.root(`${htmlList}`)
      ) +
      template.baseEnd("index")
    );
  },
};

// console.log(template.createTemplate());
// function listTemplate() {}

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");
module.exports = template;
