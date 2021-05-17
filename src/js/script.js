const links = document.querySelectorAll('.landing__link')
const content = document.querySelectorAll('.landing__content')

links.forEach((link,index) =>{
    link.addEventListener('click',(e)=>{
        links.forEach(i=> i.classList.remove('landing__link--active'))
        link.classList.toggle('landing__link--active')
        content.forEach(i=>
            {
                i.classList.remove('landing__content--active')
                    i.classList.remove('landing__content--opacity')
            }
        )
        if (e.currentTarget.id === 'main'){
            content[0].classList.add('landing__content--active')
            setTimeout(() =>{
                content[0].classList.add('landing__content--opacity')
            }, 200)
        } else if (e.currentTarget.id === 'about'){
            content[1].classList.add('landing__content--active')
            setTimeout(() =>{
                content[1].classList.add('landing__content--opacity')
            }, 200)
        } else if (e.currentTarget.id === 'usligi'){
            content[2].classList.add('landing__content--active')
            setTimeout(() =>{
                content[2].classList.toggle('landing__content--opacity')
            }, 200)
        } else if (e.currentTarget.id === 'contacts'){
            content[3].classList.toggle('landing__content--active')
            setTimeout(() =>{
                content[3].classList.toggle('landing__content--opacity')
            }, 200)
        }
    })
})