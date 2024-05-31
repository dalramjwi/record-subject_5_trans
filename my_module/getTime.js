const getTime = function (data) {
  let parse = decodeURI(data);
  let textArr = parse.split("<");
  let time = textArr[6].split("=");
  let timeSet = time[2].split(" ");
  let realtime = timeSet[0];
  let reptime = realtime.replace(/"/g, "");
  return reptime;
};
module.exports = getTime;
