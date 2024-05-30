const template = {
  baseTop: `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sorock</title>
        <link rel="stylesheet" href="./index.css">
      </head>
      <body>
      `,

  baseEnd: `</body>
  <script type="module" src="./index.js"></script>
            </html>`,

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
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="../page.css" />
      </head>
      <body>
        <div>
          <a href="../index.html">수록</a>
        </div>
        <div>
          <h1>${title}</h1>
          <h2>${content}</h2>
          <div>
            <p>${tag}</p>
            <div>
            <form action="./su" method="post">
              <button type="submit">수정</button>
            </form>
            <form action="./sak" method="post">
              <button type="submit">삭제</button>
            </form>
            </div>
          </div>
        </div>
      </body>
      <script src="../page.js"></script>
    </html>`;
  },

  createTemplate: function () {
    return (
      template.baseTop +
      this.header(this.banner, this.search) +
      this.main(
        this.aside("리스트 예비", "리스트 예비"),
        this.root("html 리스트")
      ) +
      template.baseEnd
    );
  },
};

console.log(template.createTemplate());
// function listTemplate() {}

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");
module.exports = template;
