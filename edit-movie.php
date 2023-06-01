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
    <link rel="stylesheet" href="styles/dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>MML--Edit Movie</title>
</head>

<body>
    <div class="header-container">
        <div class="header-left">MyMovieList</div>

        <div class="header-right">
            <div class="profile"> Profile</div>

        </div>
    </div>
    <div class="main">
        <div class="sidebar">
            <ul>
                <a href="admin-dashboard.php">
                    <li class="nav-list"><i class="fa-solid fa-chart-line"></i> Dashboard</li>
                </a>
                <a href="add-movie.php">
                    <li class="nav-list"><i class="fa-solid fa-photo-film"></i> Add Movie</li>
                </a>

                <li class="nav-list" style="background-color: royalblue; color: white;"><i class="fa-solid fa-pen-to-square"></i> Edit Movie</li>

                <a href="manage-users.php">
                    <li class="nav-list"><i class="fa-solid fa-users"></i> Manage Users</li>
                </a>
                <a href="logout.php">
                    <li class="nav-list" id="li-logout">
                        <i class="fa-solid fa-right-from-bracket"></i>Log Out
                    </li>
                </a>
            </ul>
        </div>


        <div class="content">

        </div>

    </div>



</body>