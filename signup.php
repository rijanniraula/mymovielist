<?php


$msg = "";
if (isset($_POST['submit'])) {
	include 'dbconnect.php';

	$username = $_POST['username'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	$date = date('Y-m-d');

	$hash = password_hash($password, PASSWORD_DEFAULT);



	$sql = "INSERT INTO users (username,email,pass,creation_date) values('$username','$email','$hash','$date');";


	if (mysqli_query($conn, $sql)) {

		header("location:login.php");
	} else {

		$msg = "Try Again!";
	}
}




?>







<!DOCTYPE html>
<html>

<head>

	<title>MyMovieList--Sign Up</title>
	<link rel="stylesheet" href="styles/login.css">

</head>

<body>

	<div class="log" align="center">


		<h1>MyMovieList</h1>
		<span class="incorrect"><?php echo $msg; ?></span>

		<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
			<div class="userpass">
				<!-- <label for="username" >Username</label> -->
				<input type="text" name="username" placeholder="Username" id="username" class="input-control" required>
				<!-- <label for="password">Password</label> -->
				<input type="email" name="email" placeholder="Email" id="email" class="input-control" required>
				<input type="password" name="password" placeholder="Password" class="input-control" required>
				<!-- <input type="password" name="password" placeholder="Confirm Password" class="input-control" required > -->

			</div>

			<button type="submit" name="submit" id="button">Sign Up</button>

		</form>


		<p class="noaccount">Already have an account? <a href="login.php" class="links">Log In</a></p>



	</div>


</body>

</html>