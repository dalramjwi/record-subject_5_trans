const template = {
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
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./index.css" />
  </head>
  <body>
    <div id="root">
      <div id="sidebar">
        <div id="joy"></div>
        <div id="my"></div>
      </div>
      <div id="main">
        <div id="search"></div>
        <div id="htmlList">
        ${htmlList}
        </div>
        <div id="write"></div>
      </div>
    </div>
  </body>
  <script type="module" src="./index.js"></script>
</html>`;
  },
};

// function listTemplate() {}

// export한 데이터 받아오는 명령어
//? const template = require("./literalTemplate");

module.exports = template;
