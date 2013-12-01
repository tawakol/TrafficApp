<?php

	include('../config.php');
	include('functions.php');

	// show routes
	if($_GET['action'] == 'get') {
		$con=mysqli_connect(DBHOST, DBUSER, DBPASS, DB);
		// base query
		$query = 'select * FROM routes';
		// limit by key
		if(!empty($_GET['area']))
			$query .= " WHERE area = '{$_GET['area']}'";
<<<<<<< HEAD
        if(!empty($_GET['route']))
			$query .= " WHERE  routeID = '{$_GET['route']}'";
=======
<<<<<<< HEAD
=======
        if(!empty($_GET['route']))
			$query .= " WHERE  routeID = '{$_GET['route']}'";
>>>>>>> added functionality
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
        $result = mysqli_query($con,$query);
        $data = array();
        while ($row = mysqli_fetch_array($result, MYSQL_ASSOC))
        	$data[] = $row;
		exitWithJSON($data);
	} 

?>