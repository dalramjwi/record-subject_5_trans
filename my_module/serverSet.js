const serverSet = function serverSet(port) {
  const http = require("http");
  const fs = require("fs");
  const path = require("path");
  const qs = require("node:querystring");
  const template = require("./literalTemplate");
  const updateJSON = require("./updateJSON");
  const objectJSON = require("./objectJSON");
  const getCurrentDate = require("./timeCheck");
  const getTime = require("./getTime.js");
  const deleteJSON = require("./deleteJSON.js");
  const searchPOSTTemplate = require("./searchTemplate.js");
  const titleData = require("../public/titleData.json");
  const contentData = require("../public/contentData.json");
  const tagData = require("../public/tagData.json");
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
    // console.log(req.url);

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
              list =
                list +
                `<li><a href="./data/${parse[i]}.html">${parse[i]}</a></li>`;
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
        //data parse
        let qparse = qs.parse(body);
        let parse = JSON.stringify(qparse);
        let jparse = JSON.parse(parse);
        let time = qparse.time;
        const title = jparse.title;
        const content = jparse.content;
        const tag = jparse.tag;
        //파일 위치 변수 지정
        const writeJsonFilePath = path.join(
          __dirname,
          `../public/data/${jparse.title}.json`
        );
        const readJsonFilePath = path.join(__dirname, `../public/data`);
        fs.readFile("./public/titleData.json", (err, data) => {
          let decode = decodeURI(data);
          let parse = JSON.parse(decode);
          if (parse.includes(title)) {
            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.end(template.alertTemplate(title));
          } else {
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
            //object 용 JSON 제작
            objectJSON("object", qparse, getCurrentDate());
            res.writeHead(302, { Location: "/" });
            res.end();
          }
        });
      });
    }
    //삭제 실행
    if (req.url === "/data/sak") {
      let body = "";
      req.on("data", (data) => {
        body += data.toString();
      });
      req.on("end", () => {
        //data parse
        let qparse = qs.parse(body);
        let parse = JSON.stringify(qparse);
        let jparse = JSON.parse(parse);
        const readJsonFilePath = path.join(__dirname, `../public/data`);
        //req.header 조회로 referer 사용 - url 조회
        let referer = req.headers.referer;
        let refererSplit = referer.split("/");
        let parserefer = refererSplit[4];
        let namerefer = decodeURI(parserefer);
        //dir 읽어 현재 url과 비교해 조건에 맞다면, 삭제
        fs.readdir(readJsonFilePath, (err, data) => {
          const dirlist = data;
          dirlist.forEach((item) => {
            if (item === namerefer) {
              fs.readFile(`${readJsonFilePath}/${namerefer}`, (err, data) => {
                let reptime = getTime(data);
                fs.readFile("./public/objectData.json", (err, data) => {
                  let parse = JSON.parse(data);
                  for (let i = 0; i < parse.length; i++) {
                    if (parse[i].time === reptime) {
                      let data = parse[i].text;
                      let title = data.title;
                      let content = data.content;
                      let tag = data.tag;
                      deleteJSON("content", content);
                      deleteJSON("tag", tag);
                      deleteJSON("title", title);
                      fs.unlink(
                        `${readJsonFilePath}/${namerefer}`,
                        (err) => {}
                      );
                    }
                  }
                });
              });
            }
          });
        });
        res.writeHead(302, { Location: "/" });
        res.end();
      });
    }
    searchPOSTTemplate("title");
    searchPOSTTemplate("content");
    searchPOSTTemplate("tag");
    // if (req.url === "/searchtitle") {
    //   let body = "";
    //   req.on("data", (data) => {
    //     body += data.toString();
    //   });
    //   req.on("end", () => {
    //     let Jparse = qs.parse(body);
    //     let jparse = JSON.stringify(Jparse);
    //     let resObj = { title: false };
    //     let parseObj = JSON.stringify(resObj);
    //     let obj = JSON.parse(parseObj);
    //     // console.log(parse.search);

    //     fs.readFile("./public/titleData.json", (err, data) => {
    //       let parse = JSON.parse(data);
    //       let jArr = [];
    //       jArr.push(Jparse.search);
    //       console.log(Jparse.search);
    //       function templateList(data) {
    //         let decode = decodeURI(data);
    //         let parse = JSON.parse(decode);
    //         let list = "<ul>";
    //         for (let i = 0; i < jArr.length; i++) {
    //           list =
    //             list +
    //             `<li><a href="./data/${jArr[i]}.html">${jArr[i]}</a></li>`;
    //           `<li>리스트생성</li>`;
    //         }
    //         list = list + "</ul>";
    //         return list;
    //       }
    //       const htmlList = `${templateList(data)}`;
    //       if (parse.includes(Jparse.search)) {
    //         res.end(template.searchTemplate(htmlList));
    //       } else {
    //         res.end("검색 실패");
    //       }
    //     });
    //     // console.log(obj);
    //   });
    // }
    // if (req.url === "/searchcontent") {
    //   let body = "";
    //   req.on("data", (data) => {
    //     body += data.toString();
    //   });
    //   req.on("end", () => {
    //     let Jparse = qs.parse(body);
    //     let jparse = JSON.stringify(Jparse);
    //     let resObj = { title: false };
    //     let parseObj = JSON.stringify(resObj);
    //     let obj = JSON.parse(parseObj);
    //     // console.log(parse.search);

    //     fs.readFile("./public/contentData.json", (err, data) => {
    //       let parse = JSON.parse(data);
    //       let jArr = [];
    //       jArr.push(Jparse.search);
    //       console.log(Jparse.search);
    //       function templateList(data) {
    //         let decode = decodeURI(data);
    //         let parse = JSON.parse(decode);
    //         let list = "<ul>";
    //         for (let i = 0; i < jArr.length; i++) {
    //           list =
    //             list +
    //             `<li><a href="./data/${jArr[i]}.html">${jArr[i]}</a></li>`;
    //           `<li>리스트생성</li>`;
    //         }
    //         list = list + "</ul>";
    //         return list;
    //       }
    //       const htmlList = `${templateList(data)}`;
    //       if (parse.includes(Jparse.search)) {
    //         res.end(template.searchTemplate(htmlList));
    //       } else {
    //         res.end("검색 실패");
    //       }
    //     });
    //     // console.log(obj);
    //   });
    // }
    // if (req.url === "/searchtag") {
    //   let body = "";
    //   req.on("data", (data) => {
    //     body += data.toString();
    //   });
    //   req.on("end", () => {
    //     let Jparse = qs.parse(body);
    //     let jparse = JSON.stringify(Jparse);
    //     let resObj = { title: false };
    //     let parseObj = JSON.stringify(resObj);
    //     let obj = JSON.parse(parseObj);
    //     // console.log(parse.search);

    //     fs.readFile("./public/tagData.json", (err, data) => {
    //       let parse = JSON.parse(data);
    //       let jArr = [];
    //       jArr.push(Jparse.search);
    //       console.log(Jparse.search);
    //       function templateList(data) {
    //         let decode = decodeURI(data);
    //         let parse = JSON.parse(decode);
    //         let list = "<ul>";
    //         for (let i = 0; i < jArr.length; i++) {
    //           list =
    //             list +
    //             `<li><a href="./data/${jArr[i]}.html">${jArr[i]}</a></li>`;
    //           `<li>리스트생성</li>`;
    //         }
    //         list = list + "</ul>";
    //         return list;
    //       }
    //       const htmlList = `${templateList(data)}`;
    //       if (parse.includes(Jparse.search)) {
    //         res.end(template.searchTemplate(htmlList));
    //       } else {
    //         res.end("검색 실패");
    //       }
    //     });
    //     // console.log(obj);
    //   });
    // }
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
