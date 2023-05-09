// C5.2 XML

xmlString = `<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>`

const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const studentListDOM = xmlDOM.querySelector("list");

function makeObjectFromStudentDOM(student) {
  const name = student.querySelector("name");
  const firstName = name.querySelector("first").textContent;
  const secondName = name.querySelector("second").textContent;
  const age = student.querySelector("age").textContent;
  const profession = student.querySelector("prof").textContent;
  const lang = name.getAttribute("lang");
  const studentObj = {
    name: [firstName, secondName].join(" "),
    age: Number(age),
    prof: profession,
    lang: lang
  }
  return studentObj;
}

const studentListObj = {};
studentListObj.list = [];
for (let studentDOM of studentListDOM.children) {
  studentObj = makeObjectFromStudentDOM(studentDOM);
  studentListObj.list.push(studentObj);
}

console.log(studentListObj);


// C5.2 JSON

const jsonString = `{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}`;

const studentListObjJSON = JSON.parse(jsonString);
console.log(studentListObjJSON);

