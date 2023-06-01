<?php

session_start();

if (isset($_SESSION["user"])) {
    //  echo "Successfully Logged In";
} else {
    header("location:login.php");
}

?>

<?php

if (isset($_POST['submit'])) {

    include 'dbconnect.php';

    $title = mysqli_real_escape_string($conn, $_POST['title']);
    $genres = mysqli_real_escape_string($conn, $_POST['genre']);
    $releasedate = $_POST['release-date'];
    $synopsis = mysqli_real_escape_string($conn, $_POST['synopsis']);
    $director = mysqli_real_escape_string($conn, $_POST['director']);
    $writers = mysqli_real_escape_string($conn, $_POST['writers']);
    $producer = mysqli_real_escape_string($conn, $_POST['producer']);
    $cast = mysqli_real_escape_string($conn, $_POST['cast']);

    //Poster
    $poster = $_FILES['poster'];
    $postername = $_FILES['poster']['name'];
    $postertempname = $_FILES['poster']['tmp_name'];
    $postersize = $_FILES['poster']['size'];
    $postererror = $_FILES['poster']['error'];
    $posterext = explode('.', $postername);
    $posteractualext = strtolower(end($posterext));

    //Trailer
    $trailer = $_FILES['trailer'];
    $trailername = $_FILES['trailer']['name'];
    $trailertempname = $_FILES['trailer']['tmp_name'];
    $trailersize = $_FILES['trailer']['size'];
    $trailererror = $_FILES['trailer']['error'];
    $trailerext = explode('.', $trailername);
    $traileractualext = strtolower(end($trailerext));

    //extensions
    $allowedext = array('jpg', 'jpeg', 'png', 'mp4');

    $upload_flag = 0;

    //poster file checking and moving
    if (in_array($posteractualext, $allowedext)) {
        if ($postererror === 0) {
            if ($postersize < 10000000) {
                $posternamenew = $_POST['title'] . uniqid('', true) . "." . $posteractualext;
                $posterdestination = 'posters/' . $posternamenew;
                $upload_flag = $upload_flag + 1;
                // var_dump($posternamenew);
            } else {
                $perror = "Poster File size too big";
            }
        } else {
            $perror = "There was an error uploading the poster! Try Again";
        }
    } else {
        $perror = "Invalid Poster File Type";
    }

    //trailer file checking and moving
    if (in_array($traileractualext, $allowedext)) {
        if ($trailererror === 0) {
            if ($trailersize < 50000000) {
                $trailernamenew = $_POST['title'] . uniqid('', true) . "." . $traileractualext;
                $trailerdestination = 'trailers/' . $trailernamenew;

                $upload_flag = $upload_flag + 1;
            }
            $terror = "Trailer File Size Too Big!";
        }
        $terror = "There was an error uploading the trailer! Try Again";
    }
    $terror = "Invalid Trailer File Type. Allowed type: mp4";


    if ($upload_flag == 2) {
        // var_dump($trailerdestination);
        move_uploaded_file($postertempname, $posterdestination);
        move_uploaded_file($trailertempname, $trailerdestination);
        $sql = "INSERT INTO movies (title,genres,release_date,synopsis,director,writers,producer,cast,poster,trailer) values('$title','$genres','$releasedate','$synopsis','$director','$writers','$producer','$cast','$posternamenew','$trailernamenew');";
        $result = mysqli_query($conn, $sql);
    }

    header("location:add-movie.php");
}

?>

<html>

<head>
    <link rel="stylesheet" href="styles/dashboard.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <title>MML--Add Movies</title>
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
                <li class="nav-list" style="background-color: royalblue; color: white;"><i class="fa-solid fa-photo-film"></i> Add Movie</li>
                <a href="edit-movie.php">
                    <li class="nav-list"><i class="fa-solid fa-pen-to-square"></i> Edit Movie</li>
                </a>
                <a href="manage-users.php">
                    <li class="nav-list"><i class="fa-solid fa-users"></i> Manage Users</li>
                </a>
                <a href="logout.php" class="logout-link">
                    <li class="nav-list" id="li-logout">
                        <i class="fa-solid fa-right-from-bracket"></i>Log Out
                    </li>
                </a>
            </ul>
        </div>


        <div class="content">

            <div class="add-form">
                <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" enctype="multipart/form-data">
                    <label for="title">Movie Title: </label>
                    <input type="text" name="title" id="title" required>

                    <label for="genres">Genres: </label>
                    <input type="text" name="genre" id="genre">

                    <label for="release-date">Release Date: </label>
                    <input type="date" name="release-date" id="release-date" required>

                    <label for="synopsis">Synopsis: </label>
                    <textarea name="synopsis" rows="15" cols="50" id="synopsis" required></textarea>

                    <label for="director">Director: </label>
                    <input type="text" name="director" id="director"></input>

                    <label for="writers">Writers: </label>
                    <input type="text" name="writers" id="writers"></input>

                    <label for="producer">Producer: </label>
                    <input type="text" name="producer" id="producer"></input>

                    <label for="cast">Cast: </label>
                    <input type="text" name="cast" id="cast"></input>

                    <label for="poster">Poster: </label>
                    <input type="file" name="poster" class="file-upload" style="color: white;" required>

                    <label for="trailer">Trailer: </label>
                    <input type="file" name="trailer" class="file-upload" style="color: white;" required>

                    <input type="submit" value="ADD" name="submit" id="submit">



                </form>
            </div>

        </div>

    </div>





</body>