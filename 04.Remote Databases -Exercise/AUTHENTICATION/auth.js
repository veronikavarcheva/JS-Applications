//Register user:

document.getElementById('register').addEventListener('click', (e)=>{
    e.preventDefault();
    const emailInput = document.querySelector('#register-form input[name="email"]');
    const passwordInput = document.querySelector('#register-form input[name="psw"]');
    // console.log(emailInput);
    // console.log(passwordInput);
    
    if(emailInput.value != '' && passwordInput.value.length >= 6) {
       firebase.auth().createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
        .then((data)=> console.log(data))
        .catch(err=> console.log(err));        
    };

});

//Login user:

document.getElementById('login').addEventListener('click', (e)=>{
    e.preventDefault();
    const emailInput = document.querySelector('#login-form input[name="email"]');
    const passwordInput = document.querySelector('#login-form input[name="psw"]');
    
    firebase.auth().signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then((data)=> console.log(data))
    .catch(err=> console.log(err));
});

//Logout user:
document.getElementById('logout').addEventListener('click', ()=>{
    firebase.auth().signOut()
    .then((data)=> console.log(data))
    .catch(err=> console.log(err));
});
