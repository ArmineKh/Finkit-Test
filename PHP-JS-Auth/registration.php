<?php
if (isset($_COOKIE['user'])) {
   header("Location: index.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Form</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
      <p class="h3 text-center">Registration form</p>
      <form name="register_form" method="post" id="register_form">
          <div class="form-group">
              <input type="text" class="form-control" name="fullname" placeholder="Full Name:">
          </div>
          <div class='alert alert-danger alert-fullname'></div>
          <div class="form-group">
              <input type="email" class="form-control" name="email" placeholder="Email:">
          </div>
          <div class='alert alert-danger alert-email'></div>
          <div class="form-group">
              <input type="password" class="form-control" name="password" placeholder="Password:">
          </div>
          <div class='alert alert-danger alert-password'></div>
          <div class="form-group">
              <input type="password" class="form-control" name="repeat_password" placeholder="Repeat Password:">
          </div>
          <div class='alert alert-danger alert-repeat-password'></div>
          <div class="form-btn">
              <input type="submit" class="btn btn-primary" value="Register" name="submit">
          </div>
      </form>
      <div class="mt-3"><p>Already Registered <a href="login.php">Login Here</a></p></div>

      <div class='alert alert-success' id="success_message"></div>
      <div class='alert alert-danger'  id="error_message"></div>
    </div>
    <script src="./registr-script.js"></script>
</body>
</html>