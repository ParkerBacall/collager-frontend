const imageUl = document.getElementById('images-list')
const collageForm = document.getElementById('collage-form')
const imagesArray = []

document.addEventListener("DOMContentLoaded", () => {
    fetchImages()
    collageForm.addEventListener('submit', () => {
        event.preventDefault()
        const collageFormData = new FormData(collageForm)
        const name = collageFormData.get('name')
        createCollage(name)
        // createCollageImages(imagesArray)
    })
})

function fetchImages(){
    fetch('http://localhost:3000/images')
    .then(response => response.json())
    .then(showImages)
}

function showImages(images){
    images.map(image =>{
        const imageLi = document.createElement('li')
        imageLi.className = 'imageLi'
        imageLi.id=image.id
        imageLi.innerHTML= `<img src=${image.sourceImage}/>`
        imageUl.appendChild(imageLi)
        imageLi.addEventListener('click', () => {
            imageLi.classList.toggle('active')
            imagesArray.push(image)
            console.log(imagesArray)
        })
    })
}

function createCollage(name){
    console.log('hit')
    fetch('http://localhost:3000/canvas',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: name})
    })
}

