const storedUser = JSON.parse(localStorage.getItem('user'))
const welcome = document.querySelector('.welcome');
const userName = document.querySelector('.js-user-name')
const logout = document.querySelector('.js-logout')
var isLogin = false;
if(storedUser != null || storedUser != undefined) {
    welcome.innerHTML = "Welcome " + storedUser.user_name;
    welcome.href = "#"
    userName.innerHTML = "Welcome, " + storedUser.user_name;
    userName.href = "#"
    logout.innerHTML = "Logout"
    logout.classList.add('btn-logout')
    logout.href = "#";
    isLogin = true;
    localStorage.setItem('cart', JSON.stringify(storedUser.carts))
}

let usersApis = "http://localhost:3000/users"

const btnRegister = document.querySelector('.js-btn-register');
const btnLogin = document.querySelector('.js-btn-login');

function getUser(callback) {
    fetch(usersApis).then(res => res.json())
    .then(callback)
}

function postUsers(data) {
    var option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(usersApis, option).then(response => response.json())
    .then(data => {
        localStorage.setItem('user', JSON.stringify(data))
    })
}

function putUsers(data, id) {
    var option = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(usersApis + `/${id}`, option).then(response => response.json())
}

function register() {
    getUser(handleRegister)
}


function login() {
    getUser(handleLogin)
}

function handleRegister(users) {
    let email = document.querySelector('input[name ="email-register"]');
    let pass = document.querySelector('input[name ="pass-register"]');
    let userName = document.querySelector('input[name="userName-register"]');
    let id = Math.floor(Math.random() * 10000)
    let carts = [];
    while(users.some(user => (user.id === id))) {
        id = Math.floor(Math.random() * 10000)
    }

    var list = [email, pass, userName];

    list.forEach(element => {
        element.addEventListener('blur', function() {
            isCheckEmptyError(list)
        });
    });

    email.addEventListener('blur', ()=> {
        isEmail(email)
    })

    pass.addEventListener('blur', ()=> {
        checkPassword(pass, 6, 15)
    })

    if(!isCheckEmptyError(list) && isEmail(email) && checkPassword(pass, 6, 15)) {
        var data = {
            id,
            user_name: userName.value,
            email: email.value,
            pass: pass.value,
            carts
        }
        var isValidate = users.some(user => (user.email === email.value));

        if(!isValidate) {
            postUsers(data);
            window.location.href = '/index.html';
        }else {
            document.querySelector('.error').classList.remove('d-none');
        }
    }
}

function handleLogin(users) {
    let email = document.querySelector('input[name ="email-login"]').value;
    let pass = document.querySelector('input[name ="pass-login"]').value;
    users.forEach(user => {
        if((user.email === email && user.pass == pass)) {
            localStorage.setItem('user', JSON.stringify(user))
            window.location.href = '/index.html'
        }
    });
}

if(btnLogin != null && btnRegister != null) {
    btnRegister.addEventListener('click', () => {
        register();
    })
    
    btnLogin.addEventListener('click', ()=> {
        login()
    })
}

const btnLogout = document.querySelector('.btn-logout')

if(btnLogout != null || btnLogout != undefined) {
    btnLogout.addEventListener('click', ()=> {
        localStorage.removeItem('user');
        window.location.href = '/index.html'
    })
}

function showError(input, message) {
    console.log(input);
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    small.classList.add('error');
    small.innerText = message;
}

function showSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    small.classList.remove('error');
    small.innerHTML = ''
}

function isCheckEmptyError(list) {
    var isEmpty = false;

    list.forEach(input => {
        var val = input.value.trim();
        if(val == "") {
            showError(input, "Being required");
            isEmpty = true;
        }else {
            showSuccess(input);
        }
    });
    return isEmpty
}

function isEmail(email) {
    var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regexp.test(email.value.trim())) {
        showSuccess(email)
        return true;
    }else {
        showError(email, "Email is not valid")
        return false;
    }
}

function isLengthValid(input, min, max) {
    input.value = input.value.trim();
    var isValid = true;
    if(input.value.length < min) {
        showError(input,'Must be at least ' + min + ' characters');
        isValid = false;
    }
    if(input.value.length > max) {
        showError(input,'Must be less than ' + max + ' characters');
        isValid = false;
    }

    return isValid
}

function checkPassword(input, min, max) {
    var checkPass = false;
    var regexNumber = /\d/g;
    var regexUpLowerCase = /[A-Z]/g;
    var regexSpecialCharacters = /\W/g
    var isAll = true;

    if(!regexNumber.test(input.value.trim())) {
        showError(input, "Password must include number");
        isAll = false;
    }
    if(!regexUpLowerCase.test(input.value.trim())) {
        showError(input, "Password must include UpLowerCase");
        isAll = false;
    }
    if(!regexSpecialCharacters.test(input.value.trim())) {
        showError(input, "Password must include special characters");
        isAll = false;
    }

    if(isLengthValid(input, min, max) && isAll) {
        checkPass = true;
        showSuccess(input)
    }
    return checkPass;
}