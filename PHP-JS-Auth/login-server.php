<?php
$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

require_once "database.php";
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($conn, $sql);
$user = mysqli_fetch_array($result, MYSQLI_ASSOC);
if ($user) {
  if (password_verify($password, $user["password"])) {
    $success = ['success_message' => 'You are loged in successfully.'];
    $user_information = ['email' => $user['email'], 'full_name' => $user['full_name']];
      $json_success_message = json_encode($success);
      setcookie('user', serialize($user_information), time() + 3600);
      die($json_success_message);
  }else{
    $error = ['password_message' => 'Password does not match!'];
    $json_password_message = json_encode($error);
    die($json_password_message);
  }
}else{
  $error = ['email_message' => 'Email does not match!'];
  $json_error_message = json_encode($error);
  die($json_error_message);
}

  