import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;   
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));





//===============================================================================================//
function onInput(event) {    
    let inputValue = event.target.value.trim();
    if (!inputValue) {
        cleanPage();    
        return;
    } 
    cleanPage();
    fetchCountries(`${inputValue}`)
    .then((data) => {
        if (data.length >= 10) {
            Notify.info('Too many matches found. Please enter a more specific name.');
            return;
        }  
        if (data.length === 1) {
            createCountryInfoMurkup(data)
            return;
        }  
        createCountryListMurkup(data);
    }) 
    .catch((error) => {
        Notify.failure('Oops, there is no country with that name');
    });
}


function createCountryInfoMurkup([data]) {
    const languages = data.languages.map((language) => {
        return language.name;
    }).join(", ");

    const countryInfoMurkup =
        `<div class="flag-name">
            <img src='${data.flags.svg}' alt="flag of ${data.name} width="20" height="20"" />
            <h2>${data.name}</h2>
        </div>
        <p><b>Capital:</b> ${data.capital}</p>
        <p><b>Population:</b> ${data.population}</p>
        <p><b>Lenguages:</b> ${languages}</p>`;
    refs.countryInfo.innerHTML = countryInfoMurkup;
}


function createCountryListMurkup(data) {
    refs.countryList.innerHTML = data.map((country) => {
        return `<li class="flag-name">
                    <img src='${country.flags.svg}' alt="flag of ${country.name} width="20" height="20"" />
                    <h2>${country.name}</h2>
                </li>`
    }).join(" ");
    
}


function cleanPage() {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
}
