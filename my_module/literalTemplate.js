const template = {
  baseTop: `<!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sorock</title>
      </head>
      <body>
      `,

  baseEnd: `</body>
            </html>`,

  header: function (banner, search) {
    `<header>
    ${banner}
    ${search}
    </header>
    `;
  },

  main: function (aside, root) {
    `<main>
    ${aside}
    ${root}
    </main>
    `;
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

  createTemplate: function (htmlList) {
    return template.baseTop + this.header() + this.main() + template.baseEnd;
  },
};
{
  /* <link rel="stylesheet" href="./index.css" /> */
}
{
  /* <script type="module" src="./index.js"></script> */
}
console.log(template.createTemplate());
// function listTemplate() {}

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");
module.exports = template;
