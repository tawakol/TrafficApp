
$(function() {
		//alert(document.name);
        var L
        });

function loadReportPage(LocationString){
	window.location.href = "reportpage.html?route=" + LocationString;
}

function loadRoadPage(LocationString){
	window.location.href = "commentspage.html?route=" + LocationString;
}

function loadFromDB(LocationString, callback){
	var data = {};
	var area = $.post('php/getComments.php?action=get&route=' + LocationString, data, callback);
}

function loadRouteInfo(LocationString, callback){
    var data = {};
    var area = $.post('php/getRoutes.php?action=get&route=' + LocationString, data, callback); 
}

function updateInfo(data){
     document.getElementById("routeTitle").innerHTML=data[0]["routeName"];
    document.getElementById("addreport").setAttribute("href", "reportpage.html?route=" + data[0]["routeID"]);
}

function addToPage(data){
	console.log("this is data" + data);
    
	for (var i=data.length-1; i>=0; i--){
		var node = document.createElement("li");
		//node.setAttribute("onclick", "loadReportPage('" + data[i]["routeID"] + "')");
        //get the timestamp
        var timestamp = calculateTime(data, i);
        var spantime = document.createElement("span")
        var time = document.createElement("p");
        var timeText = document.createTextNode(timestamp);
        time.setAttribute("class", "timestamp");
        time.appendChild(timeText);
        spantime.appendChild(time);
        //set the color of the box
        var Tcolor = determineTraffic(data[i]["traffic"]);
        var span = document.createElement("span");
        var colorbox = document.createElement("fieldset");
        colorbox.setAttribute("class", "colorbox");
        colorbox.setAttribute("style","background-color:" + Tcolor);
        //set the attributes of the list node
        node.setAttribute("class", "comments");
		var route = document.createTextNode(data[i]["comment"]);
        //append everything
        span.appendChild(colorbox);
        node.appendChild(span);
		node.appendChild(route);
        node.appendChild(spantime);
		document.getElementById("Comments").appendChild(node);
    }
        
    //update the timestamp for the main page
    if (data.length > 0){
        var timeSince = calculateTime(data, data.length-1);
        document.getElementById("routeTimeSince").innerHTML=timeSince;
    
        //update the color of the bar
        var color = determineTraffic(data[data.length-1]["traffic"]);
        document.getElementById("header").setAttribute("style", "background-color:" + color);
    } else {
        document.getElementById("header").setAttribute("style", "background-color:#eee; border-bottom-style:none");
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

function calculateTime(data, num){
    var timestamp = data[num]["timestamp"];
    timestamp = Date.parse(timestamp)/1000;
    var now = Math.round(+new Date()/1000);
    var timesince = (now - timestamp)/60;
    timesince = timesince.toFixed(0);
    console.log(timestamp);
    console.log(now);
    console.log(timesince);
    if (timesince > 1 && timesince < 60)
        return "Updated " + timesince + " minutes ago";
    else if (timesince > 60){
        timesince = timesince/60;
        if (timesince > 24){
            timesince = timesince/24;
            timesince = timesince.toFixed(0);  
            return "Updated " + timesince + " days ago";
        } else {
            timesince = timesince.toFixed(0);
            return "Updated " + timesince + " hours ago";
             
        }
    } else
        return "Updated less than one minute ago..";
}