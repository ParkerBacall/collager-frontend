const logout  = document.getElementById('log-out-link')
const signup  = document.getElementById('sign-up-link')
const login  = document.getElementById('log-in-link')
const nameHeader = document.getElementById('username')


document.addEventListener('DOMContentLoaded', () =>{
    checkToken()
    showUserInfo()
})

function checkToken(){
    if(localStorage.token){
        logout.style.display = 'block'
        login.style.display = 'none'
        signup.style.display = 'none'
        logout.addEventListener('click', () => {localStorage.removeItem('token')})
    }else{
        logout.style.display = 'none'
        login.style.display = 'block'
        signup.style.display = 'block'
        nameHeader.textContent = '_'
    }
}

function showUserInfo(){
    fetch('http://localhost:3000/users', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(displayName)
    }

function displayName(user){
    nameHeader.textContent = `${user.name}'s collages `
}