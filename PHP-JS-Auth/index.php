<?php
if (isset($_COOKIE['user'])) {
  $user = unserialize($_COOKIE['user']);
  $opts = array(
    'http'=>array(
      'method'=>"GET",
      'header'=>"Accept-language: en\r\n" .
                "Cookie: foo=bar\r\n" . 
                "x-ig-app-id: 936619743392459"
    )
  );
  
  $context = stream_context_create($opts);
  
  $username = $user['full_name'];
  $file = file_get_contents("https://i.instagram.com/api/v1/users/web_profile_info/?username={$username}", false, $context);
  $instagram_feed_data = json_decode($file, true);
}else {
  header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>User Dashboard</title>
</head>
<body>
    <div class="container">
      <img src=<?php $instagram_feed_data['data']['user']['profile_pic_url'] ?> class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title"><?php echo $instagram_feed_data['data']['user']['full_name']; ?></h5>
        <a href="logout.php" class="btn btn-warning">Logout</a>
      </div>
    </div>
</body>
</html>