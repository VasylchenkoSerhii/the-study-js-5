import './css/styles.css';
const debounce = require('lodash.debounce');


const refs = {
    input: document.querySelector('[id="search-box"]'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};
const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', onInput);




function onInput(e) {
    let nameCountry = e.currentTarget.value;
    fetchCountry(nameCountry);
}; 

function fetchCountry(name) {
    return fetch(`https://restcountries.com/v2/name/${name}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 1) {
                refs.list.textContent = '';
                createCountryDescription(data);
                return;
            } else if (data.length <= 10) {
                refs.info.textContent = '';
                refs.list.textContent = '';
                createCountrysList(data);
                return;
            } else if (data.length > 10) {
                alert('Too many matches found. Please enter a more specific name.');
            } else if (data.status === 404) {
                alert('Oops, there is no country with that name');
            } else if(data.message === 'Page Not Found') {
                refs.info.textContent = '';
                refs.list.textContent = '';
            }
        })
        .catch(error => console.log(error));
}

function createCountrysList(array) {
    const marKup = array.reduce((acc, el) =>
        acc + `<li class='country-list__item'><img class='country-list__img' src='${el.flag}' alt='${el.name}' width=100 height=50><p>${el.name}</p></li>`, '');
    refs.list.insertAdjacentHTML('beforeend', marKup);
};

function createCountryDescription(data) {
    const marKup = data.reduce((acc, el) => acc + createMarKupDiscription(el) ,'')
    
    refs.info.insertAdjacentHTML('beforeend', marKup);
};

function createMarKupDiscription({ flag, name, capital, population, languages, }) {
    const marKup = `<div class='country-info__name'>
                        <img class='country-list__img' src='${flag}' alt='${name}' width=50 height=25>
                        <h2>${name}</h2>
                    </div>
                    <div calss='country-info__discription'>
                    <p><b>Capital:</b> ${capital}</p>
                    <p><b>Population:</b> ${population}</p>
                    <p><b>Languages:</b> ${languages[0].name}</p>
                    </div>`;
    return marKup;
};
