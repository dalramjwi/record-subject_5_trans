const objectJSON = function (datatype, dataname, time) {
  const fs = require("fs");
  fs.readFile(`./public/${datatype}Data.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let parse = JSON.parse(data);
      let object = {
        time: time,
        text: dataname,
      };
      parse.push(object);
      let parsetitlePush = JSON.stringify(parse);
      fs.writeFile(
        `./public/${datatype}Data.json`,
        `${parsetitlePush}`,
        (err, data) => {}
      );
    }
  });
};

//? export한 데이터 받아오는 명령어
//?const updateJSON = require("./updateJSON");

module.exports = objectJSON;
