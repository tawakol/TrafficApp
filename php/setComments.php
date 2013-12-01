<?php

	include('../config.php');
	include('functions.php');

	// show routes
	if($_GET['action'] == 'set') {
		$con=mysqli_connect(DBHOST, DBUSER, DBPASS, DB);
            
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$sql="INSERT INTO comments (userID, routeID, comment, traffic)
VALUES
('1','$_GET[route]','$_GET[comment]','$_GET[traffic]')";

if (!mysqli_query($con,$sql))
  {
  die('Error: ' . mysqli_error($con));
  }
echo "1 record added";

mysqli_close($con);
	} 

?>

