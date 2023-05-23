
let register_form =  document.getElementById('register_form')
register_form.addEventListener('submit', function(e){
  e.preventDefault()
  let fullname = document.querySelector('[name="fullname"]').value;
  let email = document.querySelector('[name="email"]').value;
  let password = document.querySelector('[name="password"]').value;
  let repeat_password = document.querySelector('[name="repeat_password"]').value;

  let fullname_message = document.getElementsByClassName('alert-fullname')[0] 
  if(fullname.length == 0 ){
    fullname_message.style.display = 'block'
    fullname_message.innerText = 'Full Name is required' 
  } else {
    fullname_message.style.display = 'none'
    fullname_message = '';
  }

  let email_valid_regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let email_message = document.getElementsByClassName('alert-email')[0] 
  if(email.length == 0 ){
    email_message.style.display = 'block'
    email_message.innerText = 'Email is required!' 
  } else if(!email.match(email_valid_regex)){
    email_message.style.display = 'block'
    email_message.innerText = 'Invalid email address!' 
  }else {
    email_message.style.display = 'none'
    email_message = '';
  }

  
  let password_message = document.getElementsByClassName('alert-password')[0] 
  if(password.length == 0 ){
    password_message.style.display = 'block'
    password_message.innerText = 'Password is required!' 
  } else if(password.length < 8){
    password_message.style.display = 'block'
    password_message.innerText = 'Password must be at least 8 charactes long!' 
  }else {
    password_message.style.display = 'none'
    password_message = '';
  }

  let repeat_password_message = document.getElementsByClassName('alert-repeat-password')[0] 
  if(repeat_password.length == 0 ){
    repeat_password_message.style.display = 'block'
    repeat_password_message.innerText = 'Repeat Password!' 
  } else if(password !== repeat_password){
    repeat_password_message.style.display = 'block'
    repeat_password_message.innerText = 'Password does not match!' 
  }else {
    repeat_password_message.style.display = 'none'
    repeat_password_message = '';
  }

  let register_url = 'http://php-js-auth/server.php';

  let register_form = {
    fullname,
    email,
    password
  }

  fetch(register_url, 
    { method: 'POST', 
      body: JSON.stringify(register_form), 
      mode: 'no-cors',
      creadentials: 'same-origin', 
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials" : true 
      }, 
      mode: 'no-cors' })
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        'Looks like there was a problem. Status Code: ' + response.status
      );
    }
    fullname = '';
    email = '';
    password = '';
    repeat_password = '';
    return response.json();
  })
  .then(function (data) {
   
    if(data.email_message) {
      document.getElementById("error_message").style.display = 'block';
      document.getElementById("error_message").innerHTML = data.email_message;

      setTimeout(function(){
        document.getElementById("error_message").innerHTML = '';
        document.getElementById("error_message").style.display = 'none';
      }, 5000);
    }
    if(data.success_message) {
      document.getElementById("success_message").style.display = 'block';
      document.getElementById("success_message").innerHTML = data.success_message;

      setTimeout(function(){
        document.getElementById("success_message").innerHTML = '';
        document.getElementById("success_message").style.display = 'none';
        location.href = location.origin + "/login.php"; 

      }, 5000);
    }
    console.log(data);

  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
  
})
