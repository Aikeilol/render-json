'use strict';

const thead = document.querySelector('thead tr');
const tbody = document.querySelector('tbody');
const select = document.querySelector('select');
const theadArr = [];
const tbodyArr = [];


render(theadArr, tbodyArr)
getInfo('https://jsonplaceholder.typicode.com/users');

function render(headers, users) {

  thead.innerHTML = headers.map(item => `
  <th>${item}</th>
`).join('')
  select.innerHTML = headers.map(item => `
  <option>${item}</option>
`).join('')
  tbody.innerHTML = users.map(item => `
  <tr>${item}</tr>
`).join('')
}

function getInfo(link) {
  fetch(link).then(response => response.json())
    .then(users => {
      render(getObjKey(users[0]), getObjValue(users));
    })
}

function getObjKey(obj, keys = []) {
  for (const key in obj) {
    if (typeof obj[key] != 'object') {
      theadArr.push(keys + key);
    } else {
      getObjKey(obj[key], key + '.');
    }
  }
  return theadArr;
}

function getObjValue(obj) {
  // const objKey = [];
  for (const key in obj){
    if (typeof obj[key] != 'object'){
      tbodyArr.push(`<td>${obj[key]}</td>`)
    }else{
      getObjValue(obj[key]);
    }
    // console.log(objKey)
    // tbodyArr.push(objKey.reduce((info,sum) => sum + info, ''))
  }
  return tbodyArr;
}