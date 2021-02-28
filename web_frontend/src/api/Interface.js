/*
This is the file for making HTTP requests to the API. Calls to the request
functions will return a promise object. The calling function will have to handle
.then and .catch methods on the promise
*/

export function makeGetRequest(url, data) {
  return makeHttpRequest('POST', url, data)
}

export function makePostRequest(url, data) {
  return makeHttpRequest('POST', url, data)
}

export function makePutRequest(url, data) {
  return makeHttpRequest('PUT', url, data)
}

export function makeDeleteRequest(url) {
  return makeHttpRequest('DELETE', url)
}

function makeHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);

    request.responseType = 'json';
    if (data) {
      request.setRequestHeader('Content-Type', 'application/json');
    }

    request.onerror = function() {
      reject("Error Occurred.");
    }

    request.onload = function() {
      resolve(request.response);
    };
    request.send(JSON.stringify(data));
  });
  return promise;
}
