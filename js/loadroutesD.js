
$(function() {
		//alert(document.name);
		loadFromDB(addToPage);
        });

function loadReportPage(LocationString){
	window.location.href = "reportpage.html?route=" + LocationString;
}

function loadRoadPage(LocationString){
	window.location.href = "commentspage.html?route=" + LocationString;
}

function loadFromDB(callback){
	var data = {};
	$.post('php/getRoutes.php?action=get&area=Dartmouth', data, callback);
}

function addToPage(data){
	console.log("this is data" + data);
	for (var i=0; i<data.length; i++){
		var node = document.createElement("li");
		node.setAttribute("onclick", "loadRoadPage('" + data[i]["routeID"] + "')");
		node.setAttribute("class", "routeItems");
		var route = document.createTextNode(data[i]["routeName"]);
		node.appendChild(route);
		var Tcolor = determineTraffic(data[i]["traffic"]);
		node.setAttribute("style","background-color:" + Tcolor);
		document.getElementById("Routes").appendChild(node);
	}
}

function determineTraffic(trafficNum){
	if (trafficNum == null){
		return 'grey';
	} else if (trafficNum == 1){
		return '#2ed600'; //green
	} else if (trafficNum == 2){
		return '#ffd200'; //yellow
	} else if (trafficNum == 3){
		return '#ff8400'; //orange
	} else if (trafficNum == 4){
		return '#ff3333'; //red
	}
}