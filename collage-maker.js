const imageUl = document.getElementById('images-list')
const collageForm = document.getElementById('collage-form')
const imagesArray = []

document.addEventListener("DOMContentLoaded", () => {
    fetchImages()
    collageForm.addEventListener('submit', () => {
        event.preventDefault()
        const collageFormData = new FormData(collageForm)
        const name = collageFormData.get('name')
        createCollage(name, imagesArray)
    })
})

function fetchImages(){
    fetch('https://collager-backend.herokuapp.com/images/')
    .then(response => response.json())
    .then(showImages)
}

function showImages(images){
    images.map(image =>{
        const imageLi = document.createElement('li')
        const img = document.createElement('img')
        imageLi.className = 'imageLi'
        imageLi.id= image.id
        img.src = image.sourceImage
        imageLi.appendChild(img)
        imageUl.appendChild(imageLi)
        img.addEventListener('click', () => {
            img.classList.toggle('active')
            imagesArray.push(image)
        })
    })
}

function createCollage(name, imagesArray){
    fetch('https://collager-backend.herokuapp.com/canvas',{
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
    fetch('https://collager-backend.herokuapp.com/canva_images',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({collage_id: collage_id, image_id: image_id, size: "0%", position: "", height: ''}),
    })
    .then(response => response.json())
    .then(showNewCollage(collage_id))
}

function showNewCollage(collage){
    window.location.replace(`showCollage.html?id=${collage}`)
}