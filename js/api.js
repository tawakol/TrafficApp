// this is for singleton, instance this class without the new keyword!

function api() {
	if(this instanceof api)
		return api.prototype.sharedInstance = this;
	if(!api.prototype.sharedInstance)
		return api.prototype.sharedInstance = new api();
	else
		return api.prototype.sharedInstance;
}

// path to root of the project

api.prototype.base = '';

// determine the session id of the user

api.prototype.sessionid = localStorage.skiSessionID ? localStorage.skiSessionID : false;

// store the id of the user

api.prototype.userid = localStorage.userid ? localStorage.userid : undefined;

// table of permissions for bitperms

api.prototype.perms = {
	'guest': 1,
	'admin': 2,
	'student': 4,
	'instructor': 8,
	'zone_education_leader': 16,
	'divisional_education_leader': 32,
	'national_education_leader': 64
};

// store which permissions the user has here

api.prototype.userPermissions = localStorage.userPermissions ? localStorage.userPermissions : api.prototype.perms.guest;

// checks to see if user has given permissions
api.prototype.checkPerms = function(perms) {
	if(perms == 0)
		return true;
	else
		return perms & this.userPermissions;
}

// attempt a login

api.prototype.login = function(username, password, callback) {
	$.post(this.base + 'php/checklogin.php', { username: username, password: password }, function(data) {
		if(data.success)
			this.sessionid = localStorage.skiSessionID = data.sessionid;
			this.userPermissions = localStorage.userPermissions = data.login;
			this.userid = localStorage.userid = data.userid;
		callback(data.success == "true");
	}.bind(this));

}

// determine if logged in

api.prototype.isLoggedIn = function() {
	return typeof this.sessionid != 'undefined' && this.sessionid != false;
}

// mechanism to logout

api.prototype.logout = function() {
	this.sessionid = false;
	this.userid = false;
	this.userPermissions = this.perms.guest;
	delete localStorage.userPermissions;
	delete localStorage.skiSessionID;
	delete localStorage.userid;
}

// mechanism to remove sessions

api.prototype.removeAllSessions = function(id, callback) {
	$.post(this.base + 'php/getPatrollers.php?action=removeAllSessions', { sessionid: this.sessionid }, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}

// delete a patroller

api.prototype.deletePatroller = function(id, callback) {
	$.post(this.base + 'php/getPatrollers.php?action=deletePatroller', { sessionid: this.sessionid, id: id }, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}

/* ACCIDENT REPORTS */



// delete a new Accident

api.prototype.deleteAccident = function(id, callback) {
	$.post(this.base + 'php/getAccident.php?action=delete', { sessionid: this.sessionid, id: id }, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}

// add a new Accident

api.prototype.addAccident = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getAccident.php?action=add', data, callback);
}

// get Accident info

api.prototype.getAccident = function(options, callback) {
	var data = {};
	if(typeof options == 'function')
		callback = options;
	else
		data = options;
		data.sessionid = this.sessionid;
	$.post(this.base + 'php/getAccident.php?action=get', data, callback);
}

// get Accident info for a specific id

api.prototype.getAccidentRecord = function(id, callback) {
	$.post(this.base + 'php/getAccident.php?action=get', { sessionid: this.sessionid, id: id }, function(d) {
		callback(d[0]);
	});
}

// edit an Accident record

api.prototype.editAccident = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getAccident.php?action=edit', data, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}



/* ON SNOW */

// delete a new onsnow

api.prototype.deleteOnSnow = function(id, callback) {
	$.post(this.base + 'php/getOnSnow.php?action=delete', { sessionid: this.sessionid, id: id }, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}

// add a new onsnow

api.prototype.addOnSnow = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getOnSnow.php?action=add', data, callback);
}

// get onsnow info

api.prototype.getOnSnow = function(options, callback) {
	var data = {};
	if(typeof options == 'function')
		callback = options;
	else
		data = options;
		data.sessionid = this.sessionid;
	$.post(this.base + 'php/getOnSnow.php?action=get', data, callback);
}

// get onsnow info for a specific id

api.prototype.getOnSnowRecord = function(id, callback) {
	$.post(this.base + 'php/getOnSnow.php?action=get', { sessionid: this.sessionid, id: id }, function(d) {
		callback(d[0]);
	});
}

// edit an onsnow record

api.prototype.editOnSnow = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getOnSnow.php?action=edit', data, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}


/* PATROLLER */

// add a new patroller

api.prototype.addPatroller = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getPatrollers.php?action=addPatroller', data, callback);
}

// get patrollers

api.prototype.getPatrollers = function(callback) {
	$.post(this.base + 'php/getPatrollers.php?action=getPatrollers', { sessionid: this.sessionid }, callback);
}

// list patrollers

api.prototype.listPatrollers = function(type, callback) {
	var data = { sessionid: this.sessionid };
	if(type && type != 'all')
		data.sortBy = type;
	$.post(this.base + 'php/getPatrollers.php?action=listPatrollers', data, callback);
}

// get single patroller when given the patroller's id

api.prototype.getPatroller = function(id, callback) {
	$.post(this.base + 'php/getPatrollers.php?action=getPatrollers', { sessionid: this.sessionid, id: id }, function(data) {
		if(data.length == 1)
			callback(data[0]);
	});
}

// get single patroller history

api.prototype.getPatrollerHistory = function(id, callback) {
	$.post(this.base + 'php/getPatrollers.php?action=getPatrollerHistory', { sessionid: this.sessionid, id: id }, callback);
}

// edit patroller, MUST pass POST variable with id

api.prototype.editPatroller = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getPatrollers.php?action=editPatroller', data, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}

/* FIRST AID */

api.prototype.deleteFirstAid = function(id, callback) {
	$.post(this.base + 'php/getFirstAid.php?action=delete', { sessionid: this.sessionid, id: id }, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}

// add a new onsnow

api.prototype.addFirstAid = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getFirstAid.php?action=add', data, callback);
}

// get onsnow info

api.prototype.getFirstAid = function(options, callback) {
	var data = {};
	if(typeof options == 'function')
		callback = options;
	else
		data = options;
		data.sessionid = this.sessionid;
	$.post(this.base + 'php/getFirstAid.php?action=get', data, callback);
}

// get onsnow info for a specific id

api.prototype.getFirstAidRecord = function(id, callback) {
	$.post(this.base + 'php/getFirstAid.php?action=get', { sessionid: this.sessionid, id: id }, function(d) {
		callback(d[0]);
	});
}

// edit an onsnow record

api.prototype.editFirstAid = function(data, callback) {
	data.sessionid = this.sessionid;
	$.post(this.base + 'php/getFirstAid.php?action=edit', data, function(d) {
		if(typeof callback == 'function')
			callback(d);
	});
}