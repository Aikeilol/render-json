'use strict';

const thead = document.querySelector('thead tr');
const tbody = document.querySelector('tbody');
const select = document.querySelector('select');
const tbodyArr = [];
const wrapper = document.querySelector('.wrapper');



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
      users = users.map(user => getFlatObj(user));
      renderUserTable(users,Object.keys(users[0]));
      // render(getObjKey(users[0]), getObjValue(users));
    })
}

function getFlatObj(obj, keys =``) {
  const flatObj = {};
  for (const key in obj) {
    if (typeof obj[key] != 'object') {
      flatObj[key + keys] = obj[key];
    } else {
      Object.assign(flatObj, getFlatObj(obj[key], '.'))
    }
  }
  return flatObj;
}

function getObjValue(obj) {
  // const objKey = [];
  for (const key in obj) {
    if (typeof obj[key] != 'object') {
      tbodyArr.push(`<td>${obj[key]}</td>`)
    } else {
      getObjValue(obj[key]);
    }
    // console.log(objKey)
    // tbodyArr.push(objKey.reduce((info,sum) => sum + info, ''))
  }
  return tbodyArr;
}

function renderUserList(users, key){
  wrapper.innerHTML = `<ul>${users.map(item => `<li> <b>${item.id}.</b> <i>${item[key]}</i> </li>`).join('')}</ul>`;
}


function renderUserTable(users, keys){
  wrapper.innerHTML = `
    <table>${users.map(user => `
      <tr>${keys.map(key =>`<td>${user[key]}</td>`).join('')}</tr>
    `).join('')}</table>
  `
}

