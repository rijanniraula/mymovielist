<html>

<head>
    <link rel="stylesheet" href="styles/home.css">
    <title>MyMovieList--Home</title>
</head>

<body>
    <div class="home">
        <div class="header-container">
            <div class="header-left">
                <a href="home.php">MyMovieList</a>
            </div>

            <div class="header-center">
                <form action="search.php" method="get">
                    <input type="text" name="search" id="search" placeholder="Search">
                    <input type="submit" name="submit" hidden>
                </form>
            </div>
            <div class="header-right">
                <a href="login.php"><button>Login</button></a>
                <a href="signup.php"><button>Sign Up</button></a>

            </div>
        </div>
    </div>


</body>

</html>