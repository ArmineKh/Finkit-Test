<?php
  $data = json_decode(file_get_contents('php://input'), true);
  $fullname = $data['fullname'];
  $email = $data['email'];
  $password = $data['password'];

  $passwordHash = password_hash($password, PASSWORD_DEFAULT);

  require_once "database.php";
  $sql = "SELECT * FROM users WHERE email = '$email'";
  $result = mysqli_query($conn, $sql);
  $rowCount = mysqli_num_rows($result);

  if ($rowCount>0) {
    $error = ['email_message' => 'Email already exists!'];
    $json_error_message = json_encode($error);
    die($json_error_message);
  }else{

    $sql = "INSERT INTO users (full_name, email, password)
    VALUES ('$fullname', '$email', '$passwordHash')";
    
    if ($conn->query($sql) === TRUE) {
      $success = ['success_message' => 'You are registered successfully.'];
      $json_success_message = json_encode($success);
      die($json_success_message);
    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
    }

  }

  die;
  
   
        