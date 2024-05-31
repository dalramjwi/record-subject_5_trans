const deleteJSON = function (datatype, dataname) {
  const fs = require("fs");
  fs.readFile(`./public/${datatype}Data.json`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let parse = JSON.parse(data);
      for (let i = 0; i < parse.length; i++) {
        if (parse[i] === `${dataname}`) {
          parse.splice(i, 1);
          parse = JSON.stringify(parse);
          fs.writeFile(
            `./public/${datatype}Data.json`,
            `${parse}`,
            (err, data) => {}
          );
        }
      }
    }
  });
};

//? export한 데이터 받아오는 명령어
//?const deleteJSON = require("./deleteJSON");

module.exports = deleteJSON;
