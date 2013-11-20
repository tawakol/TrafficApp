<?php

session_start();
include('../config.php');
include('functions.php');
include('session.class.php');

// connect to database
$con = new mysqli(DBHOST, DBUSER, DBPASS, DB);

// do a login attempt
$sql = $con->prepare("SELECT id from users where email=? AND password=?");
$sql->bind_param("ss", $_POST['email'], encryptPassword($_POST['password']) );
$sql->execute();
$sql->bind_result($userid, $login);
$sql->fetch();
$sql->close();

// indicate login failure
if(empty($userid))
	exitWithJSON(array( 'success' => 'false' ));

// if login worked make a session
$session = new sessionManager();
$sessionid = $session->createSessionForUserid($userid);
exitWithJSON(array( 'success' => 'true', 'sessionid' => $sessionid, 'login' => $login, 'userid' => $userid ));

?>