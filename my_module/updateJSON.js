const updateJSON = function (dataname) {
  const fs = require("fs");
  fs.readFile(`./public/${dataname}Data.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let parse = JSON.parse(data);
      parse.push(dataname);
      let parsetitlePush = JSON.stringify(parse);
      fs.writeFile(
        `./public/${dataname}.json`,
        `${parsetitlePush}`,
        (err, data) => {}
      );
    }
  });
};

//? export한 데이터 받아오는 명령어
//?const updateJSON = require("./updateJSON");

module.exports = updateJSON;
