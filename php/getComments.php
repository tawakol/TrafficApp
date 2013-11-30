<?php

	include('../config.php');
	include('functions.php');

	// show routes
	if($_GET['action'] == 'get') {
		$con=mysqli_connect(DBHOST, DBUSER, DBPASS, DB);
		// base query
		$query = 'select * FROM comments';
		// limit by key
		if(!empty($_GET['route']))
			$query .= " WHERE routeID = '{$_GET['route']}'";
        $result = mysqli_query($con,$query);
        $data = array();
        while ($row = mysqli_fetch_array($result, MYSQL_ASSOC))
        	$data[] = $row;
		exitWithJSON($data);
	} 

?>