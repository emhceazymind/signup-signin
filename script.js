let container = document.querySelector('.container');
let loginBtn = document.querySelector('.login-btn');
let registerBtn = document.querySelector('.register-btn');

let registerForm = document.getElementById('registerForm');
let loginForm = document.getElementById('loginForm');

        // Toggle functionality
registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

let database = JSON.parse(localStorage.getItem('myownDatabase')) || [];
let tbody = document.getElementById('tbody');

function displayTable() {
   tbody.innerHTML = '';
    database.forEach(function (userObj, i) {
    tbody.innerHTML += `<tr>
        <td> ${i + 1}</td>
        <td> ${userObj.name}</td>
        <td> ${userObj.email} </td>
        <td>${userObj.password} </td>
        <td> ${userObj.terms ? 'agreed' : 'not agreed'} </td>
        </tr>`;
    });
}

displayTable();

function handleLoading(buttonElement, callback) {
    let originalText = buttonElement.innerHTML;
     buttonElement.innerHTML = 'loading...';
     buttonElement.disabled = true;

    setTimeout(() => {
        buttonElement.innerHTML = originalText;
        buttonElement.disabled = false;
        callback(); // Execute the form submission logic after the delay
        }, 2000);
    }


    // Sign Up Section //
function signUp() {
    let usernameInput = document.getElementById('registerUsername');
    let emailInput = document.getElementById('registerEmail');
    let passwordInput = document.getElementById('registerPassword');
    let confirmPasswordInput = document.getElementById('confirmPassword');
    let termsCheckbox = document.getElementById('terms');

    let myUsername = usernameInput.value.trim();
    let myEmail = emailInput.value.trim();
    let myPassword = passwordInput.value.trim();
    let myConfirmedPassword = confirmPasswordInput.value.trim();
    let agreedToTerms = termsCheckbox.checked;

            if (!myUsername || !myEmail || !myPassword || !myConfirmedPassword) {
                alert('All fields are mandatory');
                return;
            }

            if (!myEmail.includes('@')) {
                alert('Please enter a valid email');
                return;
            }

            if (database.some(userObj => userObj.email === myEmail)) {
                alert('User already exists');
                return;
            }

            if (myPassword.length < 8) {
                alert('Password should be at least 8 characters');
                return;
            }

            if (myPassword !== myConfirmedPassword) {
                alert('Password does not match');
                return;
            }
            
            if (!agreedToTerms) {
                alert('You must agree to the terms and conditions');
                return;
            }

            let userObj = {
                name: myUsername,
                email: myEmail,
                password: myPassword,
                terms: agreedToTerms
            };

            database.push(userObj);
            localStorage.setItem('myownDatabase', JSON.stringify(database));

            displayTable();
            alert('Sign up successful');
            registerForm.reset();
        }

//  Login Section //
function loginUser() {
    let loginEmail = document.getElementById('loginEmail').value.trim();
    let loginPassword = document.getElementById('loginPassword').value.trim();

            if (!loginEmail || !loginPassword) {
                alert('Please enter both email and password.');
                return;
            }

            let userFound = database.find(user => user.email === loginEmail && user.password === loginPassword);

            if (userFound) {
                alert(`Welcome back, ${userFound.name}! Login successful.`);
                loginForm.reset();
            } else {
                alert('Invalid credentials. Please check your email and password.');
            }
        }

function handleRegistration() {
    handleLoading(event.target, signUp);
}

function handleLogin() {
    handleLoading(event.target, loginUser);
}