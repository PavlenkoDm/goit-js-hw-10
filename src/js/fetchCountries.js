const fetchCountries = (name) => {
    return fetch(`https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })   
}

export { fetchCountries };


// class GetCountries { 
//     constructor({baseUrl, name, searchOptions}) {
//         this.baseUrl = baseUrl;
//         this.name = name;
//         this.searchOptions = searchOptions;
//     }

//     fetchCountries() {
//         return fetch(`${this.baseUrl}${this.name}${this.searchOptions}`)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//         });
//     }

//     get country() {
//         return this.name;
//     }

//     set country(newName = '') {
//         this.name = newName;
//     }
// }



// const options = {
//     baseUrl: "https://restcountries.com/v2/name/",
//     name: "rus",
//     searchOptions: "?fields=name,capital,population,flags,languages"
// }

// const resiveCountry = new GetCountries(options);

// resiveCountry.name = 'usa';
// resiveCountry.name = 'angola';

// console.log(resiveCountry.fetchCountries().then((data) => console.log(data)));