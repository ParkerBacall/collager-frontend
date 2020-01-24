const signUpForm = document.getElementById('login')
const signUpURL = 'https://collager-backend.herokuapp.com/login'

document.addEventListener('DOMContentLoaded', () =>{
    signUpForm.addEventListener('submit', () => signUpFunction(event))
    })

    function signUpFunction(event){
        event.preventDefault();
        const signUpData = new FormData(signUpForm)
        const username = signUpData.get('username')
        const password = signUpData.get('password')
        const userObject = {user: {username, password}}
        
        fetch(signUpURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject),
        })
        .then(response => response.json())
        .then(token => {
            localStorage.setItem('token', token.token)
            localStorage.setItem('user', token.user)
        })
       .then(getMeOuttaHere)
    }
    
    
    function getMeOuttaHere(){
        window.location.replace('https://collager.firebaseapp.com/index.html')
    }