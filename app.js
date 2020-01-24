const logout  = document.getElementById('log-out-btn')
const signup  = document.getElementById('sign-up-btn')
const login  = document.getElementById('log-in-btn')
const nameHeader = document.getElementById('username')
const newCollageButton = document.getElementById('collage-maker')
const collageUl = document.getElementById('collage-link-ul')
const makeCollageButton = document.getElementById('collage-maker')
const newImageDiv = document.getElementById('new-link')
const collageListDiv = document.getElementById('collage-list-div')

document.addEventListener('DOMContentLoaded', () =>{
    checkToken()
    if(localStorage.token){
        showUserInfo()
    }
    makeCollageButton.addEventListener('click', () => {
        window.location.replace('http://localhost:3001/collage-maker.html')
    })
})

function checkToken(){
    if(localStorage.token){
        logout.style.display = 'block'
        collageListDiv.style.display ='block'
        makeCollageButton.style.display = 'block'
        login.style.display = 'none'
        signup.style.display = 'none'
        logout.addEventListener('click', () => {
            localStorage.clear()
            window.location.replace('')
        })
    }else{
        logout.style.display = 'none'
        login.style.display = 'block'
        signup.style.display = 'block'
        login.addEventListener('click', () => {window.location.replace('login.html')})
        signup.addEventListener('click', () => {window.location.replace('signup.html')})
        nameHeader.textContent = ' '
        newCollageButton.textContent = ' '
    }
}

function showUserInfo(){
    fetch('http://localhost:3000/users',{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(displayName)
}

function displayName(user){
    nameHeader.textContent = `${user.name}'s Collages `
    user.canvas.map(collage => {
        const collageLi = document.createElement('li')
        const collageButton = document.createElement('button')
        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'x'
        makeCollageButton.style.display = 'inline'
        deleteBtn.addEventListener('click', () =>  deleteCollage(collage.id))
        deleteBtn.className = 'deleteBtn'
        collageButton.addEventListener('click', () => {window.location.replace(`showCollage.html?id=${collage.id}`) })
        collageButton.classList = 'btn'
        collageButton.textContent = collage.name
        collageUl.appendChild(collageLi)
        collageLi.append(collageButton, deleteBtn)
    })
}

function deleteCollage(id){
    event.target.parentNode.remove()
    fetch(`http://localhost:3000/canvas/${id}`,{
        method: 'DELETE',
    })
}