
let login_form =  document.getElementById('login_form')
login_form.addEventListener('submit', function(e){
  e.preventDefault()
  let email = document.querySelector('[name="email"]').value;
  let password = document.querySelector('[name="password"]').value;


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
  }else {
    password_message.style.display = 'none'
    password_message = '';
  }

  let login_url = '/login-server.php';

  let login_form = {
    email,
    password
  }

  fetch(login_url, 
    { method: 'POST', 
      body: JSON.stringify(login_form), 
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
    email = '';
    password = '';
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

    if(data.password_message) {
      document.getElementById("error_message").style.display = 'block';
      document.getElementById("error_message").innerHTML = data.password_message;

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
        location.href = location.origin + "/index.php"; 

      }, 5000);
    }
    console.log(data);

  })
  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });
  
})
