window.addEventListener('DOMContentLoaded',()=>{
    const submitButton = document.querySelector('.contacts__submit')
    const form = document.querySelector('form')
    form.addEventListener('submit',(e)=>{
        e.preventDefault()
    })

    const initMap = () => {
        // Создание экземпляра карты и его привязка к контейнеру с
        // заданным id ("map").
        new ymaps.Map('map', {
            // При инициализации карты обязательно нужно указать
            // её центр и коэффициент масштабирования.
            center: [55.76, 37.64], // Москва
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
    }
    ymaps.ready(initMap);
})
