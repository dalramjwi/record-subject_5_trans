const serverSet = function serverSet(port) {
  const http = require("http");
  const fs = require("fs");
  const path = require("path");
  const qs = require("node:querystring");
  const template = require("./literalTemplate");
  const updateJSON = require("./updateJSON");

  //*문서 형식에 따른 표기
  const mimeType = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".ico": "image/x-icon",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
  };

  //*url에 따른 파일 경로 결정 함수 객체
  const fileUtils = {
    //*매개변수 url에 따른 파일 경로 할당
    getFilePath: function (url) {
      let filePath;
      if (url === "/") {
        filePath = "./public/index.html";
      } else {
        filePath = `./public${url}`;
      }
      return filePath;
    },
    //*파일 경로에 따른 파일 확장자 가져오기
    getFileExtension: function (filePath) {
      //*파일 확장자를 가져오는 명령어
      let ext = path.extname(filePath);
      //*파일 확장자 소문자로 변환
      return ext.toLowerCase();
    },
    //*파일 확장자에 따른 표기 반환
    getContentType: function (ext) {
      //*mimeType에 ext로 가져온 확장자가 있다면 표기 반환
      if (mimeType.hasOwnProperty(ext)) {
        return mimeType[ext];
      } else {
        return "text/plain";
      }
    },
  };

  //*get 요청일때 처리 함수
  function getMethod(req, res, filePath, contentType) {
    console.log(req.url);

    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("./public/titleData.json", (err, data) => {
        function templateList(data) {
          let decode = decodeURI(data);
          let parse = JSON.parse(decode);
          let list = "<ul>";
          for (let i = parse.length - 1; i > parse.length - 6; i--) {
            if (parse[i] === undefined) {
              list =
                list +
                `<li style="visibility: hidden;"><a href="./public/data/${parse[i]}.html">${parse[i]}</a></li>`;
            } else {
              list = list + `<li><a href="./data/ex.html">${parse[i]}</a></li>`;
            }
          }
          list = list + "</ul>";
          return list;
        }
        const htmlList = `${templateList(data)}`;
        res.end(template.createTemplate(htmlList));
      });
    } else {
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.log("오류 발생 : ", err);
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(data);
        }
      });
    }
  }

  //*post 요청일때 처리 함수
  function postMethod(req, res) {
    if (req.url === "/write") {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        let qparse = qs.parse(body);
        let parse = JSON.stringify(qparse);
        let jparse = JSON.parse(parse);
        const title = jparse.title;
        const content = jparse.content;
        const tag = jparse.tag;
        //파일 위치 변수 지정
        const writeJsonFilePath = path.join(
          __dirname,
          `../public/data/${jparse.title}.json`
        );
        const readJsonFilePath = path.join(__dirname, `../public/data`);
        //전송된 데이터로 html 생성
        fs.writeFile(
          `${readJsonFilePath}/${title}.html`,
          template.htmlTempalte(title, content, tag),
          (err) => {
            // console.log(err);
          }
        );
        //전송받은 POST 데이터로 JSON DB 업데이트
        updateJSON("title", title);
        updateJSON("content", content);
        updateJSON("tag", tag);
      });
    }
  }

  //*서버 생성
  const server = http.createServer((req, res) => {
    let url = req.url;
    if (req.url === "/favicon.ico") return;
    //*filePath라는 변수를 getFilePath에 req.url을 매개변수로 삽입한 값으로 할당
    let filePath = fileUtils.getFilePath(url);
    //*ext 변수는 getFileExtenstion에 filePath를 삽입한 값으로 할당
    let ext = fileUtils.getFileExtension(filePath);
    //*contentType 변수는 getContentType에 ext를 삽입한 값으로 할당
    let contentType = fileUtils.getContentType(ext);

    if (req.method === "GET") {
      filePath = decodeURI(filePath);
      getMethod(req, res, filePath, contentType);
    } else if (req.method === "POST") {
      filePath = decodeURI(filePath);
      postMethod(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) {
      console.log("오류:", err);
    } else {
      console.log(`Server is running on port ${port}`);
    }
  });
};

//*매개변수 port 작성법
//*serverSet(3000);

//? export한 데이터 받아오는 명령어
//?const serverSet = require("./serverSet");

module.exports = serverSet;
