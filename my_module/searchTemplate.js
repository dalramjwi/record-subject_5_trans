const searchPOSTTemplate = function (part) {
  const fs = require("fs");
  if (req.url === `/search${part}`) {
    let body = "";
    req.on("data", (data) => {
      body += data.toString();
    });
    req.on("end", () => {
      let Jparse = qs.parse(body);
      let jparse = JSON.stringify(Jparse);
      let resObj = { title: false };
      let parseObj = JSON.stringify(resObj);
      let obj = JSON.parse(parseObj);
      // console.log(parse.search);

      fs.readFile(`./public/${part}Data.json`, (err, data) => {
        let parse = JSON.parse(data);
        let jArr = [];
        jArr.push(Jparse.search);
        console.log(Jparse.search);
        function templateList(data) {
          let decode = decodeURI(data);
          let parse = JSON.parse(decode);
          let list = "<ul>";
          for (let i = 0; i < jArr.length; i++) {
            list =
              list + `<li><a href="./data/${jArr[i]}.html">${jArr[i]}</a></li>`;
            `<li>리스트생성</li>`;
          }
          list = list + "</ul>";
          return list;
        }
        const htmlList = `${templateList(data)}`;
        if (parse.includes(Jparse.search)) {
          res.end(template.searchTemplate(htmlList));
        } else {
          res.end("검색 실패");
        }
      });
      // console.log(obj);
    });
  }
};
module.exports = searchPOSTTemplate;
