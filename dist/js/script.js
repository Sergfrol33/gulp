const searchBar = document.getElementById('searchBar');
const citiesList = document.getElementById('citiesList');
const cityValue = document.getElementById('city')
const BASE_URL = '/api?contentType=city&typeCode=1&query='

const obj = {
    key: "save my life",
    key1: "value",
    key2: ["v", "2", 3, 4],
    key3: {
        subKey1: "1232",
        subKey2: ["v", 2, 3, ],
        subKey3: {
            deepWeb: "Tor",
            darkWeb: "i2p",
            dullWeb: "cheburne",
        },
    },
    key4: "no change",
}
const keysToUpper = (src) => {
    for (let prop in src) {
        const upper = prop.toUpperCase();
        if (prop !== upper) {
            src[upper] = src[prop];
            delete src[prop];
        }
        if ('object' === typeof src[upper]) {
            keysToUpper(src[upper]);
        }
    }
    return src
}

console.log(keysToUpper(obj));

let city = []
const loadingCities = async (cities) =>{
    try{
        const res = await fetch(`${BASE_URL}${cities}`)
        city = await res.json();
        displayCities(city.result)
    } catch (e) {
        console.error(e)
    }
}

searchBar.addEventListener('input',(e) =>{
    loadingCities(e.target.value)
})
const displayCities = (city) =>{

    const htmlString = city
        .map(cityName => {
            return`
             <li class="search-result__city" >
                <span id="city">${cityName.name}</span>
             </li>
            `;
        }).join('')

    citiesList.innerHTML = htmlString;
    city.value = '';
}


