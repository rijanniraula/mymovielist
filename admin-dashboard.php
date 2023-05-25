<?php
session_start();

if (isset($_SESSION["user"])) {
    //  echo "Successfully Logged In";
} else {
    header("location:login.php");
}


?>

<html>

<head>
    <link rel="stylesheet" href="styles/admin-dashboard.css">
    <title>MML--Dashboard</title>
</head>

<body>
    <div class="header-container">
        <div class="header-left">MyMovieList</div>

        <div class="header-right">
            <div class="profile"> Profile</div>
            <div class="logout">
                <form style="margin: 0" action="logout.php"><button type="submit" name="logout">Log Out</button></form>
            </div>
        </div>
    </div>
    <div class="main">
        <div class="sidebar">
            <ul>
                <li class="nav-list">Add Movie</li>
                <li class="nav-list">Edit Movie</li>
                <li class="nav-list">Manage Users</li>

            </ul>
        </div>


        <div class="content">

        </div>

    </div>



</body>