const imageUl = document.getElementById('images-list')
const collageForm = document.getElementById('collage-form')
const imagesArray = []

document.addEventListener("DOMContentLoaded", () => {
    fetchImages()
    collageForm.addEventListener('submit', () => {
        event.preventDefault()
        const collageFormData = new FormData(collageForm)
        const name = collageFormData.get('name')
        console.log('images Array send', imagesArray)
        createCollage(name, imagesArray)
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
        })
    })
}

function createCollage(name, imagesArray){
    fetch('http://localhost:3000/canvas',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({name}),
    })
    .then(response => response.json())
    .then(response => createCollageImages(imagesArray, response.id))
}

function createCollageImages(imagesArray, collage){
    imagesArray.map(image => {
        postCollageImages(image.id, collage)
    })
}


function postCollageImages(image_id, collage_id){
    fetch('http://localhost:3000/canva_images',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({collage_id, image_id}),
    })
    .then(response => response.json())
    .then(showNewCollage(collage_id))
}

function showNewCollage(collage){
    window.location.replace(`showCollage.html?id=${collage}`)
}