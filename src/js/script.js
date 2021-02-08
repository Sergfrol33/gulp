const searchBar = document.getElementById('searchBar');
const citiesList = document.getElementById('citiesList');
const BASE_URL = '/api?contentType=city&typeCode=1&query=' // url для запросов

//объект с ключами
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
//функция поднятия регистра всех ключей
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

//пустой массив городов
let city = []
//асинх фунция загрузки городов с api
const loadingCities = async (cities) =>{
    try{
        const res = await fetch(`${BASE_URL}${cities}`) //ответ с api
        city = await res.json(); // обработка в json-формат
        displayCities(city.result) // отправка результата в отрисовку городов
    } catch (e) {
        console.error(e)
    }
}

//событие при вводе текста в input
searchBar.addEventListener('input',(e) =>{
    loadingCities(e.target.value)//отправка значения из input
})
//функция отрисовки городов
const displayCities = (city) =>{

    const htmlString = city //отрисовка каждого элемента в массиве
        .map(cityName => {
            return`
             <li class="search-result__city" >
                <span>${cityName.name}</span>
             </li>
            `;
        }).join('')

    citiesList.innerHTML = htmlString;
    city.value = ''; //зануление input при обновление страницы
}


