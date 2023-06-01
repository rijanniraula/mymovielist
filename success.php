<?php

session_start();

if (isset($_SESSION["user"])) {
    //    echo "Successfully Logged In";
} else {
    header("location:login.php");
}

?>

<html>

<head>

</head>

</html>

<form action="logout.php"><button type="submit" name="logout">Log Out</button></form>