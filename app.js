const logout  = document.getElementById('log-out-link')
const signup  = document.getElementById('sign-up-link')
const login  = document.getElementById('log-in-link')
const nameHeader = document.getElementById('username')
const newCollageButton = document.getElementById('collage-maker')
const collageUl = document.getElementById('collage-link-ul')
const makeCollageButton = document.getElementById('collage-maker')


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
        login.style.display = 'none'
        signup.style.display = 'none'
        logout.addEventListener('click', () => {localStorage.clear()})
    }else{
        logout.style.display = 'none'
        login.style.display = 'block'
        signup.style.display = 'block'
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
        const li = document.createElement('li')
        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'x'
        makeCollageButton.style.display = 'inline'
        deleteBtn.addEventListener('click', () =>  deleteCollage(collage.id))
        deleteBtn.className = 'deleteBtn'
        li.innerHTML = `<a href="showCollage.html?id=${collage.id}"> ${collage.name} </a>`
        collageUl.appendChild(li)
        li.appendChild(deleteBtn)
    })
}

function deleteCollage(id){
    event.target.parentNode.remove()
    fetch(`http://localhost:3000/canvas/${id}`,{
        method: 'DELETE',
    })
}