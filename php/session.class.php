<?php

	class sessionManager {

		// this method generates a new session and returns it

		function createSessionForUserid($userid) {
			// fetch some useful variables
			$sessionid = uniqid();
			$useragent = $_SERVER['HTTP_USER_AGENT'];
			$ip = $_SERVER['REMOTE_ADDR'];
			if($ip == "::1")
				$ip = '127.0.0.1';
			// do the insertion
			$con = $this->connectDB();
			$stmt = $con->prepare("INSERT INTO sessions VALUES ('', ?, ?, ?, ?, ?, ?)");
			$stmt->bind_param('isssii', $userid, $sessionid, $useragent, $ip, time(), time() );   // bind $sample to the parameter
			$stmt->execute();
			return $sessionid;
		}

		// this method returns a mysqli object

		function connectDB() {
			include('../config.php');
			if(empty($this->con))
				$this->con = new mysqli(DBHOST, DBUSER, DBPASS, DB);
			return $this->con;
		}

		// this takes a session ID and removes all other sessions related to the same user of the given session

		function removeAllSessionsForSession($sessionid) {

			$con = $this->connectDB();
			$sql = $con->prepare("DELETE `b` FROM `sessions` JOIN `sessions` AS `b` ON sessions.userid = b.userid WHERE sessions.session = ?");
			$sql->bind_param("s", $sessionid);
			$sql->execute();
			$sql->close();

		}

		// this method checks to see that a session is legit, returns true or false

		function validateSession($sessionid, &$userid = 0) {
			// grab more user variables
			$useragent = $_SERVER['HTTP_USER_AGENT'];
			$ip = $_SERVER['REMOTE_ADDR'];
			if($ip == "::1")
				$ip = '127.0.0.1';
			// do the query to pull userid from session
			$con = $this->connectDB();
			$sql = $con->prepare("SELECT userid FROM sessions WHERE session=? AND useragent=? AND ip=?");
			$sql->bind_param("sss", $sessionid, $useragent, $ip);
			$sql->execute();
			$sql->bind_result($result);
			$sql->fetch();
			$sql->close();
			// determine if session is legit
			$session_is_legit = !empty($result);
			// if session is legit update the sessions last active time
			if($session_is_legit) {
				$con = $this->connectDB();
				$stmt = $con->prepare("UPDATE `sessions` SET `lastactive` = ? WHERE `session` = ?");
				$stmt->bind_param('is', time(), $sessionid );   // bind $sample to the parameter
				$stmt->execute();
				$stmt->close();
			}
			// store the userid
			$userid = $result;
			// return if its a legit session
			return $session_is_legit;
		}

	}

?>