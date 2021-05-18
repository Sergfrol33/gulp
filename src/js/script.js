window.addEventListener('DOMContentLoaded', ()=>{
    const links = document.querySelectorAll('.landing__link')
    const content = document.querySelectorAll('.landing__content')
    const time = 300
    links.forEach(link =>{
        link.addEventListener('click',(e)=>{
            links.forEach(i=> i.classList.remove('landing__link--active'))
            link.classList.toggle('landing__link--active')
            content.forEach(i=>
                {
                    i.classList.remove('landing__content--active')
                    i.classList.remove('landing__content--opacity')
                }
            )
            if (e.currentTarget.id === links[0].id){
                content[0].classList.add('landing__content--active')
                setTimeout(() =>{
                    content[0].classList.add('landing__content--opacity')
                }, time)
            } else if (e.currentTarget.id === links[1].id){
                content[1].classList.add('landing__content--active')
                setTimeout(() =>{
                    content[1].classList.add('landing__content--opacity')
                }, time)
            } else if (e.currentTarget.id === links[2].id){
                content[2].classList.add('landing__content--active')
                setTimeout(() =>{
                    content[2].classList.toggle('landing__content--opacity')
                }, time)
            } else if (e.currentTarget.id === links[3].id){
                content[3].classList.toggle('landing__content--active')
                setTimeout(() =>{
                    content[3].classList.toggle('landing__content--opacity')
                }, time)
            }
        })
    })
})
