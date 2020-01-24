const signUpForm = document.getElementById('signup')
const signUpURL = 'https://collager-backend.herokuapp.com/users'

document.addEventListener('DOMContentLoaded', () =>{
    signUpForm.addEventListener('submit', () => signUpFunction(event))
    })

    function signUpFunction(event){
        event.preventDefault();
        const signUpData = new FormData(signUpForm)
        const username = signUpData.get('username')
        const password = signUpData.get('password')
        const name = signUpData.get('name')
        const email = signUpData.get('email')

        const userObject = {user: {name, email, username, password}}
        
        fetch(signUpURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userObject)
        })
        window.location.replace('https://collager.firebaseapp.com/index.html/')
    }
