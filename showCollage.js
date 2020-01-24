const searchParams = new URLSearchParams(window.location.search)
const query = searchParams.get('id')
const header = document.getElementById('header')
const title = document.getElementById('title')
const collageInHere = document.getElementById('collage-inner-div')
const collageBtn = document.getElementById('collageBtn')
const wildCardBtn = document.getElementById('wildCard')
const backBtn = document.getElementById('back-btn')
let imageSize = 0
let imagePostition = 0
let imageHeight = 0


document.addEventListener('DOMCOntentLoaded', fetchCollage())

function fetchCollage(){
fetch(`https://collager-backend.herokuapp.com/canvas/${query}`)
.then(response => response.json())
.then(runner)
}

function runner(collage){
    showName(collage)
    showCollage(collage)
}

function showCollage(collage){
    collage.canva_images.map(canva_image =>{
        const img = document.createElement('img')
        img.src = canva_image.image.sourceImage
        img.style.position = canva_image.position
        img.style.width = canva_image.size
        img.style.top = canva_image.height

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
    backBtn.addEventListener('click', () => {
        window.location.replace('index.html')
    })

}

function mapImages(collage){
    collage.canva_images.map(canva_image =>{
        collageImages(canva_image)
    })
}

function collageImages(canva_image){
    let imageSize = Math.floor((Math.random() * 30)+5)
    let imageHeight = Math.floor((Math.random() * 100)+5)
    const img = document.createElement('img')
    img.src = canva_image.image.sourceImage
    img.classList = canva_image.id
    if (imageSize > 25){
        img.style.position = 'absolute'
        imagePostition = 'absolute'

    } else{
        img.style.position = 'relative'
        imagePostition = 'relative'
        img.style.top = `${imageHeight}px`
        imageHeight = `${imageHeight}px`
    }
    img.style.width = `${imageSize}%`

    imageSize = `${imageSize}%`
    collageInHere.appendChild(img)
    updateImage(canva_image.id, imageSize, imagePostition, imageHeight)
}

function updateImage(id, size, position, imageHeight){
    fetch(`http://localhost:3000/canva_images/${id}`, {
    method: 'PATCH',
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({size: size, position: position, height: imageHeight}),
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
    let imageHeight = Math.floor((Math.random() * 100)+5)
    const img = document.createElement('img')
    img.src = canva_image.image.sourceImage
    img.classList = canva_image.id
    if (imageSize > 15){
        img.style.position = 'absolute'
        imagePostition = 'absolute'

    } else{
        img.style.position = 'relative'
        imagePostition = 'relative'
        img.style.top = `${imageHeight}px`
        imageHeight = `${imageHeight}px`
    }
    img.style.width = `${imageSize}%`
    imageSize = `${imageSize}%`
    collageInHere.appendChild(img)
    CreateCollageImage(
        canva_image.canva_id, 
        canva_image.image_id, 
        imageSize, 
        imagePostition,
        imageHeight
        )
}

function CreateCollageImage(collage_id, image_id, size, position, imageHeight){
    fetch(`https://collager-backend.herokuapp.com/canva_images/`, {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        collage_id: collage_id, 
        image_id: image_id, 
        size: size, 
        position: position,
        height: imageHeight
    }),
    })
    .then(response => response.json())
    .then(console.log)
}