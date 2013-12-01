
$(function() {
		//alert(document.name);
<<<<<<< HEAD
		//loadFromDB(addToPage);
=======
		loadFromDB(addToPage);
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
        });

function loadReportPage(LocationString){
	window.location.href = "reportpage.html?route=" + LocationString;
}

function loadRoadPage(LocationString){
	window.location.href = "commentspage.html?route=" + LocationString;
}

<<<<<<< HEAD
function loadFromDB(LocationString, callback){
	var data = {};
	var area = $.post('php/getRoutes.php?action=get&area=' + LocationString, data, callback);
=======
function loadFromDB(callback){
	var data = {};
	var area = 
	$.post('php/getRoutes.php?action=get&area=Halifax', data, callback);
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
}

function addToPage(data){
	console.log("this is data" + data);
<<<<<<< HEAD
    document.getElementById("areaTitle").innerHTML=data[0]["area"];
=======
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
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

<<<<<<< HEAD
function getUrlParameters(parameter, staticURL, decode){
   /*
    Function: getUrlParameters
    Description: Get the value of URL parameters either from 
                 current URL or static URL
    Author: Tirumal
    URL: www.code-tricks.com
   */
   var currLocation = (staticURL.length)? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;
   
   for(var i = 0; i < parArr.length; i++){
        parr = parArr[i].split("=");
        if(parr[0] == parameter){
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        }else{
            returnBool = false;            
        }
   }
   
   if(!returnBool) return false;  
}

function determineTraffic(trafficNum){
	if (trafficNum == null){
		return 'white';
	} else if (trafficNum == 1){
=======
function determineTraffic(trafficNum){
	if (trafficNum == null){
		return 'grey';
	} else if (trafficNum == 1){
<<<<<<< HEAD
		return '#2ed600'; //green
	} else if (trafficNum == 2){
		return '#ffd200'; //yellow
	} else if (trafficNum == 3){
		return '#ff8400'; //orange
	} else if (trafficNum == 4){
		return '#ff3333'; //red
=======
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
		return '#74b637'; //green
	} else if (trafficNum == 2){
		return '#edd052'; //yellow
	} else if (trafficNum == 3){
<<<<<<< HEAD
		return '#F6AC4E'; //orange
	} else if (trafficNum == 4){
		return '#d72e2e'; //red
=======
		return '#ff8400'; //orange
	} else if (trafficNum == 4){
		return '#d72e2e'; //red
>>>>>>> added functionality
>>>>>>> ee91f5f99a808384cd192c3169da001d3f3d3376
	}
}