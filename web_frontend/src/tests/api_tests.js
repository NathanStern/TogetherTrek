/*
This is the file for the writing tests for the api interface and wrapper files
*/

import { makeGetRequest } from "../api/Interface.js";
import { makePostRequest } from "../api/Interface.js";
import { makePutRequest } from "../api/Interface.js";
import { makeDeleteRequest } from "../api/Interface.js";


function testGet() {
  let result = makeGetRequest('https://reqres.in/api/users');
  console.log("Get Result:")
  result.then(responseData => {
    console.log(responseData);
  }).catch(err => {
    console.log(err);
  });
}

function testPost() {
  let result = makePostRequest('https://reqres.in/api/register', {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
  });
  console.log("Post Result:")
  result.then(responseData => {
    console.log(responseData);
  }).catch(err => {
    console.log(err);
  });
}

function testPut() {
  let result = makePutRequest('https://reqres.in/api/users/2', {
      "name": "morpheus",
      "job": "zion resident"
  });
  console.log("Put Result:");
  result.then(responseData => {
    console.log(responseData);
  }).catch(err => {
    console.log(err);
  })
}

function testDelete() {
  let result = makeDeleteRequest('https://reqres.in/api/users/2');
  console.log("Delete Result:");
  result.then(responseData => {
    console.log(responseData);
  }).catch(err => {
    console.log(err);
  })
}

const getBtn = document.getElementById('get-btn');
const postBtn = document.getElementById('post-btn');
const putBtn = document.getElementById('put-btn');
const deleteBtn = document.getElementById('delete-btn');
getBtn.addEventListener('click', testGet);
postBtn.addEventListener('click', testPost);
putBtn.addEventListener('click', testPut);
deleteBtn.addEventListener('click', testDelete);
