const message = document.getElementById('message')
const button = document.getElementById('button')
button.addEventListener('click',() =>{
    message.style.opacity = '1'
    message.style.marginBottom = '25px'
    setTimeout(() =>{
        message.style.opacity = '0'
    },3000)
})
