window.addEventListener('DOMContentLoaded', ()=>{
    const links = document.querySelectorAll('.landing__link')
    const contentBlock = document.querySelectorAll('.landing__content')
    class Content {
        constructor(links,content,time) {
            this.links = links
            this.content = content
            this.time = time || 300
        }
        init(){
            this.links.forEach(link =>{
                link.addEventListener('click',(e)=>{
                    this.links.forEach(i=> i.classList.remove('landing__link--active'))
                    link.classList.toggle('landing__link--active')
                    this.content.forEach(i=>
                        {
                            i.classList.remove('landing__content--active')
                            i.classList.remove('landing__content--opacity')
                        }
                    )
                    this.switchContent(e.currentTarget.id)
                })
            })
        }
        switchContent(id){
            switch (id){
                case this.links[0].id:
                    this.content[0].classList.add('landing__content--active')
                    setTimeout(() =>{
                        this.content[0].classList.add('landing__content--opacity')
                    }, this.time)
                    break
                case this.links[1].id:
                    this.content[1].classList.add('landing__content--active')
                    setTimeout(() =>{
                        this.content[1].classList.add('landing__content--opacity')
                    }, this.time)
                    break
                case this.links[2].id:
                    this.content[2].classList.add('landing__content--active')
                    setTimeout(() =>{
                        this.content[2].classList.add('landing__content--opacity')
                    }, this.time)
                    break
                case this.links[3].id:
                    this.content[3].classList.add('landing__content--active')
                    setTimeout(() =>{
                        this.content[3].classList.add('landing__content--opacity')
                    }, this.time)
                    break
                default:
                    return
            }
        }
    }
   /* parameters = {
        links: this.links,
        content: this.content,
        time: this.time
    }
    this.config = parameters*/
    const content = new Content(links,contentBlock)
    content.init()
})
