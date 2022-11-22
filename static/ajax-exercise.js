'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
  .then((response) =>response.text())
  .then((ServerData)=>{
    console.log("this s server data")
    document.querySelector("#fortune-text").innerHTML=ServerData;
  });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;
  // we creating search object to simlify queryString 
  const queryString= new URLSearchParams({zipcode}).toString()
fetch(`${url}?${queryString}`)
.then((response) => response.json())
.then((responseJson) => {
  // console.log(responseJson);
  const weatherSummery =`${responseJson.forecast}, ${responseJson.temp}`
//  document.querySelector('#weather-info').innerHTML=responseJson.forecast;
//  document.querySelector('#weather-info').innerHTML=responseJson.temp;
 document.querySelector('#weather-info').innerHTML=weatherSummery; 
});
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS
function updateMelons(results) {
  if (results.code === 'OK') {
    document.querySelector('#order-status').classList.remove('order-error');
    document.querySelector('#order-status').innerHTML = `<p>${results.msg}</p>`;
  } else {
    document.querySelector('#order-status').classList.add('order-error');
    document.querySelector('#order-status').innerHTML = `<p><b>${results.msg}</b></p>`;
  }
}

function orderMelons(evt) {
  evt.preventDefault();
  const formInputs={
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };
  fetch(`/order-melons.json`, {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((updateMelons));
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);


// Use AJAX to get information from another website¶
document.querySelector('#get-dog-image').addEventListener('click', () => {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((result) => {
      const imageUrl = result.message;
      document
        .querySelector('#dog-image')
        .insertAdjacentHTML('beforeend', `<div><img src=${imageUrl}></div>`);
    });
});