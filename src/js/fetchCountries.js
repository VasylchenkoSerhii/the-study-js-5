import { refs } from "./refs";
import { createCountryDescription, createCountrysList } from "../index";

const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER_RESPONSE = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}?field=${FILTER_RESPONSE}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};


