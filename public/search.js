import { formSet } from "./formSet.js";
const titleSelect = document.getElementById("titleSelect");
const contentSelect = document.getElementById("contentSelect");
//모듈 사용 - serach
const formData = ["./search", "POST", titleSelect];
const inputData = ["type", "search", "페이지 제목 검색"];
const buttonData = ["submit", "검색"];
formSet(formData, inputData, buttonData);
const formData3 = ["./searchcontent", "POST", contentSelect];
formSet(formData3, inputData, buttonData);
