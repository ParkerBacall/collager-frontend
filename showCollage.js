const searchParams = new URLSearchParams(window.location.search)
const query = searchParams.get('id')
const header = document.getElementById('header')
const title = document.getElementById('title')
const collageInHere = document.getElementById('collage')
const collageBtn = document.getElementById('collageBtn')
const wildCardBtn = document.getElementById('wildCard')

document.addEventListener('DOMCOntentLoaded', fetchCollage())

function fetchCollage(){
fetch(`http://localhost:3000/canvas/${query}`)
.then(response => response.json())
.then(showName)
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
        mapImages(collage)
    })
}

function mapImages(collage){
    collage.images.map(image =>{
        collageImages(image)
    })
}

function collageImages(image){
    let imageSize = Math.floor((Math.random() * 30)+5)
    const img = document.createElement('img')
    img.src = image.sourceImage
    img.classList = image.id
    if (imageSize > 15){
        img.style.position = 'absolute'
    } else{
        img.style.position = 'relative'
    }
    img.style.width = `${imageSize}%`
    collageInHere.appendChild(img)
}