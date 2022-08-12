import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;


refs.input.addEventListener('input', debounce(handleSearchCountries, DEBOUNCE_DELAY));

function handleSearchCountries(e) {
    const value = e.target.value.trim()
    console.log(value)
    if (!value) {
        refs.info.innerHTML = '';
        refs.list.innerHTML = '';
        return;
    }
    fetchCountries(value)
        .then(data => {
            if (data.length <= 10) {
                refs.list.innerHTML = createCountriesList(data);
                refs.info.innerHTML = '';
            }
            if (data.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
            }
            if (data.length === 1) {
                refs.list.innerHTML = '';
                refs.info.innerHTML = createCountryDescription(data);
            }
        })
        .catch(error => Notify.failure('Oops, there is no country with that name'));
};

function createCountriesList(data) {
    return data.reduce((acc, el) =>
        acc + `<li class='country-list__item'><img class='country-list__img' src='${el.flags.svg}' alt='${el.name.common}' width=100 height=50><h2>${el.name.common}</h2></li>`, '');
};

function createCountryDescription(data) {
    return data.reduce((acc, el) => acc + createMarKupDiscription(el) ,'')

};

function createMarKupDiscription({ flags, name, capital, population, languages, }) {
    const lang = Object.values(languages).join(', ');
    const marKup = `<div class='country-info__name'>
                        <img class='country-list__img' src='${flags.svg}' alt='${name.common}' width=50 height=25>
                        <h2>${name.common}</h2>
                    </div>
                    <div calss='country-info__discription'>
                    <p><b>Capital:</b> ${capital[0]}</p>
                    <p><b>Population:</b> ${population}</p>
                    <p><b>Languages:</b> ${lang}</p>
                    </div>`;
    return marKup;
};
