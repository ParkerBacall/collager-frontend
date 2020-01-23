const searchParams = new URLSearchParams(window.location.search)
const query = searchParams.get('id')
const header = document.getElementById('header')
const title = document.getElementById('title')
const collageInHere = document.getElementById('collage')
const collageBtn = document.getElementById('collageBtn')
const wildCardBtn = document.getElementById('wildCard')
let imageSize = 0
let imagePostition = 0


document.addEventListener('DOMCOntentLoaded', fetchCollage())

function fetchCollage(){
fetch(`http://localhost:3000/canvas/${query}`)
.then(response => response.json())
.then(runner)
}

function runner(collage){
    showName(collage)
    showCollage(collage)
}

function showCollage(collage){
    console.log(collage)
    collage.canva_images.map(canva_image =>{
        const img = document.createElement('img')
        img.src = canva_image.image.sourceImage
        img.style.position = canva_image.position
        img.style.width = canva_image.size
        collageInHere.appendChild(img)
    })
}

function showName(collage){
    title.textContent = collage.name
    collageBtn.addEventListener('click', () => {
        collageInHere.innerHTML = ''
        event.preventDefault()
        mapImages(collage)
    })
    wildCardBtn.addEventListener('click', () =>{
         event.preventDefault()
        mapImagesSecret(collage)
    })
}

function mapImages(collage){
    collage.canva_images.map(canva_image =>{
        collageImages(canva_image)
    })
}

function collageImages(canva_image){
    let imageSize = Math.floor((Math.random() * 30)+5)
    const img = document.createElement('img')
    img.src = canva_image.image.sourceImage
    img.classList = canva_image.id
    if (imageSize > 15){
        img.style.position = 'absolute'
        imagePostition = 'absolute'

    } else{
        img.style.position = 'relative'
        imagePostition = 'relative'
    }
    img.style.width = `${imageSize}%`
    imageSize = `${imageSize}%`
    collageInHere.appendChild(img)
    updateImage(canva_image.id, imageSize, imagePostition)
}

function updateImage(id, size, position){
    fetch(`http://localhost:3000/canva_images/${id}`, {
    method: 'PATCH',
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({size: size, position: position}),
    })
    .then(response => response.json())
    .then(console.log)
}

function mapImagesSecret(collage){
    collage.canva_images.map(canva_image =>{
        collageImagesSecret(canva_image)
    })
}

function collageImagesSecret(canva_image){
    let imageSize = Math.floor((Math.random() * 30)+5)
    const img = document.createElement('img')
    img.src = canva_image.image.sourceImage
    img.classList = canva_image.id
    if (imageSize > 15){
        img.style.position = 'absolute'
        imagePostition = 'absolute'

    } else{
        img.style.position = 'relative'
        imagePostition = 'relative'
    }
    img.style.width = `${imageSize}%`
    imageSize = `${imageSize}%`
    collageInHere.appendChild(img)
    CreateCollageImage(
        canva_image.canva_id, 
        canva_image.image_id, 
        imageSize, 
        imagePostition)
}

function CreateCollageImage(collage_id, image_id, size, position){
    fetch(`http://localhost:3000/canva_images/`, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        collage_id: collage_id, 
        image_id: image_id, 
        size: size, 
        position: position}),
    })
    .then(response => response.json())
    .then(console.log)
}