<?php


$msg = "";
if (isset($_POST['submit'])) {
	include 'dbconnect.php';
	$username = $_POST['username'];
	$password = $_POST['password'];

	$sql = "SELECT * FROM users WHERE username='$username'";

	$result = mysqli_query($conn, $sql);


	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		if (password_verify($password, $row['pass'])) {
			session_start();
			$_SESSION['user'] = $row['username'];
			if ($row['role'] == "admin") {
				header("location: admin-dashboard.php");
			} else {
				header("location: success.php");
			}
		}
	} else {
?>


		<div class="toast">
			<div class="toast__icon-wrapper error">
				<i class="fa-solid fa-circle-xmark fa-xl" style="color: #ff0000;"></i>
			</div>
			<div class="toast__content">
				<div class="content__heading">
					<h3>Error</h3>
				</div>
				<div class="content__desc">Credentials incorrect</div>
			</div>
		</div>
		<!-- $msg = "Username or Password is incorrect!"; -->
<?php
	}
}




?>







<!DOCTYPE html>
<html>

<head>

	<title>MyMovieList--Login</title>
	<link rel="stylesheet" href="styles/login.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body id="body">

	<div class="log" align="center">


		<h1>MyMovieList</h1>
		<span class="incorrect"><?php echo $msg; ?></span>

		<form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
			<div class="userpass">
				<!-- <label for="username" >Username</label> -->
				<div class="input-wrapper">
					<input type="text" name="username" placeholder="Username" id="username" class="input-control" required />
					<i class="fa-solid fa-user input-icon"></i>
				</div>
				<!-- <label for="password">Password</label> -->
				<div class="input-wrapper">
					<input type="password" name="password" placeholder="Password" class="input-control" required />
					<i class="fa-solid fa-key input-icon"></i>
				</div>

			</div>

			<button type="submit" name="submit" id="button">Login</button>

		</form>


		<p class="noaccount">Don't have an account? <a href="signup.php" class="links">Sign Up</a></p>



	</div>


</body>

</html>